import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { published: true },
      orderBy: { displayOrder: 'asc' },
    });
    const parsed = products.map((p) => ({
      ...p,
      highlights: JSON.parse(p.highlights || '[]'),
      samplePages: JSON.parse(p.samplePages || '[]'),
    }));
    return NextResponse.json({ success: true, products: parsed });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
