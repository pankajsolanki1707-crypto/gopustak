import { MetadataRoute } from 'next';
import { prisma } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gopustak.in';

  // Dynamic products from database
  let productEntries: MetadataRoute.Sitemap = [];
  try {
    const products = await prisma.product.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
    });

    productEntries = products.map((p) => ({
      url: `${baseUrl}/book/${p.slug}`,
      lastModified: p.updatedAt || new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    }));
  } catch (err) {
    console.warn('[Sitemap Generation Warning]:', err);
  }

  // Fallback if DB fetch is empty
  if (productEntries.length === 0) {
    productEntries = [
      {
        url: `${baseUrl}/book/crack-upsc-epfo-apfc-2026-blueprint`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/book/upsc-epfo-apfc-2026-special-subjects-mock-tests-hindi`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/book/upsc-epfo-apfc-practice-ebook-full-mock-tests`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.9,
      },
    ];
  }

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    ...productEntries,
  ];
}
