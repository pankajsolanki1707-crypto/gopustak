'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const faqs = [
    {
      q: 'How do I receive the ebook?',
      a: 'Immediately after completing payment via Razorpay, you will be redirected to the secure Thank You page where you can directly download your PDF ebook with one click. In addition, an access confirmation and order reference are issued for your records.',
    },
    {
      q: 'What format is available?',
      a: 'All ebooks are delivered in standard, high-resolution PDF format. The PDFs are compatible with all PDF reader applications, eBook reading apps, Adobe Acrobat, Apple Books, and web browsers across all operating systems.',
    },
    {
      q: 'Can I read on mobile?',
      a: 'Yes, absolutely. The ebooks are fully responsive and optimized for crisp reading on smartphones (Android / iOS), tablets, iPads, Kindle app, laptops, and desktops.',
    },
    {
      q: 'How does payment work?',
      a: 'We use Razorpay, India’s leading 256-bit encrypted payment gateway. You can securely pay using UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit Cards, Net Banking, and Wallets. Your payment is verified securely on our server before issuing download access.',
    },
    {
      q: 'How soon can I download?',
      a: 'Instantly! There is zero waiting time. As soon as your transaction is verified by the server (within 2–3 seconds), your download button becomes active immediately.',
    },
    {
      q: 'What happens after payment?',
      a: 'You will see a "Payment Successful" confirmation screen displaying your unique Order Reference, amount paid, and an instant "DOWNLOAD EBOOK" button. You can save the PDF directly to your device storage or cloud drive.',
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Everything you need to know about purchasing, accessing, and reading your UPSC EPFO/APFC ebooks.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-4.5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-amber-700 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
