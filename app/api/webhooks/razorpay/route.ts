import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/db';
import { processOrderFulfillment } from '@/lib/fulfillment';

export const dynamic = 'force-dynamic';

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET || process.env.RAZORPAY_KEY_SECRET || 'frnjslzbHncuoQRjrPFIuY7R';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const eventIdHeader = req.headers.get('x-razorpay-event-id');

    if (!signature) {
      return NextResponse.json({ error: 'Missing webhook signature header' }, { status: 400 });
    }

    // 1. Verify Webhook Signature using Raw Request Body
    const expectedSignature = crypto
      .createHmac('sha256', WEBHOOK_SECRET)
      .update(rawBody)
      .digest('hex');

    const isValidSignature = crypto.timingSafeEqual(
      Buffer.from(expectedSignature, 'utf8'),
      Buffer.from(signature, 'utf8')
    );

    if (!isValidSignature) {
      console.error('[Webhook Error] Invalid Razorpay webhook signature');
      return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 });
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event;
    const eventId = eventIdHeader || event.id || `evt_${Date.now()}`;

    console.log(`[Razorpay Webhook Received] Event: ${eventType} | ID: ${eventId}`);

    // 2. Idempotency Check: Verify if event has already been processed
    try {
      const existingEvent = await prisma.webhookEvent.findUnique({
        where: { eventId },
      });

      if (existingEvent) {
        console.log(`[Webhook Idempotency] Event ${eventId} already processed.`);
        return NextResponse.json({ status: 'already_processed' }, { status: 200 });
      }

      // Record event in DB
      await prisma.webhookEvent.create({
        data: {
          eventId,
          eventType,
          payload: rawBody.slice(0, 4000), // Trim if large
          status: 'PROCESSED',
        },
      });
    } catch (dbErr) {
      console.warn('[Webhook DB Warning] Event logging warning:', dbErr);
    }

    // 3. Process Specific Event Types
    if (eventType === 'payment.captured' || eventType === 'order.paid') {
      const paymentEntity = event.payload?.payment?.entity;
      const orderEntity = event.payload?.order?.entity;

      const razorpayOrderId = paymentEntity?.order_id || orderEntity?.id;
      const razorpayPaymentId = paymentEntity?.id;

      if (razorpayOrderId) {
        console.log(`[Webhook Fulfillment] Processing Order: ${razorpayOrderId}`);
        await processOrderFulfillment({
          orderRefOrId: razorpayOrderId,
          razorpayOrderId,
          razorpayPaymentId,
          eventSource: 'WEBHOOK',
        });
      }
    } else if (eventType === 'payment.failed') {
      const paymentEntity = event.payload?.payment?.entity;
      const razorpayOrderId = paymentEntity?.order_id;

      if (razorpayOrderId) {
        try {
          await prisma.order.updateMany({
            where: { razorpayOrderId },
            data: { status: 'FAILED' },
          });
          console.log(`[Webhook] Marked order ${razorpayOrderId} as FAILED`);
        } catch (e) {
          // Non-blocking
        }
      }
    }

    return NextResponse.json({ status: 'ok' }, { status: 200 });
  } catch (error: any) {
    console.error('[Razorpay Webhook Exception]:', error);
    return NextResponse.json({ error: error.message || 'Webhook processing failure' }, { status: 500 });
  }
}
