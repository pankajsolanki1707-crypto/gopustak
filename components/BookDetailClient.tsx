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
} from 'lucide-react';
import { ProductItem } from './ThreeBooksSection';
import BookMockup3D from './BookMockup3D';
import CheckoutModal from './CheckoutModal';
import SampleModal from './SampleModal';

interface BookDetailClientProps {
  product: ProductItem;
}

export default function BookDetailClient({ product }: BookDetailClientProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSampleOpen, setIsSampleOpen] = useState(false);

  const priceInRs = Math.round(product.priceInPaise / 100);
  const mrpInRs = Math.round(product.mrpInPaise / 100);
  const discount = mrpInRs > priceInRs ? mrpInRs - priceInRs : 0;
  const discountPercent = mrpInRs > priceInRs ? Math.round(((mrpInRs - priceInRs) / mrpInRs) * 100) : 0;

  const samplePages = product.samplePages || [];

  return (
    <div className="bg-slate-50 min-h-screen pb-24">
      {/* Breadcrumb & Navigation */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-400 py-3.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <Link href="/" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to All 3 Books
            </Link>
            <span>/</span>
            <span className="text-slate-200 line-clamp-1">{product.title}</span>
          </div>
          <span className="hidden sm:inline-block font-semibold text-amber-400">
            {product.category}
          </span>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: 3D Cover Display & Sample Trigger */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="sticky top-28 w-full max-w-sm bg-gradient-to-b from-slate-900 to-slate-800 rounded-2xl p-8 border border-slate-700 shadow-xl flex flex-col items-center">
              
              <div className="w-full flex justify-between items-center mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded shadow">
                  {product.category}
                </span>
                <span className="text-[11px] font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-600">
                  {product.edition}
                </span>
              </div>

              {/* 3D Realistic Cover */}
              <div className="my-4 cursor-pointer" onClick={() => setIsSampleOpen(true)}>
                <BookMockup3D
                  coverUrl={product.coverImage}
                  title={product.title}
                  size="md"
                  priority={true}
                />
              </div>

              {/* View Sample CTA */}
              <button
                onClick={() => setIsSampleOpen(true)}
                className="w-full mt-4 py-2.5 px-4 rounded-xl text-xs font-bold text-amber-400 hover:text-amber-300 bg-slate-800 hover:bg-slate-700 border border-slate-600 flex items-center justify-center gap-2 transition-all shadow"
              >
                <Eye className="w-4 h-4" />
                PREVIEW SAMPLE PAGES ({samplePages.length} PAGES)
              </button>

              <div className="w-full mt-6 pt-4 border-t border-slate-700/80 flex items-center justify-around text-[11px] text-slate-400">
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

          {/* Right Column: Title, Pricing, Highlights, TOC, Description */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Header Box */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <div className="space-y-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                  {product.title}
                </h1>
                {product.subtitle && (
                  <p className="text-sm font-semibold text-amber-700">
                    {product.subtitle}
                  </p>
                )}
              </div>

              {/* Price & Purchase Bar */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-slate-900">
                      ₹{priceInRs}
                    </span>
                    {mrpInRs > priceInRs && (
                      <span className="text-base font-semibold text-slate-400 line-through">
                        ₹{mrpInRs}
                      </span>
                    )}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-extrabold text-amber-900 bg-amber-200/90 px-2.5 py-0.5 rounded uppercase tracking-wider">
                        Welcome Offer
                      </span>
                      {discountPercent > 0 && (
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                          {discountPercent}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    One-time payment • Lifetime personal digital access
                  </p>
                </div>

                <button
                  onClick={() => setIsCheckoutOpen(true)}
                  className="px-8 py-3.5 rounded-xl font-bold text-sm bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 transform active:scale-95 shrink-0"
                >
                  <ShoppingBag className="w-4 h-4" />
                  BUY NOW & DOWNLOAD
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Secure payment via Razorpay. PDF download enabled immediately on Thank You screen.</span>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                <FileText className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <span className="block text-[11px] text-slate-500 font-medium">Format</span>
                <span className="text-xs font-bold text-slate-900">{product.format}</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                <Globe className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <span className="block text-[11px] text-slate-500 font-medium">Language</span>
                <span className="text-xs font-bold text-slate-900">{product.language}</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                <Layers className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <span className="block text-[11px] text-slate-500 font-medium">Pages</span>
                <span className="text-xs font-bold text-slate-900">{product.pageCount || 'Full Ebook'}</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-slate-200 text-center">
                <Calendar className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                <span className="block text-[11px] text-slate-500 font-medium">Edition</span>
                <span className="text-xs font-bold text-slate-900">{product.edition}</span>
              </div>
            </div>

            {/* Key Highlights */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900">
                Key Features & Coverage
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.highlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Description */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h2 className="text-lg font-bold text-slate-900">
                About this Ebook
              </h2>
              <div className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                {product.longDescription}
              </div>
            </div>

            {/* Sample Pages Thumbnails */}
            {samplePages.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">
                    Sample Excerpts ({samplePages.length} Pages)
                  </h2>
                  <button
                    onClick={() => setIsSampleOpen(true)}
                    className="text-xs font-bold text-amber-600 hover:text-amber-700"
                  >
                    Open fullscreen preview →
                  </button>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {samplePages.map((url, i) => (
                    <div
                      key={i}
                      onClick={() => setIsSampleOpen(true)}
                      className="cursor-pointer border border-slate-200 rounded-lg overflow-hidden hover:border-amber-500 hover:shadow transition-all aspect-[1/1.4]"
                    >
                      <img src={url} alt={`Sample ${i + 1}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Sticky Mobile Buy Button */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur border-t border-slate-200 p-3 px-4 shadow-lg flex items-center justify-between gap-4">
        <div>
          <span className="text-xs text-slate-500">Total Price</span>
          <div className="text-lg font-extrabold text-slate-900">₹{priceInRs}</div>
        </div>
        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="flex-1 py-3 px-4 rounded-xl text-sm font-bold bg-amber-500 text-slate-950 shadow flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-4 h-4" />
          BUY NOW
        </button>
      </div>

      {/* Modals */}
      <CheckoutModal
        product={product}
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />

      <SampleModal
        product={product}
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
