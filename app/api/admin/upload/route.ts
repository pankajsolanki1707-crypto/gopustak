import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const ebookDir = path.join(process.cwd(), 'server_storage', 'ebooks');
    const coversDir = path.join(process.cwd(), 'public', 'covers');

    let availablePdfs: string[] = [];
    if (fs.existsSync(ebookDir)) {
      availablePdfs = fs.readdirSync(ebookDir).filter((f) => f.toLowerCase().endsWith('.pdf'));
    }

    let availableCovers: string[] = [];
    if (fs.existsSync(coversDir)) {
      availableCovers = fs.readdirSync(coversDir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
    }

    return NextResponse.json({
      success: true,
      availablePdfs,
      availableCovers: availableCovers.map((c) => `/covers/${c}`),
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;
    const type = (formData.get('type') as string) || 'cover'; // 'cover' or 'pdf'

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided in request' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize file name
    const originalName = file.name.replace(/[^a-zA-Z0-9._ -]/g, '_');
    const ext = path.extname(originalName).toLowerCase();

    if (type === 'cover') {
      const allowedExts = ['.png', '.jpg', '.jpeg', '.webp'];
      if (!allowedExts.includes(ext)) {
        return NextResponse.json(
          { success: false, error: `Invalid image type (${ext}). Allowed: PNG, JPG, JPEG, WEBP` },
          { status: 400 }
        );
      }

      const cleanFileName = `cover-${Date.now()}-${originalName.replace(/\s+/g, '_')}`;

      // Write to public/covers and fallback to /tmp
      const targetDirs = [
        path.join(process.cwd(), 'public', 'covers'),
        path.join('/tmp', 'public', 'covers'),
      ];

      for (const dir of targetDirs) {
        try {
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(path.join(dir, cleanFileName), buffer);
        } catch (e) {
          // Continue to next directory if read-only
        }
      }

      const publicUrl = `/covers/${cleanFileName}`;
      return NextResponse.json({
        success: true,
        type: 'cover',
        url: publicUrl,
        filename: cleanFileName,
        size: buffer.length,
      });
    } else if (type === 'pdf') {
      if (ext !== '.pdf') {
        return NextResponse.json(
          { success: false, error: `Invalid file type (${ext}). Only PDF ebooks are allowed.` },
          { status: 400 }
        );
      }

      // Preserve exact original filename or clean name
      const cleanFileName = originalName;

      const targetDirs = [
        path.join(process.cwd(), 'server_storage', 'ebooks'),
        path.join('/tmp', 'server_storage', 'ebooks'),
      ];

      for (const dir of targetDirs) {
        try {
          if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(path.join(dir, cleanFileName), buffer);
        } catch (e) {
          // Continue to next directory if read-only
        }
      }

      return NextResponse.json({
        success: true,
        type: 'pdf',
        filename: cleanFileName,
        size: buffer.length,
      });
    } else {
      return NextResponse.json({ success: false, error: 'Invalid upload type specified' }, { status: 400 });
    }
  } catch (error: any) {
    console.error('File upload error:', error);
    return NextResponse.json({ success: false, error: error.message || 'File upload failed' }, { status: 500 });
  }
}
