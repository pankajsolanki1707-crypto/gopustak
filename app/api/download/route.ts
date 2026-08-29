import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { prisma } from '@/lib/db';
import { verifyDownloadToken } from '@/lib/secure-token';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ success: false, error: 'Unauthorized: Missing download token' }, { status: 401 });
    }

    // Verify token validity and expiration
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

    // Fetch order from DB
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order || order.status !== 'PAID') {
      return NextResponse.json({ success: false, error: 'Access Denied: Payment not confirmed' }, { status: 403 });
    }

    // Fetch product to locate private PDF
    const product = await prisma.product.findUnique({
      where: { id: order.productId },
    });

    if (!product || !product.pdfFileName) {
      return NextResponse.json({ success: false, error: 'Ebook file not found on server' }, { status: 404 });
    }

    // Locate PDF in private server storage (NOT in public)
    const filePath = path.join(process.cwd(), 'server_storage', 'ebooks', product.pdfFileName);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: false, error: 'Ebook file not found in secure storage' }, { status: 404 });
    }

    // Update download count
    try {
      await prisma.downloadToken.updateMany({
        where: { token },
        data: { downloadCount: { increment: 1 } },
      });
    } catch {
      // Non-blocking
    }

    const fileStat = fs.statSync(filePath);
    const fileBuffer = fs.readFileSync(filePath);

    // Stream download
    const cleanDownloadName = `${product.slug}.pdf`;
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
