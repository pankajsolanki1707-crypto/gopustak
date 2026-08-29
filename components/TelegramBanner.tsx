'use client';

import React from 'react';
import { Send, Users, Bell, MessageSquare, ArrowRight } from 'lucide-react';

export default function TelegramBanner() {
  return (
    <section className="py-14 bg-gradient-to-r from-sky-950 via-slate-900 to-sky-950 text-white border-b border-sky-900/50 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-slate-900/80 rounded-3xl p-8 sm:p-10 border border-sky-500/30 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left Side: Telegram Icon & Description */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
            <div className="w-16 h-16 rounded-2xl bg-[#229ED9] text-white flex items-center justify-center shrink-0 shadow-lg shadow-sky-500/30 ring-4 ring-sky-500/20">
              <svg className="w-9 h-9 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-2.01 9.48c-.15.67-.55.83-1.11.52l-3.08-2.27-1.48 1.43c-.16.16-.3.3-.62.3l.22-3.13 5.7-5.15c.25-.22-.05-.34-.39-.12l-7.05 4.44-3.03-.95c-.66-.21-.67-.66.14-.98l11.85-4.57c.55-.2 1.03.13.86.99z" />
              </svg>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                Official Aspirant Community
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Connect With Us On Telegram
              </h3>
              <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
                Join our official channel <span className="text-sky-400 font-bold">@Gopustak_official</span> for EPFO/APFC study updates, error logs, exam notifications, and preparation strategy discussions.
              </p>

              {/* Feature Pills */}
              <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Bell className="w-3.5 h-3.5 text-sky-400" /> Exam Alerts
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-sky-400" /> Direct Support
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-sky-400" /> Serious Aspirants
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Join Button */}
          <div className="shrink-0 w-full sm:w-auto">
            <a
              href="https://t.me/Gopustak_official"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl text-base font-bold bg-[#229ED9] hover:bg-[#1A8CC6] text-white shadow-xl shadow-sky-500/25 transition-all transform hover:scale-105 active:scale-95"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-2.01 9.48c-.15.67-.55.83-1.11.52l-3.08-2.27-1.48 1.43c-.16.16-.3.3-.62.3l.22-3.13 5.7-5.15c.25-.22-.05-.34-.39-.12l-7.05 4.44-3.03-.95c-.66-.21-.67-.66.14-.98l11.85-4.57c.55-.2 1.03.13.86.99z" />
              </svg>
              <span>Join @Gopustak_official</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
