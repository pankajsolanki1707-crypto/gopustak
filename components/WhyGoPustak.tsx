'use client';

import React from 'react';
import { Target, Layers, Zap, ShieldCheck } from 'lucide-react';

export default function WhyGoPustak() {
  const features = [
    {
      icon: Target,
      title: 'EXAM FOCUSED',
      desc: 'Resources designed specifically for UPSC EPFO/APFC preparation.',
    },
    {
      icon: Layers,
      title: 'STRUCTURED LEARNING',
      desc: 'Study plans, special-subject coverage and practice material organized for focused preparation.',
    },
    {
      icon: Zap,
      title: 'INSTANT DIGITAL ACCESS',
      desc: 'Access your purchased ebook immediately after successful payment.',
    },
    {
      icon: ShieldCheck,
      title: 'SECURE CHECKOUT',
      desc: 'Payments processed securely through Razorpay official gateway.',
    },
  ];

  return (
    <section id="why-gopustak" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-3">
          <h2 className="text-2xl sm:text-3.5xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Why Choose GoPustak?
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Focused digital study resources for serious UPSC EPFO/APFC preparation.
          </p>
        </div>

        {/* 4 Compact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400/80 hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="w-11 h-11 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center group-hover:scale-105 transition-transform shadow-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 tracking-wide uppercase">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
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
