'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="h-11 w-11 rounded-xl overflow-hidden bg-white p-0.5 shadow flex items-center justify-center border border-slate-700">
                <img src="/images/logo.png" alt="GOPUSTAK.IN" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white tracking-tight leading-none">
                  GOPUSTAK<span className="text-amber-400">.IN</span>
                </span>
                <span className="text-[9px] text-amber-200/80 font-medium tracking-wider uppercase mt-1">
                  Premium Ebooks for Serious Aspirants
                </span>
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Focused digital study resources for UPSC EPFO & APFC aspirants. Grounded in actual syllabus patterns, special-subject mastery, and timed exam practice.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Secure Razorpay Gateway & Instant Download</span>
            </div>
          </div>

          {/* Ebooks Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
              The 3 Ebooks
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/book/crack-upsc-epfo-apfc-2026-blueprint"
                  className="hover:text-amber-400 transition-colors"
                >
                  01 • Crack UPSC EPFO/APFC 2026
                </Link>
              </li>
              <li>
                <Link
                  href="/book/upsc-epfo-apfc-2026-special-subjects-mock-tests-hindi"
                  className="hover:text-amber-400 transition-colors"
                >
                  02 • Special Subjects & 10 Mocks (Hindi)
                </Link>
              </li>
              <li>
                <Link
                  href="/book/upsc-epfo-apfc-practice-ebook-full-mock-tests"
                  className="hover:text-amber-400 transition-colors"
                >
                  03 • Special Subject eBook + 10 Mocks (2026 Edition)
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3.5">
              Official Support
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#faq" className="hover:text-amber-400 transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
              <li className="pt-1 flex items-center gap-1.5 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <a href="mailto:gopustak@outlook.com" className="hover:text-amber-400 transition-colors">
                  gopustak@outlook.com
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <a
                  href="https://wa.me/919977896709?text=Hi%20GoPustak,%20I%20have%20a%20query%20about%20the%20UPSC%20EPFO/APFC%20ebooks."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
                >
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>WhatsApp: +91 99778 96709</span>
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <a
                  href="https://t.me/Gopustak_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sky-400 hover:text-sky-300 transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-2.01 9.48c-.15.67-.55.83-1.11.52l-3.08-2.27-1.48 1.43c-.16.16-.3.3-.62.3l.22-3.13 5.7-5.15c.25-.22-.05-.34-.39-.12l-7.05 4.44-3.03-.95c-.66-.21-.67-.66.14-.98l11.85-4.57c.55-.2 1.03.13.86.99z" />
                  </svg>
                  <span>Telegram: @Gopustak_official</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} GOPUSTAK.IN. All rights reserved.</p>
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
