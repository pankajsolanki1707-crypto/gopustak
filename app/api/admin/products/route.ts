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

async function handleUpdateProduct(req: Request) {
  try {
    const data = await req.json();
    const { id, slug, priceInPaise, mrpInPaise, title, subtitle, shortDescription, longDescription, published } = data;

    if (!id && !slug) {
      return NextResponse.json({ success: false, error: 'Product ID or slug is required' }, { status: 400 });
    }

    // Lookup by ID or Slug for resilient matching
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

    console.log(`[Admin Update Product] ${updated.slug} updated successfully -> Price: ₹${updated.priceInPaise / 100}, MRP: ₹${updated.mrpInPaise / 100}`);

    return NextResponse.json({
      success: true,
      product: {
        ...updated,
        highlights: typeof updated.highlights === 'string' ? JSON.parse(updated.highlights || '[]') : updated.highlights,
        samplePages: typeof updated.samplePages === 'string' ? JSON.parse(updated.samplePages || '[]') : updated.samplePages,
      },
    });
  } catch (error: any) {
    console.error('[Admin Update Product Error]:', error);
    return NextResponse.json({ success: false, error: error.message || 'Database update failed' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  return handleUpdateProduct(req);
}

export async function POST(req: Request) {
  return handleUpdateProduct(req);
}
