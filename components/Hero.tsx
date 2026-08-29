'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Zap, FileText, ArrowRight } from 'lucide-react';
import BookMockup3D from './BookMockup3D';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-darkNavy via-brand-navy to-slate-900 text-white pt-12 pb-20 lg:pt-16 lg:pb-28 border-b border-slate-800">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute top-48 -right-32 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              UPSC EPFO / APFC
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Focused Ebooks for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
                UPSC EPFO & APFC
              </span>{' '}
              Preparation
            </h1>

            {/* Supporting Headline */}
            <p className="text-lg sm:text-xl font-medium text-amber-200/90">
              Plan your preparation. Master special subjects. Practice with confidence.
            </p>

            {/* Supporting Copy */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Three focused digital resources designed to support different stages of UPSC EPFO/APFC preparation — from strategy and planning to special-subject revision and mock-test practice.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#three-books"
                className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-xl text-base font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 transition-all transform active:scale-95 whitespace-nowrap group"
              >
                EXPLORE BOOKS
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#three-books"
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3.5 rounded-xl text-base font-semibold bg-slate-800/80 hover:bg-slate-800 text-white border border-slate-700 hover:border-slate-600 whitespace-nowrap transition-all"
              >
                VIEW ALL BOOKS
              </a>
            </div>

            {/* Trust Line */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span>Instant Digital Access</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Secure Razorpay Payment</span>
              </div>
              <span className="text-slate-600">•</span>
              <div className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-400" />
                <span>PDF Ebooks</span>
              </div>
            </div>
          </div>

          {/* Right Column: 3 REAL EBOOK COVERS MOCKUP */}
          <div className="lg:col-span-5 flex justify-center items-center py-4 sm:py-6 overflow-hidden w-full max-w-full">
            <div className="relative flex items-center justify-center scale-90 sm:scale-100 transition-transform">
              
              {/* Left Book: Special Subjects (Hindi) */}
              <div className="relative -mr-10 sm:-mr-16 transform -rotate-6 hover:rotate-0 hover:z-30 transition-all duration-300 z-10">
                <div className="scale-[0.82] sm:scale-95">
                  <BookMockup3D
                    coverUrl="/covers/cover-product-1.png"
                    title="UPSC EPFO/APFC 2026 Special Subjects (Hindi)"
                    size="md"
                    priority={true}
                  />
                  <div className="mt-2 text-center">
                    <span className="inline-block text-[9px] sm:text-[10px] font-semibold tracking-wide bg-slate-800/90 text-amber-300 border border-slate-700 px-2 py-0.5 rounded shadow">
                      02 • SPECIAL NOTES
                    </span>
                  </div>
                </div>
              </div>

              {/* Center Book: Complete Preparation Blueprint (Larger & Front) */}
              <div className="relative z-20 transform hover:scale-105 transition-all duration-300 shadow-2xl">
                <BookMockup3D
                  coverUrl="/covers/cover-product-2.png"
                  title="Crack UPSC EPFO/APFC 2026 Preparation Blueprint"
                  size="lg"
                  priority={true}
                />
                <div className="mt-2 text-center">
                  <span className="inline-block text-[9px] sm:text-[10px] font-semibold tracking-wide bg-amber-500 text-slate-950 font-bold px-2.5 py-0.5 rounded shadow">
                    01 • PREP BLUEPRINT
                  </span>
                </div>
              </div>

              {/* Right Book: Practice eBook Full Mock Tests */}
              <div className="relative -ml-10 sm:-ml-16 transform rotate-6 hover:rotate-0 hover:z-30 transition-all duration-300 z-10">
                <div className="scale-[0.82] sm:scale-95">
                  <BookMockup3D
                    coverUrl="/covers/cover-product-3.png"
                    title="UPSC EPFO/APFC 2026 Special Subject Notes + 10 Full-Length Mock Tests"
                    size="md"
                    priority={true}
                  />
                  <div className="mt-2 text-center">
                    <span className="inline-block text-[9px] sm:text-[10px] font-semibold tracking-wide bg-slate-800/90 text-amber-300 border border-slate-700 px-2 py-0.5 rounded shadow">
                      03 • 10 MOCK TESTS
                    </span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
