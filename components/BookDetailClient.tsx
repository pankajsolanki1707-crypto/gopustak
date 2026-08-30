'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Check,
  Zap,
  ShoppingBag,
  Eye,
  FileText,
  Calendar,
  Globe,
  Layers,
  ArrowLeft,
  Lock,
  ChevronDown,
} from 'lucide-react';
import { ProductItem } from './ThreeBooksSection';
import BookMockup3D from './BookMockup3D';
import CheckoutModal from './CheckoutModal';
import SampleModal from './SampleModal';

interface BookDetailClientProps {
  product: ProductItem;
  otherProducts?: ProductItem[];
}

export default function BookDetailClient({
  product,
  otherProducts = [],
}: BookDetailClientProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSampleOpen, setIsSampleOpen] = useState(false);
  const [selectedBuyProduct, setSelectedBuyProduct] = useState<ProductItem>(product);
  const [selectedSampleProduct, setSelectedSampleProduct] = useState<ProductItem>(product);

  const priceInRs = Math.round(product.priceInPaise / 100);
  const mrpInRs = Math.round(product.mrpInPaise / 100);
  const discountPercent = mrpInRs > priceInRs ? Math.round(((mrpInRs - priceInRs) / mrpInRs) * 100) : 0;
  const samplePages = product.samplePages || [];

  const faqs = [
    {
      q: 'How will I receive the ebook after purchase?',
      a: 'Immediately upon successful payment via Razorpay, you will be redirected to the secure order success page with an instant download button. A secure download token is also delivered to your email.',
    },
    {
      q: 'Is this ebook printable?',
      a: 'Yes, the high-resolution PDF format is fully compatible with standard home and office printers for personal offline study.',
    },
    {
      q: 'Can I read on my smartphone or tablet?',
      a: 'Yes. The PDF is compatible with all devices (Android, iOS, iPadOS, Windows, macOS) using any standard PDF reader application.',
    },
  ];
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const handleBuy = (prod: ProductItem) => {
    setSelectedBuyProduct(prod);
    setIsCheckoutOpen(true);
  };

  const handleSample = (prod: ProductItem) => {
    setSelectedSampleProduct(prod);
    setIsSampleOpen(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Breadcrumb Bar */}
      <div className="bg-slate-950 border-b border-slate-800 text-slate-400 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Link href="/" className="hover:text-amber-400 transition-colors flex items-center gap-1 font-medium">
              <ArrowLeft className="w-3.5 h-3.5" /> Home
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-slate-200 line-clamp-1">{product.title}</span>
          </div>
          <span className="hidden sm:inline-block font-bold text-amber-400 text-[11px] uppercase tracking-wider">
            {product.category}
          </span>
        </div>
      </div>

      {/* Main Product Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: 3D Cover & Sample Trigger */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="sticky top-24 w-full max-w-sm bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col items-center">
              
              <div className="w-full flex justify-between items-center mb-3">
                <span className="text-[10.5px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded shadow-sm">
                  {product.category}
                </span>
                <span className="text-[10.5px] font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  {product.edition}
                </span>
              </div>

              {/* 3D Realistic Cover */}
              <div className="my-3 cursor-pointer" onClick={() => handleSample(product)}>
                <BookMockup3D
                  coverUrl={product.coverImage}
                  title={product.title}
                  size="md"
                  priority={true}
                />
              </div>

              {/* View Sample CTA */}
              <button
                onClick={() => handleSample(product)}
                className="w-full mt-3 py-2.5 px-4 rounded-xl text-xs font-bold text-amber-400 hover:text-amber-300 bg-slate-900 hover:bg-slate-800 border border-slate-700 flex items-center justify-center gap-2 transition-all shadow-sm"
              >
                <Eye className="w-4 h-4" />
                PREVIEW SAMPLE PAGES ({samplePages.length} PAGES)
              </button>

              <div className="w-full mt-5 pt-4 border-t border-slate-800 flex items-center justify-around text-[11px] text-slate-400 font-medium">
                <div className="flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Instant Access</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verified PDF</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Title, Pricing, Highlights, Description */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            
            {/* Header Box */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-sm space-y-4">
              <div className="space-y-1.5">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {product.title}
                </h1>
                {product.subtitle && (
                  <p className="text-xs sm:text-sm font-bold text-amber-800">
                    {product.subtitle}
                  </p>
                )}
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Price & Purchase Bar */}
              <div className="p-4 sm:p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2.5">
                    <span className="text-3xl font-black text-slate-900">
                      ₹{priceInRs}
                    </span>
                    {mrpInRs > priceInRs && (
                      <span className="text-sm font-semibold text-slate-400 line-through">
                        ₹{mrpInRs}
                      </span>
                    )}
                    <span className="text-[10.5px] font-bold text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded uppercase tracking-wider">
                      Welcome Offer
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    One-time payment • Instant personal PDF download
                  </p>
                </div>

                <button
                  onClick={() => handleBuy(product)}
                  className="px-6 py-3.5 rounded-xl font-extrabold text-xs sm:text-sm bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 transform active:scale-95 shrink-0"
                >
                  <ShoppingBag className="w-4 h-4" />
                  BUY NOW & DOWNLOAD
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 pt-0.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Secure payment via Razorpay. Direct PDF download enabled on confirmation screen.</span>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center">
                <FileText className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                <span className="block text-[10.5px] text-slate-500 font-medium">Format</span>
                <span className="text-xs font-bold text-slate-900">{product.format}</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center">
                <Globe className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                <span className="block text-[10.5px] text-slate-500 font-medium">Language</span>
                <span className="text-xs font-bold text-slate-900">{product.language}</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center">
                <Layers className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span className="block text-[10.5px] text-slate-500 font-medium">Pages</span>
                <span className="text-xs font-bold text-slate-900">{product.pageCount || 'Full PDF'}</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center">
                <Calendar className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                <span className="block text-[10.5px] text-slate-500 font-medium">Edition</span>
                <span className="text-xs font-bold text-slate-900">{product.edition}</span>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Key Features & Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="leading-snug">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Content Overview */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                About this Ebook
              </h2>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {product.longDescription}
              </div>
            </div>

            {/* Sample Pages Thumbnails */}
            {samplePages.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-base sm:text-lg font-bold text-slate-900">
                    Sample Excerpts ({samplePages.length} Pages)
                  </h2>
                  <button
                    onClick={() => handleSample(product)}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800"
                  >
                    Open preview gallery →
                  </button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {samplePages.map((url, i) => (
                    <div
                      key={i}
                      onClick={() => handleSample(product)}
                      className="cursor-pointer border border-slate-200 rounded-lg overflow-hidden hover:border-amber-500 hover:shadow-md transition-all aspect-[1/1.4]"
                    >
                      <img src={url} alt={`Sample ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Book-Specific FAQ */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Frequently Asked Questions
              </h2>
              <div className="space-y-2 pt-1">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIdx === idx;
                  return (
                    <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                        className="w-full px-4 py-3 text-left flex items-center justify-between gap-3 text-xs sm:text-sm font-bold text-slate-900 hover:text-amber-700"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-amber-600' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-3 text-xs text-slate-600 border-t border-slate-100 bg-slate-50/50 pt-2 leading-relaxed">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

        {/* Section 16: Complete Your EPFO/APFC Preparation (Other 2 Books) */}
        {otherProducts.length > 0 && (
          <div className="mt-16 sm:mt-20 pt-12 border-t border-slate-200 space-y-8">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Complete Your EPFO/APFC Preparation
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Explore the other focused study resources in the GoPustak collection.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {otherProducts.map((other) => {
                const oPrice = Math.round(other.priceInPaise / 100);
                const oMrp = Math.round(other.mrpInPaise / 100);
                return (
                  <div
                    key={other.id || other.slug}
                    className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="flex gap-4 items-start">
                      <div className="w-20 shrink-0 rounded-lg overflow-hidden border border-slate-200 shadow-sm aspect-[1/1.4]">
                        <img src={other.coverImage} alt={other.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1 flex-1">
                        <span className="text-[10px] font-bold text-amber-700 uppercase bg-amber-100 px-2 py-0.5 rounded">
                          {other.edition}
                        </span>
                        <Link href={`/book/${other.slug}`} className="block font-bold text-slate-900 text-sm hover:text-amber-700 transition-colors line-clamp-2 leading-snug">
                          {other.title}
                        </Link>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                          {other.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-slate-900">₹{oPrice}</span>
                        {oMrp > oPrice && <span className="text-xs text-slate-400 line-through">₹{oMrp}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleSample(other)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
                        >
                          Sample
                        </button>
                        <button
                          onClick={() => handleBuy(other)}
                          className="px-3.5 py-1.5 rounded-lg text-xs font-extrabold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm transition-all"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>

      {/* Sticky Mobile Buy Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur border-t border-slate-200 p-3 px-4 shadow-lg flex items-center justify-between gap-4">
        <div>
          <span className="text-[10.5px] text-slate-500">Total Price</span>
          <div className="text-base font-extrabold text-slate-900">₹{priceInRs}</div>
        </div>
        <button
          onClick={() => handleBuy(product)}
          className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold bg-amber-500 text-slate-950 shadow flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-4 h-4" />
          BUY NOW & DOWNLOAD
        </button>
      </div>

      {/* Modals */}
      <CheckoutModal
        product={selectedBuyProduct}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <SampleModal
        product={selectedSampleProduct}
        isOpen={isSampleOpen}
        onClose={() => setIsSampleOpen(false)}
        onBuyNow={() => {
          setIsSampleOpen(false);
          setIsCheckoutOpen(true);
        }}
      />
    </div>
  );
}
