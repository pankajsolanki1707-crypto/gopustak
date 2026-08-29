'use client';

import React from 'react';
import { Compass, BookCheck, Clock } from 'lucide-react';

export default function WhyTheseBooks() {
  return (
    <section className="py-20 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
            Complementary Alignment
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why These 3 Books
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Rather than generic collections, each of these three ebooks is designed to fulfill a specific, non-negotiable preparation need for EPFO/APFC aspirants.
          </p>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Col 1: PLAN */}
          <div className="bg-slate-800/80 rounded-2xl p-8 border border-slate-700/80 hover:border-amber-500/50 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                <Compass className="w-6 h-6" />
              </div>
              <div className="inline-block text-xs font-extrabold tracking-wider uppercase px-2.5 py-1 rounded bg-amber-500/20 text-amber-300">
                PLAN
              </div>
              <h3 className="text-xl font-bold text-white">
                Understand the Exam & Build a System
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Understand the exam and create a practical preparation system. Learn where toppers actually spend their hours, which sources to pick, how to construct timed routines, and how to avoid the 20 most common preparation pitfalls.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700/60 text-xs text-amber-400 font-semibold">
              Focus: Strategy, Timetables & Error Logs
            </div>
          </div>

          {/* Col 2: MASTER */}
          <div className="bg-slate-800/80 rounded-2xl p-8 border border-slate-700/80 hover:border-amber-500/50 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <BookCheck className="w-6 h-6" />
              </div>
              <div className="inline-block text-xs font-extrabold tracking-wider uppercase px-2.5 py-1 rounded bg-blue-500/20 text-blue-300">
                MASTER
              </div>
              <h3 className="text-xl font-bold text-white">
                Strengthen High-Scoring Special Subjects
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Strengthen important special subjects such as Labour Laws, Social Security, Accounting, Auditing and Insurance. These unfamiliar non-general subjects decide the merit list rank for serious candidates.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700/60 text-xs text-blue-400 font-semibold">
              Focus: Special Subjects + 10 Full Mock Tests (Hindi)
            </div>
          </div>

          {/* Col 3: PRACTICE */}
          <div className="bg-slate-800/80 rounded-2xl p-8 border border-slate-700/80 hover:border-amber-500/50 transition-all flex flex-col justify-between">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Clock className="w-6 h-6" />
              </div>
              <div className="inline-block text-xs font-extrabold tracking-wider uppercase px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300">
                PRACTICE
              </div>
              <h3 className="text-xl font-bold text-white">
                Exam-Style Mocks & Detailed Analysis
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Test your preparation through mock-test practice and detailed explanations. Practice under a 120-minute timer across all syllabus sections to fine-tune elimination strategies and negative marking management.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-700/60 text-xs text-emerald-400 font-semibold">
              Focus: 120-Q Practice Tests with Verified Solutions
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
