import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(req: Request) {
  try {
    const products = await prisma.product.findMany({
      orderBy: { displayOrder: 'asc' },
    });
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 20,
    });
    return NextResponse.json({
      success: true,
      products: products.map((p) => ({
        ...p,
        highlights: JSON.parse(p.highlights || '[]'),
        samplePages: JSON.parse(p.samplePages || '[]'),
      })),
      orders,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, priceInPaise, mrpInPaise, title, subtitle, shortDescription, longDescription, published } = data;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Product ID required' }, { status: 400 });
    }

    const updated = await prisma.product.update({
      where: { id },
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
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
