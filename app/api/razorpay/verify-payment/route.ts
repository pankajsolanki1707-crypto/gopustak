import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { verifyRazorpaySignature } from '@/lib/razorpay';
import { generateDownloadToken } from '@/lib/secure-token';

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

    // 1. Verify HMAC SHA256 Signature directly using Razorpay secret
    const isValidSignature = verifyRazorpaySignature({
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
      signature: razorpaySignature,
    });

    if (!isValidSignature) {
      return NextResponse.json({ success: false, error: 'Invalid payment signature' }, { status: 400 });
    }

    // 2. Try updating order in DB (if DB writable)
    let orderRef = `GP-${Date.now()}`;
    let productTitle = 'UPSC EPFO/APFC Ebook';
    let amountInPaise = 9900;

    try {
      const order = await prisma.order.findFirst({
        where: {
          OR: [
            { id: orderId },
            { razorpayOrderId: razorpayOrderId },
            { orderRef: orderId },
          ],
        },
      });

      if (order) {
        orderRef = order.orderRef;
        productTitle = order.productTitle;
        amountInPaise = order.amountInPaise;

        await prisma.order.update({
          where: { id: order.id },
          data: {
            status: 'PAID',
            razorpayPaymentId,
            razorpaySignature,
          },
        });
      }
    } catch (dbErr) {
      console.warn('[Verify DB Warning] DB operation skipped:', dbErr);
    }

    // 3. Generate secure signed 24h download authorization token
    const tokenIdentifier = orderId || razorpayOrderId;
    const { token, expiresAt } = generateDownloadToken(tokenIdentifier, 24);

    try {
      await prisma.downloadToken.create({
        data: {
          token,
          orderId: tokenIdentifier,
          expiresAt,
        },
      });
    } catch (tokenDbErr) {
      console.warn('[Token DB Warning] Token stored in HMAC signature:', tokenDbErr);
    }

    return NextResponse.json({
      success: true,
      orderRef,
      token,
      productTitle,
      amountInPaise,
    });
  } catch (error: any) {
    console.error('Verify Payment Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Verification failed' }, { status: 500 });
  }
}
