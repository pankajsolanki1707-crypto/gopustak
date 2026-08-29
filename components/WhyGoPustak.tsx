'use client';

import React from 'react';
import { Target, FileCheck2, Zap, ShieldCheck } from 'lucide-react';

export default function WhyGoPustak() {
  const features = [
    {
      icon: Target,
      title: 'Exam Focused',
      desc: 'No generic fluff or unrelated subjects. Every single page, note, and MCQ is dedicated exclusively to the UPSC EPFO & APFC syllabus requirements.',
    },
    {
      icon: FileCheck2,
      title: 'Structured & Grounded',
      desc: 'Built with practical study systems, authentic chapter notes, verified answer keys, and detailed step-by-step explanations for deep clarity.',
    },
    {
      icon: Zap,
      title: 'Instant Digital Access',
      desc: 'Download your high-resolution digital PDF ebooks immediately after successful payment on your mobile, tablet, laptop, or desktop.',
    },
    {
      icon: ShieldCheck,
      title: 'Secure Razorpay Payment',
      desc: 'All transactions are processed through Razorpay’s official 256-bit encrypted gateway with server-side signature verification.',
    },
  ];

  return (
    <section id="why-gopustak" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
            The GoPustak Standard
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose GoPustak Ebooks
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            A specialized digital publication platform committed to high-clarity, source-grounded preparation resources.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
