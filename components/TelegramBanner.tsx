'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function TelegramBanner() {
  return (
    <section className="py-12 bg-slate-950 text-white border-b border-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/80 rounded-2xl p-6 sm:p-8 border border-sky-500/25 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          
          {/* Left: Icon & Copy */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#229ED9] text-white flex items-center justify-center shrink-0 shadow-md ring-4 ring-sky-500/20">
              <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-2.01 9.48c-.15.67-.55.83-1.11.52l-3.08-2.27-1.48 1.43c-.16.16-.3.3-.62.3l.22-3.13 5.7-5.15c.25-.22-.05-.34-.39-.12l-7.05 4.44-3.03-.95c-.66-.21-.67-.66.14-.98l11.85-4.57c.55-.2 1.03.13.86.99z" />
              </svg>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Connect With Us on Telegram
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
                Join the GoPustak community for UPSC EPFO/APFC updates, preparation discussions, new resources and important announcements.
              </p>
            </div>
          </div>

          {/* Right: Join Button */}
          <div className="shrink-0 w-full sm:w-auto">
            <a
              href="https://t.me/Gopustak_official"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs sm:text-sm font-extrabold bg-[#229ED9] hover:bg-[#1b8ec5] text-white shadow-lg shadow-sky-500/20 transition-all transform active:scale-95 whitespace-nowrap"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-2.01 9.48c-.15.67-.55.83-1.11.52l-3.08-2.27-1.48 1.43c-.16.16-.3.3-.62.3l.22-3.13 5.7-5.15c.25-.22-.05-.34-.39-.12l-7.05 4.44-3.03-.95c-.66-.21-.67-.66.14-.98l11.85-4.57c.55-.2 1.03.13.86.99z" />
              </svg>
              <span>JOIN GOPUSTAK ON TELEGRAM</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
