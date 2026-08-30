'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, FileText, ArrowRight, Sparkles, Star, CheckCircle } from 'lucide-react';
import { ProductItem } from './ThreeBooksSection';

interface HeroProps {
  products?: ProductItem[];
}

export default function Hero({ products = [] }: HeroProps) {
  // Find each product dynamically from live database
  const prod1 =
    products.find((p) => p.slug === 'upsc-epfo-apfc-2026-special-subjects-mock-tests-hindi') ||
    products[0] ||
    null;
  const prod2 =
    products.find((p) => p.slug === 'crack-upsc-epfo-apfc-2026-blueprint') ||
    products[1] ||
    null;
  const prod3 =
    products.find((p) => p.slug === 'upsc-epfo-apfc-practice-ebook-full-mock-tests') ||
    products[2] ||
    null;

  const price1 = prod1 ? Math.round(prod1.priceInPaise / 100) : 99;
  const price2 = prod2 ? Math.round(prod2.priceInPaise / 100) : 149;
  const price3 = prod3 ? Math.round(prod3.priceInPaise / 100) : 99;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-[#0B1329] to-slate-950 text-white pt-10 pb-20 lg:pt-14 lg:pb-24 border-b border-slate-800/80">
      
      {/* Editorial Background Lighting & Mesh Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-10 w-[450px] h-[450px] bg-sky-600/15 rounded-full blur-[130px]" />
        <div className="absolute -bottom-20 right-1/3 w-[400px] h-[400px] bg-amber-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            
            {/* Top Pill: Niche & Welcome Offer */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-amber-500/20 via-amber-400/10 to-amber-500/20 text-amber-300 border border-amber-400/30 shadow-sm shadow-amber-500/10">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span>UPSC EPFO / APFC 2026</span>
              <span className="text-amber-500/60">•</span>
              <span className="text-emerald-400 font-extrabold">Special Offer Active</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-[46px] font-black tracking-tight text-white leading-[1.12]">
              Focused Ebooks for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                UPSC EPFO & APFC
              </span>{' '}
              Aspirants
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg font-semibold text-slate-200 leading-snug">
              Strategic Blueprint. High-Yield Special Subjects. 10 Full-Length Exam Mocks.
            </p>

            {/* Supporting Copy */}
            <p className="text-xs sm:text-sm text-slate-300/90 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Three grounded digital resources designed strictly from UPSC exam patterns. Plan your roadmap, master GAAP, Auditing, Labour Laws & Social Security, and build test stamina.
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <a
                href="#three-books"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-sm sm:text-base font-extrabold bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-xl shadow-amber-500/25 transition-all transform active:scale-95 whitespace-nowrap group"
              >
                <span>EXPLORE ALL EBOOKS</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#sample-pages"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-600 transition-all shadow-md whitespace-nowrap"
              >
                PREVIEW SAMPLE PAGES
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="font-medium">Instant PDF Download</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="font-medium">Verified Razorpay Gateway</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-sky-400" />
                <span className="font-medium">Direct Printable Ebooks</span>
              </div>
            </div>

          </div>

          {/* Right Column: DYNAMICALLY PRICED 3D EBOOK COVERS SHOWCASE */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center py-4 lg:py-6">
            
            {/* 3D Showcase Arena */}
            <div className="relative w-full max-w-[560px] mx-auto flex items-end justify-center pt-8 pb-4">
              
              {/* Circular Warm Glow Spotlight behind books */}
              <div className="absolute inset-0 bg-radial from-amber-500/20 via-sky-500/5 to-transparent blur-2xl pointer-events-none" />

              {/* BOOK 1 (Left): Special Subjects (Hindi) */}
              <div className="relative z-10 -mr-4 sm:-mr-6 transform -rotate-3 hover:rotate-0 hover:z-30 transition-all duration-300 group">
                <Link href={`/book/${prod1?.slug || 'upsc-epfo-apfc-2026-special-subjects-mock-tests-hindi'}`} className="block">
                  <div className="scale-[0.88] sm:scale-95 group-hover:scale-100 transition-transform">
                    <div className="relative shadow-2xl rounded-lg overflow-hidden border border-slate-700/80 ring-1 ring-white/10 group-hover:ring-amber-400/50 transition-all">
                      <img
                        src={prod1?.coverImage || '/covers/cover-product-1.png'}
                        alt={prod1?.title || 'Special Subjects'}
                        className="w-[145px] sm:w-[170px] h-[210px] sm:h-[245px] object-cover"
                      />
                      {/* Dynamic Price Tag */}
                      <div className="absolute top-2 left-2 bg-slate-950/90 text-amber-300 font-extrabold text-[10px] px-2 py-0.5 rounded shadow border border-amber-500/30">
                        ₹{price1}
                      </div>
                    </div>
                    {/* Bottom Label Badge */}
                    <div className="mt-2.5 text-center">
                      <span className="inline-block text-[9.5px] font-bold tracking-wider uppercase bg-slate-900/95 text-amber-300 border border-slate-700 px-2.5 py-1 rounded-md shadow-md">
                        {prod1?.edition || '02 • SPECIAL NOTES'}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* BOOK 2 (Center): Complete Preparation Blueprint (Prominent & Elevated) */}
              <div className="relative z-20 -translate-y-4 transform hover:scale-105 hover:z-30 transition-all duration-300 group">
                <Link href={`/book/${prod2?.slug || 'crack-upsc-epfo-apfc-2026-blueprint'}`} className="block">
                  <div className="scale-100 sm:scale-105 group-hover:scale-110 transition-transform">
                    {/* Featured Ribbon */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-[9.5px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-lg border border-amber-300">
                      ★ BESTSELLER
                    </div>

                    <div className="relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-lg overflow-hidden border-2 border-amber-400/60 ring-2 ring-amber-500/20 group-hover:border-amber-300 transition-all">
                      <img
                        src={prod2?.coverImage || '/covers/cover-product-2.png'}
                        alt={prod2?.title || 'Prep Blueprint'}
                        className="w-[165px] sm:w-[195px] h-[235px] sm:h-[280px] object-cover"
                      />
                      {/* Dynamic Price Tag */}
                      <div className="absolute top-2 left-2 bg-amber-500 text-slate-950 font-black text-[11px] px-2 py-0.5 rounded shadow-md">
                        ₹{price2}
                      </div>
                    </div>

                    {/* Bottom Label Badge */}
                    <div className="mt-3 text-center">
                      <span className="inline-block text-[10px] font-black tracking-wider uppercase bg-amber-500 text-slate-950 px-3 py-1 rounded-md shadow-lg">
                        01 • PREP BLUEPRINT
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* BOOK 3 (Right): Special Subject Notes + 10 Mock Tests */}
              <div className="relative z-10 -ml-4 sm:-ml-6 transform rotate-3 hover:rotate-0 hover:z-30 transition-all duration-300 group">
                <Link href={`/book/${prod3?.slug || 'upsc-epfo-apfc-practice-ebook-full-mock-tests'}`} className="block">
                  <div className="scale-[0.88] sm:scale-95 group-hover:scale-100 transition-transform">
                    <div className="relative shadow-2xl rounded-lg overflow-hidden border border-slate-700/80 ring-1 ring-white/10 group-hover:ring-amber-400/50 transition-all">
                      <img
                        src={prod3?.coverImage || '/covers/cover-product-3.png'}
                        alt={prod3?.title || '10 Mock Tests'}
                        className="w-[145px] sm:w-[170px] h-[210px] sm:h-[245px] object-cover"
                      />
                      {/* Dynamic Price Tag */}
                      <div className="absolute top-2 right-2 bg-slate-950/90 text-amber-300 font-extrabold text-[10px] px-2 py-0.5 rounded shadow border border-amber-500/30">
                        ₹{price3}
                      </div>
                    </div>
                    {/* Bottom Label Badge */}
                    <div className="mt-2.5 text-center">
                      <span className="inline-block text-[9.5px] font-bold tracking-wider uppercase bg-slate-900/95 text-amber-300 border border-slate-700 px-2.5 py-1 rounded-md shadow-md">
                        {prod3?.edition || '03 • 10 MOCK TESTS'}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

            </div>

            {/* Bottom Showcase Caption */}
            <div className="mt-2 text-center">
              <p className="text-[11px] text-slate-400 font-medium flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Hover or tap any ebook to view details & sample pages</span>
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
