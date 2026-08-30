import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { razorpayInstance, isDemoRazorpay } from '@/lib/razorpay';
import { processOrderFulfillment } from '@/lib/fulfillment';
import crypto from 'crypto';

export const dynamic = 'force-dynamic';

// Grounded fallback catalogue with authoritative welcome offer prices
const FALLBACK_PRODUCTS: Record<string, { title: string; priceInPaise: number; slug: string }> = {
  'upsc-epfo-apfc-2026-special-subjects-mock-tests-hindi': {
    title: 'UPSC EPFO/APFC 2026 – विशेष विषय एवं 10 मॉक टेस्ट',
    priceInPaise: 9900,
    slug: 'upsc-epfo-apfc-2026-special-subjects-mock-tests-hindi',
  },
  'crack-upsc-epfo-apfc-2026-blueprint': {
    title: 'Crack UPSC EPFO/APFC 2026',
    priceInPaise: 14900,
    slug: 'crack-upsc-epfo-apfc-2026-blueprint',
  },
  'upsc-epfo-apfc-practice-ebook-full-mock-tests': {
    title: 'UPSC EPFO/APFC Special Subject eBook + 10 Full Mock Tests',
    priceInPaise: 9900,
    slug: 'upsc-epfo-apfc-practice-ebook-full-mock-tests',
  },
};

export async function POST(req: Request) {
  try {
    const { productId, customerName, customerEmail, customerPhone } = await req.json();

    if (!productId || !customerEmail || !customerName) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Attempt to lookup product from Database
    let productTitle = '';
    let productSlug = '';
    let resolvedProductId = productId;
    let amountInPaise = 9900;
    let foundInDb = false;

    try {
      const dbProduct = await prisma.product.findFirst({
        where: {
          OR: [{ id: productId }, { slug: productId }],
        },
      });

      if (dbProduct) {
        resolvedProductId = dbProduct.id;
        productTitle = dbProduct.title;
        productSlug = dbProduct.slug;
        amountInPaise = dbProduct.priceInPaise;
        foundInDb = true;
      }
    } catch (dbErr) {
      console.warn('[DB Lookup Warning] Fallback to verified catalog:', dbErr);
    }

    // If DB lookup returned empty, match from verified catalog
    if (!foundInDb || !productTitle) {
      const fallback = FALLBACK_PRODUCTS[productId] || Object.values(FALLBACK_PRODUCTS).find(p => p.slug === productId);
      if (fallback) {
        productTitle = fallback.title;
        productSlug = fallback.slug;
        amountInPaise = fallback.priceInPaise;
      } else {
        const defaultProd = FALLBACK_PRODUCTS['upsc-epfo-apfc-2026-special-subjects-mock-tests-hindi'];
        productTitle = defaultProd.title;
        productSlug = defaultProd.slug;
        amountInPaise = defaultProd.priceInPaise;
      }
    }

    const orderRef = `GP-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;

    // Special Case: Free Ebook (₹0 / 0 Paise)
    // Razorpay rejects amount=0, so free downloads bypass payment gateway and fulfill directly!
    if (amountInPaise <= 0) {
      const freeRazorpayId = `free_${crypto.randomBytes(8).toString('hex')}`;
      
      const newOrder = await prisma.order.create({
        data: {
          orderRef,
          productId: resolvedProductId,
          productTitle,
          customerName,
          customerEmail,
          customerPhone: customerPhone || null,
          amountInPaise: 0,
          currency: 'INR',
          razorpayOrderId: freeRazorpayId,
          status: 'PAID',
        },
      });

      // Fulfill entitlement and generate download token immediately
      const fulfillment = await processOrderFulfillment({
        orderRefOrId: newOrder.id,
        razorpayOrderId: freeRazorpayId,
        eventSource: 'FREE_ACCESS',
      });

      return NextResponse.json({
        success: true,
        isFree: true,
        order: {
          id: newOrder.id,
          orderRef: newOrder.orderRef,
          amountInPaise: 0,
          currency: 'INR',
          productTitle,
          customerName,
          customerEmail,
          token: fulfillment.token,
          downloadUrl: fulfillment.downloadUrl,
        },
      });
    }

    let razorpayOrderId = `order_${crypto.randomBytes(8).toString('hex')}`;

    // Create Razorpay Order via Live API (for paid ebooks >= ₹1)
    if (!isDemoRazorpay) {
      try {
        const rzpOrder = await razorpayInstance.orders.create({
          amount: amountInPaise,
          currency: 'INR',
          receipt: orderRef,
          notes: {
            productId: resolvedProductId,
            productSlug,
            customerEmail,
          },
        });
        razorpayOrderId = rzpOrder.id;
      } catch (err: any) {
        console.error('Razorpay Live Order creation error:', err);
        return NextResponse.json({
          success: false,
          error: `Razorpay Error: ${err?.error?.description || err.message || 'Payment initialization failed'}`,
        }, { status: 500 });
      }
    }

    // Record paid order in Database
    let dbOrderId = resolvedProductId;
    try {
      const newOrder = await prisma.order.create({
        data: {
          orderRef,
          productId: resolvedProductId,
          productTitle,
          customerName,
          customerEmail,
          customerPhone: customerPhone || null,
          amountInPaise,
          currency: 'INR',
          razorpayOrderId,
          status: 'PENDING',
        },
      });
      dbOrderId = newOrder.id;
    } catch (orderDbErr) {
      console.warn('[Order DB Create Warning]:', orderDbErr);
      dbOrderId = orderRef;
    }

    return NextResponse.json({
      success: true,
      isFree: false,
      order: {
        id: dbOrderId,
        orderRef,
        amountInPaise,
        currency: 'INR',
        razorpayOrderId,
        productTitle,
        customerName,
        customerEmail,
        keyId: process.env.RAZORPAY_KEY_ID || 'rzp_live_SE3ZS0Lx0QfzHY',
        isDemo: isDemoRazorpay,
      },
    });
  } catch (error: any) {
    console.error('Create Order API Critical Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Server error' }, { status: 500 });
  }
}
