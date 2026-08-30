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
        return NextResponse.json({ success: false, error: 'A product with this slug already exists.' }, { status: 400 });
      }

      const newProduct = await prisma.product.create({
        data: {
          title: title.trim(),
          subtitle: subtitle?.trim() || '',
          slug: slug.trim().toLowerCase().replace(/\s+/g, '-'),
          shortDescription: shortDescription?.trim() || title,
          longDescription: longDescription?.trim() || shortDescription || title,
          coverImage: coverImage?.trim() || '/covers/cover-product-2.png',
          pdfFileName: pdfFileName?.trim() || 'EP_GUIDE_ENG.pdf',
          language: language?.trim() || 'English',
          edition: edition?.trim() || '2026 Edition',
          pageCount: pageCount?.trim() || 'PDF Ebook',
          priceInPaise: Number(priceInPaise) || 9900,
          mrpInPaise: Number(mrpInPaise) || 29900,
          category: category?.trim() || 'UPSC EPFO / APFC',
          published: published !== false,
          highlights: JSON.stringify(['Instant Digital Download', 'PDF Format', 'Printable']),
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
    const { id, slug, priceInPaise, mrpInPaise, title, subtitle, shortDescription, longDescription, published } = data;

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
        ...(priceInPaise !== undefined ? { priceInPaise: Number(priceInPaise) } : {}),
        ...(mrpInPaise !== undefined ? { mrpInPaise: Number(mrpInPaise) } : {}),
        ...(title ? { title } : {}),
        ...(subtitle !== undefined ? { subtitle } : {}),
        ...(shortDescription ? { shortDescription } : {}),
        ...(longDescription ? { longDescription } : {}),
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
      return NextResponse.json({ success: false, error: 'Product ID parameter is required' }, { status: 400 });
    }

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error: any) {
    console.error('[Admin DELETE Error]:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
