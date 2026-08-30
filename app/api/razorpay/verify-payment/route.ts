import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { processOrderFulfillment } from '@/lib/fulfillment';

export async function POST(req: Request) {
  try {
    const {
      orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = await req.json();

    if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ success: false, error: 'Missing payment verification parameters' }, { status: 400 });
    }

    // 1. Verify Razorpay HMAC-SHA256 Signature
    const isValidSignature = verifyRazorpaySignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    });

    if (!isValidSignature) {
      // Record failure if order exists
      try {
        await prisma.order.updateMany({
          where: {
            OR: [
              { id: orderId },
              { razorpayOrderId: razorpayOrderId },
            ],
          },
          data: { status: 'FAILED' },
        });
      } catch (e) {
        // Non-blocking
      }
      return NextResponse.json({ success: false, error: 'Invalid payment signature' }, { status: 400 });
    }

    // 2. Execute Complete Order Fulfillment
    const fulfillment = await processOrderFulfillment({
      orderRefOrId: orderId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      eventSource: 'VERIFY_API',
    });

    if (!fulfillment.success) {
      return NextResponse.json({ success: false, error: fulfillment.error || 'Fulfillment error' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      orderRef: fulfillment.orderRef,
      token: fulfillment.token,
      downloadUrl: fulfillment.downloadUrl,
      productTitle: fulfillment.productTitle,
      amountInPaise: fulfillment.amountInPaise,
      customerName: fulfillment.customerName,
      customerEmail: fulfillment.customerEmail,
    });
  } catch (error: any) {
    console.error('Verify Payment API Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Verification failed' }, { status: 500 });
  }
}
