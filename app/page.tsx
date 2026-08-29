import React from 'react';
import { prisma } from '@/lib/db';
import Hero from '@/components/Hero';
import ThreeBooksSection, { ProductItem } from '@/components/ThreeBooksSection';
import PlanToPractice from '@/components/PlanToPractice';
import WhyTheseBooks from '@/components/WhyTheseBooks';
import WhyGoPustak from '@/components/WhyGoPustak';
import SamplePagesGallery from '@/components/SamplePagesGallery';
import FAQSection from '@/components/FAQSection';
import TelegramBanner from '@/components/TelegramBanner';
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
    <LandingClientWrapper products={products}>
      {/* Hero Section with 3 Real Ebook Mockups */}
      <Hero />

      {/* Core Dynamic Three Books Section */}
      <div id="three-books-container">
        {/* Handled in LandingClientWrapper for interactive modal triggers */}
      </div>

      {/* Preparation Framework: 01 Plan, 02 Master, 03 Practice */}
      <PlanToPractice />

      {/* Why GoPustak: 4 Pillars */}
      <WhyGoPustak />

      {/* Sample Pages Excerpt Gallery */}
      <div id="sample-pages-container">
        {/* Handled in LandingClientWrapper */}
      </div>

      {/* Why These 3 Books: 3 Pillars */}
      <WhyTheseBooks />

      {/* Telegram Community Connect Banner */}
      <TelegramBanner />

      {/* FAQ Section */}
      <FAQSection />
    </LandingClientWrapper>
  );
}
