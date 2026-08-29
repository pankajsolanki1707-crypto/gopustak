'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, ShoppingBag, Loader2, CheckCircle2, Lock } from 'lucide-react';
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
  const discount = mrpInRs > priceInRs ? mrpInRs - priceInRs : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    try {
      // 1. Create order on server (retrieving DB price)
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
      if (!data.success) {
        throw new Error(data.error || 'Failed to initialize order');
      }

      const { order } = data;

      // 2. Open Razorpay Checkout modal or simulation
      if (order.isDemo || !window.Razorpay) {
        // Fallback simulation mode for test environments
        const mockPaymentId = `pay_sim_${Date.now()}`;
        const mockSig = `demo_sig_${Date.now()}`;

        const verifyRes = await fetch('/api/razorpay/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            orderId: order.id,
            razorpayOrderId: order.razorpayOrderId,
            razorpayPaymentId: mockPaymentId,
            razorpaySignature: mockSig,
          }),
        });

        const verifyData = await verifyRes.json();
        if (!verifyData.success) {
          throw new Error(verifyData.error || 'Payment verification failed');
        }

        onClose();
        router.push(`/thank-you?orderId=${order.id}&token=${verifyData.token}`);
      } else {
        const options = {
          key: order.keyId,
          amount: order.amountInPaise,
          currency: order.currency,
          name: 'GOPUSTAK.IN',
          description: product.title,
          image: '/covers/cover-product-2.png',
          order_id: order.razorpayOrderId,
          prefill: {
            name: customerName,
            email: customerEmail,
            contact: customerPhone,
          },
          theme: {
            color: '#D97706',
          },
          handler: async function (response: any) {
            try {
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
                router.push(`/thank-you?orderId=${order.id}&token=${verifyData.token}`);
              } else {
                setErrorMsg(verifyData.error || 'Payment verification failed.');
              }
            } catch (err: any) {
              setErrorMsg(err.message || 'Payment verification network error');
            }
          },
          modal: {
            ondismiss: function () {
              setIsLoading(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during checkout.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto preview-modal-bg flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg overflow-hidden bg-white p-0.5 flex items-center justify-center">
              <img src="/images/logo.png" alt="GoPustak Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h3 className="text-sm font-bold leading-none">GOPUSTAK.IN</h3>
              <span className="text-[10px] text-slate-400">Secure Instant Checkout</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Product Summary */}
        <div className="p-6 bg-slate-50 border-b border-slate-200 flex gap-4 items-center">
          <img
            src={product.coverImage}
            alt={product.title}
            className="w-16 h-22 object-cover rounded shadow-md border border-slate-300 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
              {product.category}
            </span>
            <h4 className="text-sm font-bold text-slate-900 line-clamp-1 mt-1">
              {product.title}
            </h4>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-lg font-extrabold text-slate-900">₹{priceInRs}</span>
              {mrpInRs > priceInRs && (
                <span className="text-xs text-slate-400 line-through">₹{mrpInRs}</span>
              )}
              {discount > 0 && (
                <span className="text-[11px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.2 rounded">
                  Save ₹{discount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Customer Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              required
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
              placeholder="e.g. rahul@example.com"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
            <p className="text-[10px] text-slate-500 mt-1">
              Your instant download link & receipt will be delivered to this email.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="e.g. +91 98765 43210"
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-98 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Securing Order & Gateway...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  PAY SECURELY ₹{priceInRs}
                </>
              )}
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 pt-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Encrypted • Powered by Razorpay</span>
          </div>
        </form>

      </div>
    </div>
  );
}
