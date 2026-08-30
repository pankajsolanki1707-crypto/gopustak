import React from 'react';
import { prisma } from '@/lib/db';
import { ProductItem } from '@/components/ThreeBooksSection';
import LandingClientWrapper from '@/components/LandingClientWrapper';

// Always serve real-time dynamic data so changes in the Admin Panel reflect immediately
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  // Dynamically load active products from database in real-time
  let products: ProductItem[] = [];
  try {
    const dbProducts = await prisma.product.findMany({
      where: { published: true },
      orderBy: { displayOrder: 'asc' },
    });
    products = dbProducts.map((p) => ({
      ...p,
      highlights: typeof p.highlights === 'string' ? JSON.parse(p.highlights || '[]') : p.highlights,
      samplePages: typeof p.samplePages === 'string' ? JSON.parse(p.samplePages || '[]') : p.samplePages,
    }));
  } catch (error) {
    console.error('Error loading products from DB:', error);
  }

  return <LandingClientWrapper products={products} />;
}
