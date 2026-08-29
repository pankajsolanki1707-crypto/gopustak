import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { razorpayInstance, isDemoRazorpay } from '@/lib/razorpay';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const { productId, customerName, customerEmail, customerPhone } = await req.json();

    if (!productId || !customerEmail || !customerName) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // SERVER PRICE AUTHORITY: Fetch actual price from DB
    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product || !product.published) {
      return NextResponse.json({ success: false, error: 'Product not found or unavailable' }, { status: 404 });
    }

    const orderRef = `GP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const amountInPaise = product.priceInPaise;

    let razorpayOrderId = `order_${crypto.randomBytes(8).toString('hex')}`;

    if (!isDemoRazorpay) {
      try {
        const rzpOrder = await razorpayInstance.orders.create({
          amount: amountInPaise,
          currency: 'INR',
          receipt: orderRef,
          notes: {
            productId: product.id,
            productSlug: product.slug,
            customerEmail,
          },
        });
        razorpayOrderId = rzpOrder.id;
      } catch (err: any) {
        console.error('Razorpay Order creation error:', err);
        // Fallback to internal order ID if API fails
      }
    }

    // Create Order in DB
    const newOrder = await prisma.order.create({
      data: {
        orderRef,
        productId: product.id,
        productTitle: product.title,
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        amountInPaise,
        currency: 'INR',
        razorpayOrderId,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      order: {
        id: newOrder.id,
        orderRef: newOrder.orderRef,
        amountInPaise: newOrder.amountInPaise,
        currency: newOrder.currency,
        razorpayOrderId: newOrder.razorpayOrderId,
        productTitle: product.title,
        keyId: process.env.RAZORPAY_KEY_ID || 'rzp_test_gopustak_demo',
        isDemo: isDemoRazorpay,
      },
    });
  } catch (error: any) {
    console.error('Create Order API Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
