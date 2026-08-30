import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      where: { published: true },
      orderBy: { displayOrder: 'asc' },
    });
    const parsed = products.map((p) => ({
      ...p,
      highlights: typeof p.highlights === 'string' ? JSON.parse(p.highlights || '[]') : p.highlights,
      samplePages: typeof p.samplePages === 'string' ? JSON.parse(p.samplePages || '[]') : p.samplePages,
    }));
    return NextResponse.json({ success: true, products: parsed });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
