'use client';

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-16 sm:py-20 bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Start Your EPFO/APFC Preparation Today
        </h2>
        
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto">
          Focused books. Smart preparation. Consistent practice.
        </p>

        <div className="pt-2">
          <a
            href="/#three-books"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm sm:text-base font-extrabold bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 shadow-xl shadow-amber-500/20 transition-all transform active:scale-95 whitespace-nowrap group"
          >
            <span>EXPLORE 3 EBOOKS</span>
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}
