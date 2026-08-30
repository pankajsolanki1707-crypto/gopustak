'use client';

import React, { useState, useEffect } from 'react';
import Hero from './Hero';
import ThreeBooksSection, { ProductItem } from './ThreeBooksSection';
import WhyGoPustak from './WhyGoPustak';
import SamplePagesGallery from './SamplePagesGallery';
import WhyTheseBooks from './WhyTheseBooks';
import TelegramBanner from './TelegramBanner';
import FAQSection from './FAQSection';
import CheckoutModal from './CheckoutModal';
import SampleModal from './SampleModal';

interface LandingClientWrapperProps {
  products: ProductItem[];
  heroChild?: React.ReactNode;
}

export default function LandingClientWrapper({
  products: initialProducts,
}: LandingClientWrapperProps) {
  const [currentProducts, setCurrentProducts] = useState<ProductItem[]>(initialProducts || []);
  const [selectedBuyProduct, setSelectedBuyProduct] = useState<ProductItem | null>(null);
  const [selectedSampleProduct, setSelectedSampleProduct] = useState<ProductItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSampleOpen, setIsSampleOpen] = useState(false);

  // Live real-time fetch to guarantee immediate update when prices/details change in Admin
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

    // Also refresh on window focus
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
      {/* 1. Hero Section with Live Dynamic Prices */}
      <Hero products={currentProducts} />

      {/* 2. Exactly 3 Ebooks Grid */}
      <ThreeBooksSection
        products={currentProducts}
        onBuyNow={handleBuyNow}
        onViewSample={handleViewSample}
      />

      {/* 3. Why GoPustak: 4 Pillars */}
      <WhyGoPustak />

      {/* 4. Real PDF Sample Pages Gallery */}
      <SamplePagesGallery
        products={currentProducts}
        onViewSample={handleViewSample}
      />

      {/* 5. Why These 3 Books: Direct Breakdown */}
      <WhyTheseBooks />

      {/* 6. Telegram Community Connect Banner */}
      <TelegramBanner />

      {/* 7. Frequently Asked Questions */}
      <FAQSection />

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
