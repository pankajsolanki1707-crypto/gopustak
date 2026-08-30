import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  try {
    const products = await prisma.product.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return NextResponse.json({
      success: true,
      products: products.map((p) => ({
        ...p,
        highlights: typeof p.highlights === 'string' ? JSON.parse(p.highlights || '[]') : p.highlights,
        samplePages: typeof p.samplePages === 'string' ? JSON.parse(p.samplePages || '[]') : p.samplePages,
      })),
      orders,
    });
  } catch (error: any) {
    console.error('[Admin GET Products Error]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { action } = data;

    // Handle Create New Product
    if (action === 'create') {
      const {
        title,
        subtitle,
        slug,
        shortDescription,
        longDescription,
        coverImage,
        pdfFileName,
        language,
        edition,
        pageCount,
        priceInPaise,
        mrpInPaise,
        category,
        published,
      } = data;

      if (!title || !slug) {
        return NextResponse.json({ success: false, error: 'Title and Slug are required' }, { status: 400 });
      }

      // Check for existing slug
      const existingSlug = await prisma.product.findUnique({
        where: { slug: slug.trim().toLowerCase() },
      });

      if (existingSlug) {
        return NextResponse.json(
          { success: false, error: `An ebook with slug "${slug}" already exists.` },
          { status: 400 }
        );
      }

      const count = await prisma.product.count();

      const parsedPrice =
        priceInPaise !== undefined && !isNaN(Number(priceInPaise))
          ? Math.max(0, Number(priceInPaise))
          : 9900;

      const parsedMrp =
        mrpInPaise !== undefined && !isNaN(Number(mrpInPaise))
          ? Math.max(0, Number(mrpInPaise))
          : 29900;

      const newProduct = await prisma.product.create({
        data: {
          title: title.trim(),
          subtitle: subtitle?.trim() || null,
          slug: slug.trim().toLowerCase(),
          shortDescription: shortDescription?.trim() || title,
          longDescription: longDescription?.trim() || shortDescription?.trim() || title,
          coverImage: coverImage?.trim() || '/covers/cover-product-2.png',
          pdfFileName: pdfFileName?.trim() || 'EP_GUIDE_ENG.pdf',
          language: language?.trim() || 'English',
          format: 'PDF (Digital Ebook)',
          pageCount: pageCount?.trim() || 'Verified PDF',
          edition: edition?.trim() || '2026 Edition',
          displayOrder: count + 1,
          priceInPaise: parsedPrice,
          mrpInPaise: parsedMrp,
          category: category?.trim() || 'UPSC EPFO / APFC',
          published: published !== false,
          highlights: JSON.stringify([
            'Instant Digital Access',
            'PDF Format (Direct Printable)',
            'Grounded in UPSC Exam Pattern',
          ]),
          samplePages: JSON.stringify(['/samples/product-2-sample-1.png']),
        },
      });

      return NextResponse.json({ success: true, product: newProduct });
    }

    // Handle Delete Product
    if (action === 'delete') {
      const { id } = data;
      if (!id) {
        return NextResponse.json({ success: false, error: 'Product ID required to delete' }, { status: 400 });
      }
      await prisma.product.delete({
        where: { id },
      });
      return NextResponse.json({ success: true, message: 'Product removed successfully' });
    }

    // Handle Update Product
    const {
      id,
      slug,
      priceInPaise,
      mrpInPaise,
      title,
      subtitle,
      shortDescription,
      longDescription,
      coverImage,
      pdfFileName,
      language,
      edition,
      pageCount,
      published,
    } = data;

    const existing = await prisma.product.findFirst({
      where: {
        OR: [
          ...(id ? [{ id }] : []),
          ...(slug ? [{ slug }] : []),
          ...(id ? [{ slug: id }] : []),
        ],
      },
    });

    if (!existing) {
      return NextResponse.json({ success: false, error: `Product not found (ID: ${id || slug})` }, { status: 404 });
    }

    const updated = await prisma.product.update({
      where: { id: existing.id },
      data: {
        ...(priceInPaise !== undefined && !isNaN(Number(priceInPaise))
          ? { priceInPaise: Math.max(0, Number(priceInPaise)) }
          : {}),
        ...(mrpInPaise !== undefined && !isNaN(Number(mrpInPaise))
          ? { mrpInPaise: Math.max(0, Number(mrpInPaise)) }
          : {}),
        ...(title ? { title } : {}),
        ...(subtitle !== undefined ? { subtitle } : {}),
        ...(shortDescription ? { shortDescription } : {}),
        ...(longDescription ? { longDescription } : {}),
        ...(coverImage ? { coverImage } : {}),
        ...(pdfFileName ? { pdfFileName } : {}),
        ...(language ? { language } : {}),
        ...(edition ? { edition } : {}),
        ...(pageCount ? { pageCount } : {}),
        ...(published !== undefined ? { published: Boolean(published) } : {}),
      },
    });

    return NextResponse.json({ success: true, product: updated });
  } catch (error: any) {
    console.error('[Admin Product Operation Error]:', error);
    return NextResponse.json({ success: false, error: error.message || 'Operation failed' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error('[Admin DELETE Product Error]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
