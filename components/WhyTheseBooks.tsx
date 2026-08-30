'use client';

import React from 'react';
import { Compass, BookCheck, Clock } from 'lucide-react';

export default function WhyTheseBooks() {
  return (
    <section id="why-these-books" className="py-16 sm:py-20 bg-slate-950 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
          <h2 className="text-2xl sm:text-3.5xl lg:text-4xl font-extrabold text-white tracking-tight">
            Why These 3 Books?
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Each book serves a different stage of EPFO/APFC preparation.
          </p>
        </div>

        {/* 3 Compact Cards (PLAN -> MASTER -> PRACTICE) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: 01 PLAN */}
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-xs font-black tracking-wider uppercase px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  01 • PLAN
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                Crack UPSC EPFO/APFC 2026
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                Understand the exam and build your preparation system.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] text-amber-400 font-semibold">
              Strategy, Timetables & Error Logs
            </div>
          </div>

          {/* Card 2: 02 MASTER */}
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-800 hover:border-sky-500/50 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400">
                  <BookCheck className="w-5 h-5" />
                </div>
                <span className="text-xs font-black tracking-wider uppercase px-2.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                  02 • MASTER
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                UPSC EPFO/APFC 2026 – विशेष विषय एवं 10 मॉक टेस्ट
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                Strengthen special subjects such as Labour Laws, Social Security, Accounting, Auditing and Insurance.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] text-sky-400 font-semibold">
              Special Subject Notes + 10 Full Mock Tests (Hindi)
            </div>
          </div>

          {/* Card 3: 03 PRACTICE */}
          <div className="bg-slate-900 rounded-2xl p-6 sm:p-7 border border-slate-800 hover:border-emerald-500/50 transition-all flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs font-black tracking-wider uppercase px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  03 • PRACTICE
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                UPSC EPFO/APFC Special Subject eBook + 10 Full Mock Tests
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
                Practice-focused UPSC EPFO/APFC material with full mock tests, exam-style MCQs, detailed explanations and section-wise practice.
              </p>
            </div>
            <div className="pt-3 border-t border-slate-800 text-[11px] text-emerald-400 font-semibold">
              120-Q Practice Tests with Verified Solutions (2026 Edition)
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
