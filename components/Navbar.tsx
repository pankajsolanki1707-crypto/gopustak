'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowRight, Lock } from 'lucide-react';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 text-white shadow-lg shadow-black/20 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[74px]">
          
          {/* Brand Logo & Editorial Typography */}
          <Link href="/" className="flex items-center space-x-3.5 group">
            <div className="h-11 w-11 rounded-xl overflow-hidden bg-white p-0.5 shadow-md shadow-amber-500/10 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center shrink-0 border border-slate-700">
              <img src="/images/logo.png" alt="GOPUSTAK.IN" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center leading-none">
                GOPUSTAK<span className="text-amber-400">.IN</span>
              </span>
              <span className="text-[9.5px] text-amber-200/80 font-medium tracking-[0.14em] uppercase mt-1">
                Premium Ebooks for Serious Aspirants
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-[13.5px] font-medium text-slate-300">
            <a href="/#three-books" className="hover:text-amber-400 transition-colors py-1">
              The 3 Ebooks
            </a>
            <a href="/#why-gopustak" className="hover:text-amber-400 transition-colors py-1">
              Why GoPustak
            </a>
            <a href="/#sample-pages" className="hover:text-amber-400 transition-colors py-1">
              Sample Pages
            </a>
            <a href="/#why-these-books" className="hover:text-amber-400 transition-colors py-1">
              Why These 3 Books
            </a>
            <a href="/#faq" className="hover:text-amber-400 transition-colors py-1">
              FAQ
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Link
              href="/admin"
              className="text-xs text-slate-400 hover:text-slate-200 hidden md:inline-block transition-colors px-2 py-1"
            >
              Admin
            </Link>

            <a
              href="/#three-books"
              className="inline-flex items-center justify-center px-4.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md shadow-amber-500/20 transition-all transform active:scale-95 whitespace-nowrap group"
            >
              <span>Explore Books</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-300 hover:text-white bg-slate-800/80 border border-slate-700 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Slide Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-4 animate-in slide-in-from-top duration-200 shadow-2xl">
          <div className="grid grid-cols-1 gap-1.5 text-sm font-medium">
            <a
              href="/#three-books"
              onClick={closeMenu}
              className="px-3.5 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-200 hover:text-amber-400 flex items-center justify-between transition-colors"
            >
              <span>The 3 Ebooks</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-2.5 py-0.5 rounded-full font-bold">3 TITLES</span>
            </a>

            <a
              href="/#why-gopustak"
              onClick={closeMenu}
              className="px-3.5 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-200 hover:text-amber-400 transition-colors"
            >
              Why GoPustak Guarantees
            </a>

            <a
              href="/#sample-pages"
              onClick={closeMenu}
              className="px-3.5 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-200 hover:text-amber-400 transition-colors"
            >
              Preview Sample Pages
            </a>

            <a
              href="/#why-these-books"
              onClick={closeMenu}
              className="px-3.5 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-200 hover:text-amber-400 transition-colors"
            >
              Why These 3 Books
            </a>

            <a
              href="/#faq"
              onClick={closeMenu}
              className="px-3.5 py-2.5 rounded-xl hover:bg-slate-800/80 text-slate-200 hover:text-amber-400 transition-colors"
            >
              Frequently Asked Questions
            </a>

            <Link
              href="/admin"
              onClick={closeMenu}
              className="px-3.5 py-2 rounded-xl text-xs text-slate-400 hover:text-white flex items-center gap-1.5 mt-1"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Login</span>
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-800">
            <a
              href="/#three-books"
              onClick={closeMenu}
              className="w-full py-3.5 rounded-xl text-center text-sm font-extrabold bg-amber-500 text-slate-950 shadow-lg block"
            >
              EXPLORE BOOKS
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
