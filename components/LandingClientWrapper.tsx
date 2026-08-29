'use client';

import React, { useState } from 'react';
import ThreeBooksSection, { ProductItem } from './ThreeBooksSection';
import SamplePagesGallery from './SamplePagesGallery';
import CheckoutModal from './CheckoutModal';
import SampleModal from './SampleModal';

interface LandingClientWrapperProps {
  products: ProductItem[];
  children?: React.ReactNode;
}

export default function LandingClientWrapper({
  products,
  children,
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
      {/* 1. Hero & Top sections */}
      {Array.isArray(children) ? children[0] : children}

      {/* 2. Three Books Section */}
      <ThreeBooksSection
        products={products}
        onBuyNow={handleBuyNow}
        onViewSample={handleViewSample}
      />

      {/* 3. Framework & Why GoPustak */}
      {Array.isArray(children) && children.slice(2, 4)}

      {/* 4. Sample Pages Gallery */}
      <SamplePagesGallery
        products={products}
        onViewSample={handleViewSample}
      />

      {/* 5. Remaining sections (WhyTheseBooks, FAQ) */}
      {Array.isArray(children) && children.slice(4)}

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
