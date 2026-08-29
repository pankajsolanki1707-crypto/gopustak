import React from 'react';
import { prisma } from '@/lib/db';
import Hero from '@/components/Hero';
import { ProductItem } from '@/components/ThreeBooksSection';
import LandingClientWrapper from '@/components/LandingClientWrapper';

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  // Dynamically load active products from database
  let products: ProductItem[] = [];
  try {
    const dbProducts = await prisma.product.findMany({
      where: { published: true },
      orderBy: { displayOrder: 'asc' },
    });
    products = dbProducts.map((p) => ({
      ...p,
      highlights: JSON.parse(p.highlights || '[]'),
      samplePages: JSON.parse(p.samplePages || '[]'),
    }));
  } catch (error) {
    console.error('Error loading products from DB:', error);
  }

  return (
    <LandingClientWrapper products={products} heroChild={<Hero />} />
  );
}
