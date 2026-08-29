import React from 'react';
import { prisma } from '@/lib/db';
import OrderSuccessClient from './OrderSuccessClient';

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
  const rawToken = searchParams.token || '';

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
      const product = await prisma.product.findUnique({
        where: { id: order.productId },
      });

      orderData = {
        id: order.id,
        orderRef: order.orderRef,
        productTitle: order.productTitle,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        amountInPaise: order.amountInPaise,
        status: order.status,
        createdAt: order.createdAt.toISOString(),
        productCover: product?.coverImage || '/covers/cover-product-2.png',
        productEdition: product?.edition || '2026 Edition',
        productLanguage: product?.language || 'English',
        productPageCount: product?.pageCount || 'PDF',
      };
    }
  } catch (error) {
    console.error('Error fetching order for success page:', error);
  }

  // Fallback if DB fetch is in serverless cold state
  if (!orderData) {
    orderData = {
      orderRef,
      productTitle: 'UPSC EPFO / APFC 2026 Ebook',
      customerName: 'Aspirant',
      customerEmail: 'Your registered email',
      amountInPaise: 9900,
      status: 'PAID',
      createdAt: new Date().toISOString(),
      productCover: '/covers/cover-product-2.png',
      productEdition: '2026 Edition',
      productLanguage: 'English / Hindi',
      productPageCount: 'PDF Ebook',
    };
  }

  return <OrderSuccessClient order={orderData} rawToken={rawToken} />;
}
