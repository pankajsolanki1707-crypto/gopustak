import React from 'react';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import BookDetailClient from '@/components/BookDetailClient';
import type { Metadata } from 'next';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product) {
    return { title: 'Ebook Not Found | GoPustak' };
  }

  return {
    title: `${product.title} | GoPustak`,
    description: product.shortDescriptionEn || product.shortDescription,
    openGraph: {
      title: product.title,
      description: product.shortDescriptionEn || product.shortDescription,
      images: [{ url: product.coverImage }],
    },
  };
}

export default async function BookDetailPage({ params }: Props) {
  const dbProduct = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!dbProduct || !dbProduct.published) {
    notFound();
  }

  const product = {
    ...dbProduct,
    highlights: JSON.parse(dbProduct.highlights || '[]'),
    samplePages: JSON.parse(dbProduct.samplePages || '[]'),
  };

  return <BookDetailClient product={product} />;
}
