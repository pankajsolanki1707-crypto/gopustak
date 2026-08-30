'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, FileText, ArrowRight, Sparkles } from 'lucide-react';
import { ProductItem } from './ThreeBooksSection';

interface HeroProps {
  products?: ProductItem[];
}

export default function Hero({ products = [] }: HeroProps) {
  // Map authoritative 3 ebooks dynamically from database
  const prodHindi =
    products.find((p) => p.slug === 'upsc-epfo-apfc-2026-special-subjects-mock-tests-hindi') ||
    products[0] ||
    null;
  const prodBlueprint =
    products.find((p) => p.slug === 'crack-upsc-epfo-apfc-2026-blueprint') ||
    products[1] ||
    null;
  const prodMock =
    products.find((p) => p.slug === 'upsc-epfo-apfc-practice-ebook-full-mock-tests') ||
    products[2] ||
    null;

  const priceHindi = prodHindi ? Math.round(prodHindi.priceInPaise / 100) : 99;
  const priceBlueprint = prodBlueprint ? Math.round(prodBlueprint.priceInPaise / 100) : 149;
  const priceMock = prodMock ? Math.round(prodMock.priceInPaise / 100) : 99;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-[#0a1128] to-slate-950 text-white pt-10 pb-16 lg:pt-14 lg:pb-20 border-b border-slate-800/80">
      
      {/* Background Lighting Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-1/4 w-[450px] h-[450px] bg-amber-500/12 rounded-full blur-[110px]" />
        <div className="absolute top-20 right-10 w-[400px] h-[400px] bg-sky-600/12 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-5 text-center lg:text-left">
            
            {/* Small Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-300 border border-amber-500/30">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>UPSC EPFO / APFC</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4.5xl lg:text-[44px] font-black tracking-tight text-white leading-[1.14]">
              Focused Ebooks for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                UPSC EPFO & APFC
              </span>{' '}
              Aspirants
            </h1>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Three focused digital resources designed to support preparation strategy, special-subject mastery and exam practice.
            </p>

            {/* Three Concise Benefits */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-300 pt-1">
              <div className="flex items-center gap-1.5 font-medium">
                <Zap className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Instant Digital Access</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Secure Razorpay Payment</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 font-medium">
                <FileText className="w-4 h-4 text-sky-400 shrink-0" />
                <span>PDF Ebooks</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <a
                href="#three-books"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm sm:text-base font-extrabold bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-xl shadow-amber-500/20 transition-all transform active:scale-95 whitespace-nowrap group"
              >
                <span>EXPLORE 3 EBOOKS</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#sample-pages"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-600 transition-all shadow-md whitespace-nowrap"
              >
                VIEW SAMPLE PAGES
              </a>
            </div>

            {/* Quiet Trust Line */}
            <p className="text-[11.5px] text-slate-400 font-medium pt-1">
              3 Focused Ebooks • Instant Access • Secure Payment
            </p>

          </div>

          {/* Right Column: THREE REAL EBOOK COVERS IN EDITORIAL COMPOSITION */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center py-2 lg:py-4">
            
            {/* 3D Showcase Arena */}
            <div className="relative w-full max-w-[540px] mx-auto flex items-end justify-center pt-6 pb-2">
              
              {/* Warm Glow Spotlight */}
              <div className="absolute inset-0 bg-radial from-amber-500/15 via-sky-500/5 to-transparent blur-2xl pointer-events-none" />

              {/* BOOK 02 (Left): Special Subjects (Hindi) */}
              <div className="relative z-10 -mr-4 sm:-mr-6 transform -rotate-3 hover:rotate-0 hover:z-30 transition-all duration-300 group">
                <Link href={`/book/${prodHindi?.slug || 'upsc-epfo-apfc-2026-special-subjects-mock-tests-hindi'}`} className="block">
                  <div className="scale-[0.88] sm:scale-95 group-hover:scale-100 transition-transform">
                    <div className="relative shadow-2xl rounded-lg overflow-hidden border border-slate-700/80 ring-1 ring-white/10 group-hover:ring-amber-400/50 transition-all">
                      <img
                        src="/covers/cover-product-1.png"
                        alt="UPSC EPFO/APFC 2026 Special Subjects (Hindi)"
                        className="w-[145px] sm:w-[165px] h-[210px] sm:h-[240px] object-cover"
                      />
                      {/* Price Badge */}
                      <div className="absolute top-2 left-2 bg-slate-950/90 text-amber-300 font-extrabold text-[10px] px-2 py-0.5 rounded shadow border border-amber-500/30">
                        {priceHindi === 0 ? 'FREE' : `₹${priceHindi}`}
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <span className="inline-block text-[9.5px] font-bold tracking-wider uppercase bg-slate-900/95 text-amber-300 border border-slate-700 px-2.5 py-0.5 rounded shadow-sm">
                        02 • SPECIAL NOTES
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* BOOK 01 (Center): Complete Preparation Blueprint (Flagship - Elevated) */}
              <div className="relative z-20 -translate-y-4 transform hover:scale-105 hover:z-30 transition-all duration-300 group">
                <Link href={`/book/${prodBlueprint?.slug || 'crack-upsc-epfo-apfc-2026-blueprint'}`} className="block">
                  <div className="scale-100 sm:scale-105 group-hover:scale-110 transition-transform">
                    <div className="relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-lg overflow-hidden border-2 border-amber-400/70 ring-2 ring-amber-500/20 group-hover:border-amber-300 transition-all">
                      <img
                        src={prodBlueprint?.coverImage || '/covers/cover-product-2.png'}
                        alt={prodBlueprint?.title || 'Crack UPSC EPFO/APFC 2026 Blueprint'}
                        className="w-[165px] sm:w-[190px] h-[235px] sm:h-[275px] object-cover"
                      />
                      {/* Price Badge */}
                      <div className="absolute top-2 left-2 bg-amber-500 text-slate-950 font-black text-[11px] px-2 py-0.5 rounded shadow-md">
                        {priceBlueprint === 0 ? 'FREE' : `₹${priceBlueprint}`}
                      </div>
                    </div>

                    <div className="mt-2.5 text-center">
                      <span className="inline-block text-[10px] font-black tracking-wider uppercase bg-amber-500 text-slate-950 px-3 py-0.5 rounded shadow-md">
                        01 • PREP BLUEPRINT
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* BOOK 03 (Right): Special Subject Notes + 10 Mock Tests */}
              <div className="relative z-10 -ml-4 sm:-ml-6 transform rotate-3 hover:rotate-0 hover:z-30 transition-all duration-300 group">
                <Link href={`/book/${prodMock?.slug || 'upsc-epfo-apfc-practice-ebook-full-mock-tests'}`} className="block">
                  <div className="scale-[0.88] sm:scale-95 group-hover:scale-100 transition-transform">
                    <div className="relative shadow-2xl rounded-lg overflow-hidden border border-slate-700/80 ring-1 ring-white/10 group-hover:ring-amber-400/50 transition-all">
                      <img
                        src={prodMock?.coverImage || '/covers/cover-product-3.png'}
                        alt={prodMock?.title || 'Special Subject eBook + 10 Full Mock Tests'}
                        className="w-[145px] sm:w-[165px] h-[210px] sm:h-[240px] object-cover"
                      />
                      {/* Price Badge */}
                      <div className="absolute top-2 right-2 bg-slate-950/90 text-amber-300 font-extrabold text-[10px] px-2 py-0.5 rounded shadow border border-amber-500/30">
                        {priceMock === 0 ? 'FREE' : `₹${priceMock}`}
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <span className="inline-block text-[9.5px] font-bold tracking-wider uppercase bg-slate-900/95 text-amber-300 border border-slate-700 px-2.5 py-0.5 rounded shadow-sm">
                        03 • 10 MOCK TESTS
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

            </div>

            {/* Tap Hint */}
            <div className="mt-1 text-center">
              <p className="text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Tap any ebook cover to view full details</span>
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
