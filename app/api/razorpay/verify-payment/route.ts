import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { generateDownloadToken } from '@/lib/secure-token';

export async function POST(req: Request) {
  try {
    const {
      orderId, // DB order ID
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = await req.json();

    if (!orderId || !razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json({ success: false, error: 'Missing payment verification parameters' }, { status: 400 });
    }

    // Retrieve order from DB
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    if (order.status === 'PAID') {
      // Order already paid, return existing or new valid token
      const { token, expiresAt } = generateDownloadToken(order.id);
      await prisma.downloadToken.create({
        data: {
          token,
          orderId: order.id,
          expiresAt,
        },
      });
      return NextResponse.json({
        success: true,
        message: 'Order already verified',
        orderRef: order.orderRef,
        token,
      });
    }

    // Verify HMAC SHA256 Signature
    const isValidSignature = verifyRazorpaySignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    });

    if (!isValidSignature) {
      await prisma.order.update({
        where: { id: order.id },
        data: { status: 'FAILED' },
      });
      return NextResponse.json({ success: false, error: 'Invalid payment signature' }, { status: 400 });
    }

    // Update order status to PAID
    const updatedOrder = await prisma.order.update({
      where: { id: order.id },
      data: {
        status: 'PAID',
        razorpayPaymentId,
        razorpaySignature,
      },
    });

    // Generate secure short-lived download authorization token (24h validity)
    const { token, expiresAt } = generateDownloadToken(updatedOrder.id, 24);
    await prisma.downloadToken.create({
      data: {
        token,
        orderId: updatedOrder.id,
        expiresAt,
      },
    });

    return NextResponse.json({
      success: true,
      orderRef: updatedOrder.orderRef,
      token,
      productTitle: updatedOrder.productTitle,
      amountInPaise: updatedOrder.amountInPaise,
    });
  } catch (error: any) {
    console.error('Verify Payment Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
