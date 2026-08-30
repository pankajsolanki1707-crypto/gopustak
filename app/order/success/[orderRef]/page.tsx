import React from 'react';
import { prisma } from '@/lib/db';
import { verifySignedOrderToken, createSignedOrderToken } from '@/lib/secure-token';
import OrderSuccessClient from './OrderSuccessClient';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: {
    orderRef: string;
  };
  searchParams: {
    token?: string;
    name?: string;
    email?: string;
    phone?: string;
    amount?: string;
    title?: string;
    cover?: string;
    edition?: string;
    lang?: string;
    pages?: string;
  };
}

const PRODUCT_LOOKUP: Record<string, { cover: string; edition: string; lang: string; pages: string; title: string }> = {
  'crack-upsc-epfo-apfc-2026-blueprint': {
    title: 'Crack UPSC EPFO/APFC 2026',
    cover: '/covers/cover-product-2.png',
    edition: '2026 Edition',
    lang: 'English',
    pages: '47 Pages (PDF)',
  },
  'upsc-epfo-apfc-2026-special-subjects-mock-tests-hindi': {
    title: 'UPSC EPFO/APFC 2026 – विशेष विषय एवं 10 मॉक टेस्ट',
    cover: '/covers/cover-product-1.png',
    edition: '2026 Edition',
    lang: 'Hindi',
    pages: '558 Pages (PDF)',
  },
  'upsc-epfo-apfc-practice-ebook-full-mock-tests': {
    title: 'UPSC EPFO/APFC Special Subject eBook + 10 Full Mock Tests',
    cover: '/covers/cover-product-3.png',
    edition: '2026 Edition',
    lang: 'English / Bilingual',
    pages: '120 Pages (PDF)',
  },
};

export default async function OrderSuccessPage({ params, searchParams }: Props) {
  const { orderRef } = params;
  let rawToken = searchParams.token || '';

  // 1. Decode Verified Signed Order Token (Stateless Verification)
  const tokenPayload = rawToken ? verifySignedOrderToken(rawToken) : null;

  // 2. Query Database if available
  let dbOrder: any = null;
  let dbProduct: any = null;
  try {
    dbOrder = await prisma.order.findFirst({
      where: {
        OR: [
          { orderRef },
          { id: orderRef },
          { razorpayOrderId: orderRef },
        ],
      },
    });

    if (dbOrder) {
      dbProduct = await prisma.product.findFirst({
        where: {
          OR: [
            { id: dbOrder.productId },
            { slug: dbOrder.productId },
          ],
        },
      });
    }
  } catch (dbErr) {
    console.warn('[Success Page DB Lookup Warning]:', dbErr);
  }

  // 3. Resolve Authoritative Purchaser & Order Metadata
  const resolvedCustomerName =
    dbOrder?.customerName ||
    tokenPayload?.customerName ||
    searchParams.name ||
    'Valued Aspirant';

  const resolvedCustomerEmail =
    dbOrder?.customerEmail ||
    tokenPayload?.customerEmail ||
    searchParams.email ||
    'your-email@example.com';

  const resolvedCustomerPhone =
    dbOrder?.customerPhone ||
    searchParams.phone ||
    null;

  let resolvedAmountInPaise = 9900;
  if (dbOrder?.amountInPaise !== undefined) {
    resolvedAmountInPaise = dbOrder.amountInPaise;
  } else if (tokenPayload?.amountInPaise !== undefined) {
    resolvedAmountInPaise = tokenPayload.amountInPaise;
  } else if (searchParams.amount !== undefined && !isNaN(Number(searchParams.amount))) {
    resolvedAmountInPaise = Math.round(Number(searchParams.amount) * 100);
  }

  const resolvedProductTitle =
    dbOrder?.productTitle ||
    tokenPayload?.productTitle ||
    dbProduct?.title ||
    searchParams.title ||
    'Crack UPSC EPFO/APFC 2026 Blueprint';

  // Match cover and book details
  let matchedMeta = PRODUCT_LOOKUP['crack-upsc-epfo-apfc-2026-blueprint'];
  for (const [slugKey, meta] of Object.entries(PRODUCT_LOOKUP)) {
    if (
      resolvedProductTitle.toLowerCase().includes(slugKey) ||
      resolvedProductTitle.toLowerCase().includes(meta.title.toLowerCase().slice(0, 15)) ||
      (tokenPayload?.productId && tokenPayload.productId.includes(slugKey))
    ) {
      matchedMeta = meta;
      break;
    }
  }

  const productCover = dbProduct?.coverImage || searchParams.cover || matchedMeta.cover;
  const productEdition = dbProduct?.edition || searchParams.edition || matchedMeta.edition;
  const productLanguage = dbProduct?.language || searchParams.lang || matchedMeta.lang;
  const productPageCount = dbProduct?.pageCount || searchParams.pages || matchedMeta.pages;

  // 4. Ensure Token is Generated if accessed directly
  if (!rawToken) {
    rawToken = createSignedOrderToken({
      orderRef,
      productId: dbOrder?.productId || 'crack-upsc-epfo-apfc-2026-blueprint',
      productTitle: resolvedProductTitle,
      customerName: resolvedCustomerName,
      customerEmail: resolvedCustomerEmail,
      amountInPaise: resolvedAmountInPaise,
    });
  }

  const orderData = {
    id: dbOrder?.id || orderRef,
    orderRef,
    productTitle: resolvedProductTitle,
    customerName: resolvedCustomerName,
    customerEmail: resolvedCustomerEmail,
    customerPhone: resolvedCustomerPhone,
    amountInPaise: resolvedAmountInPaise,
    status: dbOrder?.status || 'PAID',
    createdAt: dbOrder?.createdAt ? dbOrder.createdAt.toISOString() : new Date().toISOString(),
    productCover,
    productEdition,
    productLanguage,
    productPageCount,
  };

  return <OrderSuccessClient order={orderData} rawToken={rawToken} />;
}
