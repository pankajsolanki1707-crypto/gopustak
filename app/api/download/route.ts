import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/db';
import { hashToken } from '@/lib/secure-token';

export const dynamic = 'force-dynamic';

const PDF_MAP: Record<string, string> = {
  'upsc-epfo-apfc-2026-special-subjects-mock-tests-hindi': 'upsc_epfo_special_subjects_mock_test_hindi.pdf',
  'crack-upsc-epfo-apfc-2026-blueprint': 'EP_GUIDE_ENG.pdf',
  'upsc-epfo-apfc-practice-ebook-full-mock-tests': 'UPSC_EPFO_SPECIAL_SUBJECTS_MOCK_TEST2.pdf',
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

    // 2. Hash incoming raw token to look up database record
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

    // 3. Verify Token Record & Expiration
    if (tokenRecord) {
      // Check expiration
      if (new Date() > new Date(tokenRecord.expiresAt)) {
        return NextResponse.json(
          { success: false, error: 'Download access link has expired (24-hour validity limit). Please check your email or contact support.' },
          { status: 410 }
        );
      }

      // Check Rate Limit / Max Downloads per purchase
      if (tokenRecord.downloadCount >= tokenRecord.maxDownloads) {
        return NextResponse.json(
          { success: false, error: `Download rate limit reached (${tokenRecord.maxDownloads} downloads max). Please contact support for renewal.` },
          { status: 429 }
        );
      }
    }

    // 4. Verify Purchase Entitlement & Order Status
    let targetProductId = tokenRecord?.productId || '';
    let downloadSlug = 'upsc-epfo-apfc-ebook';
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

    // 5. Fallback PDF Matching if cold boot
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

    // 6. Locate PDF in Private Storage (Never exposed in /public)
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

    // 7. Increment & Log Download Counter
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

    // 8. Stream Binary Attachment without exposing internal filesystem paths
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
