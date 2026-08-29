'use client';

import React from 'react';
import { Target, Layers, Award, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PlanToPractice() {
  const steps = [
    {
      step: '01',
      phase: 'PLAN',
      icon: Target,
      bookTitle: 'Crack UPSC EPFO/APFC 2026',
      sub: 'Preparation Strategy & Blueprint',
      desc: 'Understand exam expectations, choose verified resources, structure 12/9/6/4/3 month study plans, and establish daily error-log habits to prevent costly preparation missteps.',
      color: 'from-amber-500/20 to-amber-500/5',
      badgeColor: 'bg-amber-500 text-slate-950',
      slug: 'crack-upsc-epfo-apfc-2026-blueprint',
    },
    {
      step: '02',
      phase: 'MASTER',
      icon: Layers,
      bookTitle: 'Special Subjects + 10 Mock Tests',
      sub: 'Core Differentiators & Revision',
      desc: 'Master the high-scoring special subjects that create the merit list gap: GAAP accounting, Auditing, Insurance in India, Industrial Relations, Labour Laws, and Social Security.',
      color: 'from-blue-500/20 to-blue-500/5',
      badgeColor: 'bg-blue-600 text-white',
      slug: 'upsc-epfo-apfc-2026-special-subjects-mock-tests-hindi',
    },
    {
      step: '03',
      phase: 'PRACTICE',
      icon: Award,
      bookTitle: 'Special Subject Notes + 10 Mock Tests (English)',
      sub: 'Complete Study Guide & 10 Full Mocks',
      desc: 'Master the high-scoring special subjects with full syllabus notes and test your readiness under real exam conditions with 10 full-length mock tests and verified solutions.',
      color: 'from-emerald-500/20 to-emerald-500/5',
      badgeColor: 'bg-emerald-600 text-white',
      slug: 'upsc-epfo-apfc-practice-ebook-full-mock-tests',
    },
  ];

  return (
    <section id="plan-to-practice" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
            Intended 3-Step Framework
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            From Preparation Strategy to Exam Practice
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A cohesive three-part journey designed to systematically take you through planning, core subject mastery, and realistic exam simulation.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl border border-slate-200 p-8 flex flex-col justify-between bg-gradient-to-b hover:border-amber-400 hover:shadow-lg transition-all duration-300 group"
              >
                <div>
                  {/* Step Number & Phase Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black text-slate-300 font-mono group-hover:text-amber-500 transition-colors">
                      {item.step}
                    </span>
                    <span className={`text-xs font-extrabold tracking-wider uppercase px-3 py-1 rounded-full ${item.badgeColor}`}>
                      {item.phase}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center mb-5 shadow-sm group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title & Sub */}
                  <h3 className="text-xl font-bold text-slate-900 mb-1 leading-snug">
                    {item.bookTitle}
                  </h3>
                  <p className="text-xs font-semibold text-amber-700 mb-4">
                    {item.sub}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <Link
                    href={`/book/${item.slug}`}
                    className="inline-flex items-center text-xs font-bold text-slate-800 hover:text-amber-600 transition-colors gap-1.5"
                  >
                    View Ebook Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
