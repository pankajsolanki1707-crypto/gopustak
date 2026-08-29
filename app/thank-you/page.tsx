import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { CheckCircle, Download, FileText, ArrowRight, ShieldCheck, Mail, AlertCircle } from 'lucide-react';
import BookMockup3D from '@/components/BookMockup3D';

interface Props {
  searchParams: {
    orderId?: string;
    token?: string;
  };
}

export default async function ThankYouPage({ searchParams }: Props) {
  const { orderId, token } = searchParams;

  if (!orderId || !token) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md max-w-md text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto" />
          <h1 className="text-xl font-bold text-slate-900">Missing Order Verification</h1>
          <p className="text-sm text-slate-600">
            Could not locate your order reference. If you recently made a payment, please check your email or contact support.
          </p>
          <Link
            href="/"
            className="inline-block px-5 py-2.5 rounded-lg text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4 bg-slate-50">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-md max-w-md text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h1 className="text-xl font-bold text-slate-900">Order Not Found</h1>
          <p className="text-sm text-slate-600">We could not find the specified order record.</p>
          <Link href="/" className="inline-block px-5 py-2.5 rounded-lg text-xs font-bold bg-slate-900 text-white">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const product = await prisma.product.findUnique({
    where: { id: order.productId },
  });

  const amountInRs = Math.round(order.amountInPaise / 100);
  const downloadUrl = `/api/download?token=${encodeURIComponent(token)}`;

  return (
    <div className="bg-slate-50 min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        
        {/* Success Banner */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
            <CheckCircle className="w-9 h-9" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold tracking-widest uppercase text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full">
              Payment Successful
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Your Ebook is Ready!
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto">
              Thank you for your order. Your transaction has been verified and your secure digital PDF is ready for immediate download.
            </p>
          </div>

          {/* Download Action Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-700 shadow-lg space-y-5">
            <div className="flex flex-col sm:flex-row items-center gap-6 text-left">
              {product && (
                <div className="shrink-0">
                  <img
                    src={product.coverImage}
                    alt={product.title}
                    className="w-20 h-28 object-cover rounded shadow-md border border-slate-600"
                  />
                </div>
              )}
              <div className="space-y-1.5 flex-1 text-center sm:text-left">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Purchased Digital Ebook (PDF)
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                  {order.productTitle}
                </h3>
                <p className="text-xs text-slate-400">
                  Order Ref: <span className="font-mono text-slate-200">{order.orderRef}</span> • Amount Paid: <span className="font-bold text-amber-400">₹{amountInRs}</span>
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-700/80 flex flex-col sm:flex-row gap-3 items-center justify-between">
              <a
                href={downloadUrl}
                download
                className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-base font-extrabold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25 transition-all transform active:scale-95"
              >
                <Download className="w-5 h-5" />
                DOWNLOAD EBOOK (PDF)
              </a>

              <div className="text-xs text-slate-400 flex items-center gap-1.5 shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Authorized Secure Link</span>
              </div>
            </div>
          </div>

          {/* Email Confirmation Notice */}
          <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900 text-xs flex items-start gap-3 text-left">
            <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold mb-0.5">Access Confirmation Dispatched</p>
              <p className="text-blue-800 leading-relaxed">
                We’ve also sent your secure access link, order receipt, and transaction summary to <span className="font-semibold">{order.customerEmail}</span>.
              </p>
            </div>
          </div>

          {/* Telegram Connect Card */}
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-sky-950 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-2.01 9.48c-.15.67-.55.83-1.11.52l-3.08-2.27-1.48 1.43c-.16.16-.3.3-.62.3l.22-3.13 5.7-5.15c.25-.22-.05-.34-.39-.12l-7.05 4.44-3.03-.95c-.66-.21-.67-.66.14-.98l11.85-4.57c.55-.2 1.03.13.86.99z" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-slate-900">Join UPSC EPFO Aspirants on Telegram</p>
                <p className="text-slate-600 text-[11px]">Get daily exam updates, strategy discussions and notices.</p>
              </div>
            </div>
            <a
              href="https://t.me/Gopustak_official"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 rounded-lg font-bold bg-sky-600 hover:bg-sky-500 text-white text-xs text-center shrink-0 transition-colors"
            >
              Connect @Gopustak_official
            </a>
          </div>

          {/* Receipt Table */}
          <div className="pt-4 border-t border-slate-100 text-left text-xs text-slate-600 space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Order Summary
            </h4>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Customer Name:</span>
              <span className="font-semibold text-slate-800">{order.customerName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Customer Email:</span>
              <span className="font-semibold text-slate-800">{order.customerEmail}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Order Reference:</span>
              <span className="font-mono font-semibold text-slate-800">{order.orderRef}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span>Payment Gateway:</span>
              <span className="font-semibold text-slate-800">Razorpay Verified</span>
            </div>
            <div className="flex justify-between py-1 font-bold text-slate-900">
              <span>Total Paid:</span>
              <span className="text-sm text-emerald-700">₹{amountInRs}</span>
            </div>
          </div>

          <div className="pt-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-amber-700 hover:text-amber-800 hover:underline"
            >
              ← Return to GoPustak Home
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
