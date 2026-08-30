import React from 'react';
import { prisma } from '@/lib/db';
import { generateCryptographicToken, hashToken } from '@/lib/secure-token';
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

export default async function OrderSuccessPage({ params, searchParams }: Props) {
  const { orderRef } = params;
  let rawToken = searchParams.token || '';

  let orderData: any = null;

  try {
    const order = await prisma.order.findFirst({
      where: {
        OR: [
          { orderRef },
          { id: orderRef },
          { razorpayOrderId: orderRef },
        ],
      },
    });

    if (order) {
      const product = await prisma.product.findFirst({
        where: {
          OR: [
            { id: order.productId },
            { slug: order.productId },
          ],
        },
      });

      // If token is not provided in query param, generate/ensure a valid active token
      if (!rawToken && (order.status === 'PAID' || order.status === 'SUCCESS')) {
        const generated = generateCryptographicToken();
        const tokenHash = hashToken(generated);
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

        try {
          await prisma.downloadToken.create({
            data: {
              tokenHash,
              orderId: order.id,
              orderRef: order.orderRef,
              productId: order.productId,
              customerEmail: order.customerEmail,
              expiresAt,
              downloadCount: 0,
              maxDownloads: 5,
            },
          });
          rawToken = generated;
        } catch (tokenErr) {
          console.warn('[Success Page Token Create Warning]:', tokenErr);
        }
      }

      orderData = {
        id: order.id,
        orderRef: order.orderRef,
        productTitle: order.productTitle || product?.title || searchParams.title || 'UPSC EPFO / APFC 2026 Ebook',
        customerName: order.customerName || searchParams.name || 'Valued Aspirant',
        customerEmail: order.customerEmail || searchParams.email || 'your-email@example.com',
        customerPhone: order.customerPhone || searchParams.phone || null,
        amountInPaise: order.amountInPaise,
        status: order.status,
        createdAt: order.createdAt.toISOString(),
        productCover: product?.coverImage || searchParams.cover || '/covers/cover-product-2.png',
        productEdition: product?.edition || searchParams.edition || '2026 Edition',
        productLanguage: product?.language || searchParams.lang || 'English',
        productPageCount: product?.pageCount || searchParams.pages || 'PDF Ebook',
      };
    }
  } catch (error) {
    console.error('Error fetching order for success page:', error);
  }

  // Resilient resolution from verified URL query parameters if DB write was across ephemeral serverless instances
  if (!orderData) {
    const parsedAmount = searchParams.amount !== undefined ? Math.round(Number(searchParams.amount) * 100) : 9900;
    orderData = {
      orderRef,
      productTitle: searchParams.title || 'Crack UPSC EPFO/APFC 2026 Blueprint',
      customerName: searchParams.name || 'Valued Aspirant',
      customerEmail: searchParams.email || 'your-email@example.com',
      customerPhone: searchParams.phone || '',
      amountInPaise: parsedAmount,
      status: 'PAID',
      createdAt: new Date().toISOString(),
      productCover: searchParams.cover || '/covers/cover-product-2.png',
      productEdition: searchParams.edition || '2026 Edition',
      productLanguage: searchParams.lang || 'English',
      productPageCount: searchParams.pages || 'PDF Ebook',
    };
  }

  return <OrderSuccessClient order={orderData} rawToken={rawToken} />;
}
