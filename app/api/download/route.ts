import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/db';
import { hashToken, verifySignedOrderToken } from '@/lib/secure-token';

export const dynamic = 'force-dynamic';

const PDF_MAP: Record<string, string> = {
  'upsc-epfo-apfc-2026-special-subjects-mock-tests-hindi': 'UPSC_APFC_Special plus MCQ_all_in_one_hindi.pdf',
  'crack-upsc-epfo-apfc-2026-blueprint': 'EP_GUIDE_ENG.pdf',
  'upsc-epfo-apfc-practice-ebook-full-mock-tests': 'Upsc_APFC_All_in_one_Special subject plus mock plus best 500 mcq_english.pdf',
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const rawToken = searchParams.get('token');

    // 1. Never allow empty token or unauthorized parameter access
    if (!rawToken || rawToken.trim().length < 16) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized: A valid cryptographically signed download token is required.' },
        { status: 401 }
      );
    }

    // 2. Decode Signed Order Token (Stateless Verification)
    const tokenPayload = verifySignedOrderToken(rawToken);

    // 3. Hash incoming raw token to look up database record if present
    const tokenHash = hashToken(rawToken);

    let tokenRecord = null;
    try {
      tokenRecord = await prisma.downloadToken.findFirst({
        where: {
          tokenHash,
        },
      });
    } catch (dbErr) {
      console.warn('[Download DB Lookup Warning]:', dbErr);
    }

    // 4. Verify Token Record & Expiration
    if (tokenRecord) {
      if (new Date() > new Date(tokenRecord.expiresAt)) {
        return NextResponse.json(
          { success: false, error: 'Download access link has expired (24-hour validity limit). Please check your email or contact support.' },
          { status: 410 }
        );
      }

      if (tokenRecord.downloadCount >= tokenRecord.maxDownloads) {
        return NextResponse.json(
          { success: false, error: `Download rate limit reached (${tokenRecord.maxDownloads} downloads max). Please contact support for renewal.` },
          { status: 429 }
        );
      }
    } else if (!tokenPayload) {
      // Neither DB record nor signed token valid
      return NextResponse.json(
        { success: false, error: 'Invalid or expired download access token.' },
        { status: 401 }
      );
    }

    // 5. Verify Purchase Entitlement & Order Status
    let targetProductId = tokenRecord?.productId || tokenPayload?.productId || '';
    let downloadSlug = tokenPayload?.productSlug || 'upsc-epfo-apfc-ebook';
    let pdfFileName = '';

    if (tokenRecord) {
      try {
        const order = await prisma.order.findFirst({
          where: {
            OR: [
              { id: tokenRecord.orderId },
              { orderRef: tokenRecord.orderRef },
            ],
          },
        });

        if (order && order.status !== 'PAID') {
          return NextResponse.json(
            { success: false, error: 'Access Denied: Payment has not been confirmed for this order.' },
            { status: 403 }
          );
        }

        const product = await prisma.product.findFirst({
          where: {
            OR: [
              { id: targetProductId },
              { id: order?.productId },
              { slug: targetProductId },
            ],
          },
        });

        if (product) {
          pdfFileName = product.pdfFileName;
          downloadSlug = product.slug;
        }
      } catch (dbErr) {
        console.warn('[Download Order Verification Warning]:', dbErr);
      }
    }

    // 6. Match PDF Filename
    if (!pdfFileName) {
      for (const [slug, fileName] of Object.entries(PDF_MAP)) {
        if (targetProductId.includes(slug) || rawToken.includes(slug)) {
          pdfFileName = fileName;
          downloadSlug = slug;
          break;
        }
      }
      if (!pdfFileName) {
        pdfFileName = 'EP_GUIDE_ENG.pdf';
        downloadSlug = 'crack-upsc-epfo-apfc-2026-blueprint';
      }
    }

    // 7. Locate PDF in Private Storage (Never exposed in /public)
    const candidatePaths = [
      path.join(process.cwd(), 'server_storage', 'ebooks', pdfFileName),
      path.resolve('./server_storage/ebooks', pdfFileName),
    ];

    let filePath = '';
    for (const p of candidatePaths) {
      if (fs.existsSync(p)) {
        filePath = p;
        break;
      }
    }

    if (!filePath) {
      return NextResponse.json(
        { success: false, error: 'Ebook file not found in secure server storage.' },
        { status: 404 }
      );
    }

    // 8. Increment & Log Download Counter if DB is available
    if (tokenRecord) {
      try {
        await prisma.downloadToken.update({
          where: { id: tokenRecord.id },
          data: {
            downloadCount: { increment: 1 },
            lastDownloadedAt: new Date(),
          },
        });
      } catch (logErr) {
        console.warn('[Download Counter Log Warning]:', logErr);
      }
    }

    const fileStat = fs.statSync(filePath);
    const fileBuffer = fs.readFileSync(filePath);

    // 9. Stream Binary Attachment without exposing internal filesystem paths
    const cleanDownloadName = `${downloadSlug}.pdf`;
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': fileStat.size.toString(),
        'Content-Disposition': `attachment; filename="${cleanDownloadName}"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        'Pragma': 'no-cache',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error: any) {
    console.error('[Download Route Exception]:', error);
    return NextResponse.json({ success: false, error: error.message || 'Download error' }, { status: 500 });
  }
}
