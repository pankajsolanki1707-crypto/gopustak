import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

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
    const originalName = file.name.toLowerCase().replace(/[^a-z0-9._-]/g, '_');
    const ext = path.extname(originalName);

    if (type === 'cover') {
      const allowedExts = ['.png', '.jpg', '.jpeg', '.webp'];
      if (!allowedExts.includes(ext)) {
        return NextResponse.json(
          { success: false, error: `Invalid image type (${ext}). Allowed: PNG, JPG, JPEG, WEBP` },
          { status: 400 }
        );
      }

      const targetDir = path.join(process.cwd(), 'public', 'covers');
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const cleanFileName = `cover-${Date.now()}-${originalName}`;
      const targetFilePath = path.join(targetDir, cleanFileName);
      fs.writeFileSync(targetFilePath, buffer);

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

      const targetDir = path.join(process.cwd(), 'server_storage', 'ebooks');
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      const cleanFileName = `ebook-${Date.now()}-${originalName}`;
      const targetFilePath = path.join(targetDir, cleanFileName);
      fs.writeFileSync(targetFilePath, buffer);

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
