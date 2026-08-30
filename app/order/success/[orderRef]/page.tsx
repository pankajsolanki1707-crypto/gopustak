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
        productTitle: order.productTitle || product?.title || 'UPSC EPFO / APFC 2026 Ebook',
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        amountInPaise: order.amountInPaise,
        status: order.status,
        createdAt: order.createdAt.toISOString(),
        productCover: product?.coverImage || '/covers/cover-product-2.png',
        productEdition: product?.edition || '2026 Edition',
        productLanguage: product?.language || 'English',
        productPageCount: product?.pageCount || 'PDF Ebook',
      };
    }
  } catch (error) {
    console.error('Error fetching order for success page:', error);
  }

  // Authoritative fallback for demonstration/development
  if (!orderData) {
    orderData = {
      orderRef,
      productTitle: 'Crack UPSC EPFO/APFC 2026',
      customerName: 'Aspirant',
      customerEmail: 'Your registered email',
      customerPhone: '',
      amountInPaise: 14900,
      status: 'PAID',
      createdAt: new Date().toISOString(),
      productCover: '/covers/cover-product-2.png',
      productEdition: '2026 Edition',
      productLanguage: 'English',
      productPageCount: '47 Pages (PDF)',
    };
  }

  return <OrderSuccessClient order={orderData} rawToken={rawToken} />;
}
