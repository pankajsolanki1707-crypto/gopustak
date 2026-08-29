'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ShieldCheck, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-darkNavy text-slate-400 border-t border-slate-800">
      {/* Final Pre-Footer CTA */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Start Your EPFO/APFC Preparation Today
            </h3>
            <p className="text-sm font-medium text-slate-900">
              Get instant digital access to the 3 focused preparation ebooks.
            </p>
          </div>

          <a
            href="#three-books"
            className="shrink-0 px-8 py-3.5 rounded-xl font-bold bg-slate-950 hover:bg-slate-900 text-white shadow-xl transition-all transform active:scale-95 whitespace-nowrap"
          >
            EXPLORE BOOKS
          </a>
        </div>
      </div>

      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-12 w-12 rounded-xl overflow-hidden bg-white p-1 shadow flex items-center justify-center">
                <img src="/images/logo.png" alt="GOPUSTAK.IN" className="w-full h-full object-contain" />
              </div>
              <span className="text-xl font-black text-white tracking-tight">
                GOPUSTAK<span className="text-amber-400">.IN</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Premium focused digital ebooks designed specifically for serious UPSC EPFO & APFC aspirants. Grounded in actual exam patterns, verified answer keys, and strategic frameworks.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Secure Checkout via Razorpay</span>
            </div>
          </div>

          {/* Ebooks Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              UPSC EPFO Ebooks
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/book/upsc-epfo-apfc-2026-special-subjects-mock-tests-hindi"
                  className="hover:text-amber-400 transition-colors"
                >
                  Special Subjects + 10 Mocks (Hindi)
                </Link>
              </li>
              <li>
                <Link
                  href="/book/crack-upsc-epfo-apfc-2026-blueprint"
                  className="hover:text-amber-400 transition-colors"
                >
                  Crack UPSC EPFO/APFC 2026 Blueprint
                </Link>
              </li>
              <li>
                <Link
                  href="/book/upsc-epfo-apfc-practice-ebook-full-mock-tests"
                  className="hover:text-amber-400 transition-colors"
                >
                  Special Subject Notes + 10 Mock Tests (Eng)
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Policies */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Support & Policies
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li>
                <span className="text-slate-500 cursor-default">Privacy Policy</span>
              </li>
              <li>
                <span className="text-slate-500 cursor-default">Terms & Conditions</span>
              </li>
              <li>
                <span className="text-slate-500 cursor-default">Refund Policy</span>
              </li>
              <li className="pt-2 flex items-center gap-1.5 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <a href="mailto:gopustak@outlook.com" className="hover:text-amber-400 transition-colors">
                  gopustak@outlook.com
                </a>
              </li>
              <li className="pt-1 flex items-center gap-1.5">
                <a
                  href="https://t.me/Gopustak_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-2.01 9.48c-.15.67-.55.83-1.11.52l-3.08-2.27-1.48 1.43c-.16.16-.3.3-.62.3l.22-3.13 5.7-5.15c.25-.22-.05-.34-.39-.12l-7.05 4.44-3.03-.95c-.66-.21-.67-.66.14-.98l11.85-4.57c.55-.2 1.03.13.86.99z" />
                  </svg>
                  <span>Telegram: @Gopustak_official</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} GOPUSTAK.IN. All rights reserved. Original book publications by ExamWave.</p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-slate-400 hover:text-amber-400 transition-colors"
          >
            Back to top <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
