import { prisma } from '@/lib/db';
import { createSignedOrderToken, generateCryptographicToken, hashToken } from '@/lib/secure-token';
import { sendOrderConfirmationEmail } from '@/lib/email';

interface FulfillOrderParams {
  orderRefOrId: string;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  eventSource?: string; // 'VERIFY_API' | 'WEBHOOK'
}

export interface FulfillmentResult {
  success: boolean;
  orderRef: string;
  token: string;
  downloadUrl: string;
  productTitle: string;
  amountInPaise: number;
  customerEmail: string;
  customerName: string;
  error?: string;
}

export async function processOrderFulfillment({
  orderRefOrId,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
  eventSource = 'VERIFY_API',
}: FulfillOrderParams): Promise<FulfillmentResult> {
  // 1. Locate the Order in DB
  let order = await prisma.order.findFirst({
    where: {
      OR: [
        { id: orderRefOrId },
        { orderRef: orderRefOrId },
        ...(razorpayOrderId ? [{ razorpayOrderId }] : []),
      ],
    },
  });

  if (!order) {
    return {
      success: false,
      orderRef: orderRefOrId,
      token: '',
      downloadUrl: '',
      productTitle: '',
      amountInPaise: 0,
      customerEmail: '',
      error: 'Order not found in database',
    };
  }

  // 2. Mark order as PAID if not already
  if (order.status !== 'PAID') {
    try {
      order = await prisma.order.update({
        where: { id: order.id },
        data: {
          status: 'PAID',
          razorpayPaymentId: razorpayPaymentId || order.razorpayPaymentId,
          razorpaySignature: razorpaySignature || order.razorpaySignature,
        },
      });
    } catch (e) {
      console.warn('[Fulfillment] Order status update warning:', e);
    }
  }

  // 3. Create or update Purchase Entitlement record
  let productSlug = 'crack-upsc-epfo-apfc-2026-blueprint';
  try {
    const product = await prisma.product.findUnique({
      where: { id: order.productId },
    });
    if (product) {
      productSlug = product.slug;
    }
  } catch (e) {
    // Ignore
  }

  try {
    await prisma.purchaseEntitlement.upsert({
      where: { orderRef: order.orderRef },
      update: {
        status: 'ACTIVE',
      },
      create: {
        orderId: order.id,
        orderRef: order.orderRef,
        customerEmail: order.customerEmail,
        customerName: order.customerName,
        productId: order.productId,
        productSlug,
        productTitle: order.productTitle,
        status: 'ACTIVE',
      },
    });
  } catch (entitlementErr) {
    console.warn('[Fulfillment] Entitlement upsert warning:', entitlementErr);
  }

  // 4. Generate Cryptographically Signed Raw Token & Hash it for storage
  const rawToken = createSignedOrderToken({
    orderRef: order.orderRef,
    productId: order.productId,
    productSlug,
    productTitle: order.productTitle,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    amountInPaise: order.amountInPaise,
  });
  const tokenHash = hashToken(rawToken);
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours validity

  try {
    await prisma.downloadToken.create({
      data: {
        tokenHash,
        rawTokenPreview: rawToken.slice(0, 16) + '...',
        orderId: order.id,
        orderRef: order.orderRef,
        customerEmail: order.customerEmail,
        productId: order.productId,
        expiresAt,
        downloadCount: 0,
        maxDownloads: 15,
      },
    });
  } catch (tokenErr) {
    console.warn('[Fulfillment] Token record create warning:', tokenErr);
  }

  const downloadUrl = `/api/download?token=${rawToken}`;

  // 5. Send Transactional Confirmation Email to Customer
  try {
    await sendOrderConfirmationEmail({
      toEmail: order.customerEmail,
      customerName: order.customerName,
      orderRef: order.orderRef,
      productTitle: order.productTitle,
      amountInRs: Math.round(order.amountInPaise / 100),
      downloadUrl,
      expiresInHours: 24,
    });
  } catch (emailErr) {
    console.error('[Fulfillment] Email dispatch warning:', emailErr);
  }

  console.log(`[Fulfillment Success] Order: ${order.orderRef} | Source: ${eventSource} | Entitlement: ACTIVE`);

  return {
    success: true,
    orderRef: order.orderRef,
    token: rawToken,
    downloadUrl,
    productTitle: order.productTitle,
    amountInPaise: order.amountInPaise,
    customerEmail: order.customerEmail,
    customerName: order.customerName,
  };
}
