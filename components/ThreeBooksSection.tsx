'use client';

import React from 'react';
import Link from 'next/link';
import { Check, BookOpen, ShoppingBag, Eye, Sparkles } from 'lucide-react';
import BookMockup3D from './BookMockup3D';

export interface ProductItem {
  id: string;
  slug: string;
  title: string;
  subtitle?: string | null;
  shortDescription: string;
  shortDescriptionEn?: string | null;
  longDescription: string;
  coverImage: string;
  pdfFileName: string;
  language: string;
  format: string;
  pageCount?: string | null;
  edition: string;
  priceInPaise: number;
  mrpInPaise: number;
  category: string;
  displayOrder: number;
  published?: boolean;
  highlights: string[];
  samplePages: string[];
}

interface ThreeBooksSectionProps {
  products: ProductItem[];
  onBuyNow: (product: ProductItem) => void;
  onViewSample: (product: ProductItem) => void;
}

export default function ThreeBooksSection({
  products,
  onBuyNow,
  onViewSample,
}: ThreeBooksSectionProps) {
  return (
    <section id="three-books" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            Complete 3-Ebook Collection
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Three Books. One Focused EPFO/APFC Preparation.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Build your preparation strategy, strengthen special subjects and test your readiness with focused practice resources.
          </p>
        </div>

        {/* 3 EQUAL CARDS IN ONE ROW (Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {products.map((product) => {
            const priceInRs = Math.round(product.priceInPaise / 100);
            const mrpInRs = Math.round(product.mrpInPaise / 100);
            const discountPercent = mrpInRs > priceInRs ? Math.round(((mrpInRs - priceInRs) / mrpInRs) * 100) : 0;
            const topHighlights = (product.highlights || []).slice(0, 4);

            return (
              <div
                key={product.id || product.slug}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group hover:-translate-y-1"
              >
                {/* Real Book Cover Presentation Area */}
                <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 p-6 flex flex-col items-center justify-center relative min-h-[340px]">
                  
                  {/* Exam Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="inline-block text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded bg-amber-500 text-slate-950 shadow">
                      {product.category || 'UPSC EPFO / APFC'}
                    </span>
                  </div>

                  {/* Edition / Year Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    <span className="inline-block text-[11px] font-bold tracking-wide px-2 py-0.5 rounded bg-slate-800/90 text-slate-200 border border-slate-600">
                      {product.edition}
                    </span>
                  </div>

                  {/* 3D Realistic Cover */}
                  <div className="my-2 cursor-pointer" onClick={() => onViewSample(product)}>
                    <BookMockup3D
                      coverUrl={product.coverImage}
                      title={product.title}
                      size="sm"
                    />
                  </div>

                  {/* Quick Preview Hint */}
                  <button
                    onClick={() => onViewSample(product)}
                    className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    Click to preview sample pages
                  </button>
                </div>

                {/* Card Content Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    {/* Title */}
                    <Link href={`/book/${product.slug}`} className="block group-hover:text-amber-600 transition-colors">
                      <h3 className="text-lg font-bold text-slate-900 leading-snug">
                        {product.title}
                      </h3>
                    </Link>

                    {/* Subtitle if present */}
                    {product.subtitle && (
                      <p className="text-xs font-semibold text-amber-700">
                        {product.subtitle}
                      </p>
                    )}

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                      {product.shortDescription}
                    </p>

                    {/* Key Highlights */}
                    <div className="pt-2 border-t border-slate-100">
                      <p className="text-[11px] font-bold uppercase text-slate-500 mb-2 tracking-wider">
                        Key Highlights:
                      </p>
                      <ul className="space-y-1.5">
                        {topHighlights.map((hl, i) => (
                          <li key={i} className="flex items-start text-xs text-slate-700 gap-1.5">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-tight">{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Metadata Specs */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 text-[11px] text-slate-500 font-medium">
                      <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        ✓ {product.format}
                      </span>
                      <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                        ✓ {product.language}
                      </span>
                      {product.pageCount && (
                        <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          ✓ {product.pageCount}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing & CTA Module */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    {/* Price display */}
                    <div className="flex items-baseline justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-extrabold text-slate-900">
                          ₹{priceInRs}
                        </span>
                        {mrpInRs > priceInRs && (
                          <span className="text-sm font-medium text-slate-400 line-through">
                            ₹{mrpInRs}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-extrabold text-amber-900 bg-amber-200/80 px-2 py-0.5 rounded uppercase tracking-wider">
                          Welcome Offer
                        </span>
                        {discountPercent > 0 && (
                          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            {discountPercent}% OFF
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => onBuyNow(product)}
                        className="w-full inline-flex items-center justify-center py-2.5 px-3 rounded-lg text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm hover:shadow transition-all active:scale-95"
                      >
                        <ShoppingBag className="w-4 h-4 mr-1.5" />
                        BUY NOW
                      </button>

                      <button
                        onClick={() => onViewSample(product)}
                        className="w-full inline-flex items-center justify-center py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 transition-colors"
                      >
                        <Eye className="w-4 h-4 mr-1.5" />
                        VIEW SAMPLE
                      </button>
                    </div>

                    <Link
                      href={`/book/${product.slug}`}
                      className="block text-center text-xs font-medium text-slate-500 hover:text-slate-900 hover:underline pt-1"
                    >
                      View full book details & contents →
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
