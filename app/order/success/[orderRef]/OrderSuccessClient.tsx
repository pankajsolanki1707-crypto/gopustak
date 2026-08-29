'use client';

import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  Download,
  ShieldCheck,
  Mail,
  ArrowRight,
  Sparkles,
  BookOpen,
  HelpCircle,
  FileCheck,
} from 'lucide-react';

interface OrderSuccessClientProps {
  order: {
    id?: string;
    orderRef: string;
    productTitle: string;
    customerName: string;
    customerEmail: string;
    amountInPaise: number;
    status: string;
    createdAt: string;
    productCover: string;
    productEdition: string;
    productLanguage: string;
    productPageCount: string;
  };
  rawToken: string;
}

export default function OrderSuccessClient({ order, rawToken }: OrderSuccessClientProps) {
  const downloadUrl = `/api/download?token=${rawToken}`;
  const amountInRs = Math.round(order.amountInPaise / 100);

  return (
    <div className="min-h-screen bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto space-y-8 relative z-10">
        
        {/* Main Success Container */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl space-y-8 text-center sm:text-left">
          
          {/* Header & Celebration */}
          <div className="flex flex-col sm:flex-row items-center gap-5 border-b border-slate-800/80 pb-6">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wider mb-1.5">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                Payment Confirmed
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Payment Successful!
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Your payment of <strong className="text-amber-400">₹{amountInRs}</strong> was verified and your instant download access is ready.
              </p>
            </div>
          </div>

          {/* Ebook Product Card with Immediate Download Action */}
          <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800/80 space-y-6 shadow-inner">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <img
                src={order.productCover}
                alt={order.productTitle}
                className="w-20 h-28 object-cover rounded-lg border border-slate-700 shadow-md shrink-0"
              />
              <div className="space-y-1.5 flex-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  Purchased Digital Ebook (PDF)
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {order.productTitle}
                </h3>
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-400 font-medium">
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    ✓ {order.productEdition}
                  </span>
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    ✓ {order.productLanguage}
                  </span>
                  <span className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    ✓ {order.productPageCount}
                  </span>
                </div>
              </div>
            </div>

            {/* Primary Download Button */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <a
                href={downloadUrl}
                download
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-base font-extrabold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-xl shadow-amber-500/25 transition-all transform active:scale-95"
              >
                <Download className="w-5 h-5" />
                <span>DOWNLOAD EBOOK (PDF)</span>
              </a>

              <div className="text-xs text-slate-400 flex items-center gap-1.5 shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Authorized Secure Stream</span>
              </div>
            </div>
          </div>

          {/* Email Confirmation Notice */}
          <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-xs flex items-start gap-3.5 text-left">
            <Mail className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-blue-200">Email Access Link Dispatched</p>
              <p className="text-slate-300 leading-relaxed">
                We’ve sent your secure access link, order receipt, and transaction summary to <strong className="text-white">{order.customerEmail}</strong>.
              </p>
            </div>
          </div>

          {/* WhatsApp Instant Support & Telegram Connect */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* WhatsApp Support Card */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs flex flex-col justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-white">Need Help on WhatsApp?</p>
                  <p className="text-slate-400 text-[11px]">+91 99778 96709</p>
                </div>
              </div>
              <a
                href="https://wa.me/919977896709?text=Hi%20GoPustak,%20I%20need%20help%20with%20my%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-lg font-bold bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 text-xs text-center transition-colors shadow-sm"
              >
                Chat on WhatsApp
              </a>
            </div>

            {/* Telegram Community Card */}
            <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-xs flex flex-col justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-md">
                  <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-2.01 9.48c-.15.67-.55.83-1.11.52l-3.08-2.27-1.48 1.43c-.16.16-.3.3-.62.3l.22-3.13 5.7-5.15c.25-.22-.05-.34-.39-.12l-7.05 4.44-3.03-.95c-.66-.21-.67-.66.14-.98l11.85-4.57c.55-.2 1.03.13.86.99z" />
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-white">Telegram Community</p>
                  <p className="text-slate-400 text-[11px]">@Gopustak_official</p>
                </div>
              </div>
              <a
                href="https://t.me/Gopustak_official"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 rounded-lg font-bold bg-sky-600 hover:bg-sky-500 text-white text-xs text-center transition-colors shadow-sm"
              >
                Join Telegram
              </a>
            </div>
          </div>

          {/* Receipt Details Table */}
          <div className="pt-4 border-t border-slate-800/80 text-xs space-y-3">
            <h4 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
              Order Transaction Summary
            </h4>
            <div className="space-y-2 text-slate-400">
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span>Public Order Reference:</span>
                <span className="font-mono text-white font-bold">{order.orderRef}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span>Customer Name:</span>
                <span className="text-white font-medium">{order.customerName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span>Delivery Format:</span>
                <span className="text-white font-medium">Digital PDF (Immediate Download)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/50">
                <span>Payment Status:</span>
                <span className="text-emerald-400 font-bold">PAID & VERIFIED</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Total Amount Paid:</span>
                <span className="text-amber-400 font-extrabold text-sm">₹{amountInRs}</span>
              </div>
            </div>
          </div>

          {/* Navigation Home */}
          <div className="pt-2 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition-colors"
            >
              ← Return to GoPustak Storefront
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
