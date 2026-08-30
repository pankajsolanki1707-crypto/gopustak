'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, ShoppingBag, Loader2, Lock, CheckCircle2, Gift } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ProductItem } from './ThreeBooksSection';

interface CheckoutModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Dynamically load Razorpay standard checkout script if not already present
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && window.Razorpay) {
      resolve(true);
      return;
    }
    const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => resolve(false));
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function CheckoutModal({ product, isOpen, onClose }: CheckoutModalProps) {
  const router = useRouter();
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen || !product) return null;

  const priceInRs = Math.round(product.priceInPaise / 100);
  const mrpInRs = Math.round(product.mrpInPaise / 100);
  const isFree = priceInRs === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      // 1. Create authenticated order on backend
      const res = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          customerName,
          customerEmail,
          customerPhone,
        }),
      });

      const data = await res.json();
      if (!data.success || !data.order) {
        throw new Error(data.error || 'Failed to initialize order');
      }

      // Handle Free Ebook (₹0) instant fulfillment without Razorpay
      if (data.isFree) {
        onClose();
        router.push(`/order/success/${data.order.orderRef}?token=${data.order.token}`);
        return;
      }

      const { order } = data;

      // 2. Ensure Razorpay client script is loaded for paid orders
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded || typeof window.Razorpay === 'undefined') {
        throw new Error('Unable to connect to Razorpay payment gateway. Please check your network connection.');
      }

      // 3. Open Official Live Razorpay Checkout Screen
      const options = {
        key: order.keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_live_SE3ZS0Lx0QfzHY',
        amount: order.amountInPaise,
        currency: order.currency || 'INR',
        name: 'GOPUSTAK.IN',
        description: product.title,
        image: '/images/logo.png',
        order_id: order.razorpayOrderId,
        prefill: {
          name: customerName,
          email: customerEmail,
          contact: customerPhone || '',
        },
        theme: {
          color: '#0F172A',
        },
        handler: async function (response: any) {
          try {
            setIsLoading(true);
            const verifyRes = await fetch('/api/razorpay/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: order.id,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            if (verifyData.success) {
              onClose();
              const targetRef = verifyData.orderRef || order.orderRef;
              router.push(`/order/success/${targetRef}?token=${verifyData.token}`);
            } else {
              setErrorMsg(verifyData.error || 'Payment signature verification failed.');
              setIsLoading(false);
            }
          } catch (err: any) {
            setErrorMsg(err.message || 'Network error during payment verification.');
            setIsLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setIsLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        setIsLoading(false);
        setErrorMsg(`Payment failed: ${response.error?.description || 'Transaction cancelled'}`);
      });
      rzp.open();
    } catch (err: any) {
      console.error('Checkout error:', err);
      setErrorMsg(err.message || 'An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto preview-modal-bg flex items-center justify-center p-4">
      <div className="relative bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl border border-slate-800 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950">
          <div className="flex items-center space-x-2">
            {isFree ? <Gift className="w-5 h-5 text-emerald-400" /> : <Lock className="w-4 h-4 text-emerald-400" />}
            <span className="text-sm font-extrabold text-white">
              {isFree ? 'Free Digital Access' : 'Secure Instant Checkout'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Summary Header */}
        <div className="p-6 bg-slate-950/60 border-b border-slate-800 flex items-start gap-4">
          <img
            src={product.coverImage}
            alt={product.title}
            className="w-16 h-22 object-cover rounded-lg border border-slate-700 shadow shrink-0"
          />
          <div className="space-y-1 flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
              {product.edition}
            </span>
            <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
              {product.title}
            </h4>
            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-xl font-black text-amber-400">
                {isFree ? 'FREE (₹0)' : `₹${priceInRs}`}
              </span>
              {mrpInRs > priceInRs && (
                <span className="text-xs text-slate-500 line-through">
                  ₹{mrpInRs}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Customer Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              {errorMsg}
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder-slate-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                placeholder="your.email@example.com"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder-slate-600"
              />
              <p className="text-[10.5px] text-slate-400 mt-1">
                Your PDF download link and purchase confirmation will be sent here.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                WhatsApp Phone Number (Optional)
              </label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-700 bg-slate-950 text-white text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none placeholder-slate-600"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3.5 px-4 rounded-xl text-sm font-extrabold text-slate-950 shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-50 ${
                isFree
                  ? 'bg-emerald-400 hover:bg-emerald-300 shadow-emerald-500/20'
                  : 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 shadow-amber-500/20'
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing Access...</span>
                </>
              ) : isFree ? (
                <>
                  <Gift className="w-4 h-4" />
                  <span>GET FREE ACCESS & DOWNLOAD</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>PROCEED TO PAY ₹{priceInRs}</span>
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {isFree
                ? 'Instant Digital Download • Zero Charges'
                : 'Processed via Razorpay 256-bit Secure Gateway'}
            </span>
          </div>
        </form>

      </div>
    </div>
  );
}
