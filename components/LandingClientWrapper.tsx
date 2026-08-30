'use client';

import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import ThreeBooksSection, { ProductItem } from './ThreeBooksSection';
import TelegramBanner from './TelegramBanner';
import WhyGoPustak from './WhyGoPustak';
import SamplePagesGallery from './SamplePagesGallery';
import WhyTheseBooks from './WhyTheseBooks';
import FAQSection from './FAQSection';
import FinalCTA from './FinalCTA';
import CheckoutModal from './CheckoutModal';
import SampleModal from './SampleModal';

interface LandingClientWrapperProps {
  products: ProductItem[];
}

export default function LandingClientWrapper({
  products: initialProducts,
}: LandingClientWrapperProps) {
  const [currentProducts, setCurrentProducts] = useState<ProductItem[]>(initialProducts || []);
  const [selectedBuyProduct, setSelectedBuyProduct] = useState<ProductItem | null>(null);
  const [selectedSampleProduct, setSelectedSampleProduct] = useState<ProductItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSampleOpen, setIsSampleOpen] = useState(false);

  // Live real-time sync with database
  const refreshProducts = async () => {
    try {
      const res = await fetch('/api/products', { cache: 'no-store' });
      const data = await res.json();
      if (data.success && Array.isArray(data.products) && data.products.length > 0) {
        setCurrentProducts(data.products);
      }
    } catch (err) {
      console.warn('Live product sync warning:', err);
    }
  };

  useEffect(() => {
    refreshProducts();

    const handleFocus = () => refreshProducts();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  const handleBuyNow = (product: ProductItem) => {
    setSelectedBuyProduct(product);
    setIsCheckoutOpen(true);
  };

  const handleViewSample = (product: ProductItem) => {
    setSelectedSampleProduct(product);
    setIsSampleOpen(true);
  };

  return (
    <>
      {/* 1. HERO: Focused Ebooks for UPSC EPFO & APFC Aspirants • 3 Real Covers • CTA */}
      <Hero products={currentProducts} />

      {/* 2. THREE BOOKS: Exactly 3 Products */}
      <ThreeBooksSection
        products={currentProducts}
        onBuyNow={handleBuyNow}
        onViewSample={handleViewSample}
      />

      {/* 3. TELEGRAM COMMUNITY: Moved right after Three Books */}
      <TelegramBanner />

      {/* 4. WHY CHOOSE GOPUSTAK: 4 Compact Pillars */}
      <WhyGoPustak />

      {/* 5. SEE BEFORE YOU BUY: Real PDF Sample Pages */}
      <SamplePagesGallery
        products={currentProducts}
        onViewSample={handleViewSample}
      />

      {/* 6. WHY THESE 3 BOOKS: PLAN -> MASTER -> PRACTICE */}
      <WhyTheseBooks />

      {/* 7. FAQ: 7 Practical Questions & Answers */}
      <FAQSection />

      {/* 8. FINAL CTA: Start Your EPFO/APFC Preparation Today */}
      <FinalCTA />

      {/* Interactive Checkout Modal */}
      <CheckoutModal
        product={selectedBuyProduct}
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setSelectedBuyProduct(null);
        }}
      />

      {/* Interactive Sample Pages Viewer Modal */}
      <SampleModal
        product={selectedSampleProduct}
        isOpen={isSampleOpen}
        onClose={() => {
          setIsSampleOpen(false);
          setSelectedSampleProduct(null);
        }}
        onBuyNow={handleBuyNow}
      />
    </>
  );
}
