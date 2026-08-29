import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/db';
import { verifyDownloadToken } from '@/lib/secure-token';

export const dynamic = 'force-dynamic';

const PDF_MAP: Record<string, string> = {
  'upsc-epfo-apfc-2026-special-subjects-mock-tests-hindi': 'upsc_epfo_special_subjects_mock_test_hindi.pdf',
  'crack-upsc-epfo-apfc-2026-blueprint': 'EP_GUIDE_ENG.pdf',
  'upsc-epfo-apfc-practice-ebook-full-mock-tests': 'UPSC_EPFO_SPECIAL_SUBJECTS_MOCK_TEST2.pdf',
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Missing download token' }, { status: 401 });
    }

    // Verify token validity and expiration via HMAC SHA256
    const tokenVerification = verifyDownloadToken(token);
    if (!tokenVerification.valid) {
      if (tokenVerification.expired) {
        return NextResponse.json({ success: false, error: 'Download link has expired. Please contact support.' }, { status: 410 });
      }
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid token' }, { status: 403 });
    }

    const orderId = tokenVerification.orderId;
    if (!orderId) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Invalid order reference' }, { status: 403 });
    }

    let pdfFileName = '';
    let downloadSlug = 'gopustak-ebook';

    // 1. Try finding order from DB
    try {
      const order = await prisma.order.findFirst({
        where: {
          OR: [
            { id: orderId },
            { orderRef: orderId },
            { razorpayOrderId: orderId },
          ],
        },
      });

      if (order) {
        const product = await prisma.product.findFirst({
          where: {
            OR: [{ id: order.productId }, { slug: order.productId }],
          },
        });
        if (product && product.pdfFileName) {
          pdfFileName = product.pdfFileName;
          downloadSlug = product.slug;
        }
      }
    } catch (dbErr) {
      console.warn('[Download DB Warning] DB lookup skipped:', dbErr);
    }

    // 2. If not found via DB, match from verified PDF Map
    if (!pdfFileName) {
      for (const [slug, fileName] of Object.entries(PDF_MAP)) {
        if (orderId.includes(slug)) {
          pdfFileName = fileName;
          downloadSlug = slug;
          break;
        }
      }
      if (!pdfFileName) {
        // Fallback default
        pdfFileName = 'EP_GUIDE_ENG.pdf';
        downloadSlug = 'crack-upsc-epfo-apfc-2026-blueprint';
      }
    }

    // Locate PDF in private server storage
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
      return NextResponse.json({ success: false, error: 'Ebook file not found in secure storage' }, { status: 404 });
    }

    const fileStat = fs.statSync(filePath);
    const fileBuffer = fs.readFileSync(filePath);

    // Stream download attachment
    const cleanDownloadName = `${downloadSlug}.pdf`;
    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': fileStat.size.toString(),
        'Content-Disposition': `attachment; filename="${cleanDownloadName}"`,
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        'Pragma': 'no-cache',
      },
    });
  } catch (error: any) {
    console.error('Download Route Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
