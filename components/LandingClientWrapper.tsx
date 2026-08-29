'use client';

import React, { useState } from 'react';
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
  heroChild: React.ReactNode;
}

export default function LandingClientWrapper({
  products,
  heroChild,
}: LandingClientWrapperProps) {
  const [selectedBuyProduct, setSelectedBuyProduct] = useState<ProductItem | null>(null);
  const [selectedSampleProduct, setSelectedSampleProduct] = useState<ProductItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSampleOpen, setIsSampleOpen] = useState(false);

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
      {/* 1. Hero Section */}
      {heroChild}

      {/* 2. Exactly 3 Ebooks Grid */}
      <ThreeBooksSection
        products={products}
        onBuyNow={handleBuyNow}
        onViewSample={handleViewSample}
      />

      {/* 3. Why GoPustak: 4 Pillars */}
      <WhyGoPustak />

      {/* 4. Real PDF Sample Pages Gallery */}
      <SamplePagesGallery
        products={products}
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
