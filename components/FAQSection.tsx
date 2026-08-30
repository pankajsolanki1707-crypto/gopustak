'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const faqs = [
    {
      q: 'How will I receive the ebook?',
      a: 'After your payment is successfully verified, you will be redirected to a secure download page where you can immediately download your PDF ebook with one click. A secure access link is also sent to your registered email address.',
    },
    {
      q: 'What format is available?',
      a: 'All ebooks are provided in high-resolution, DRM-protected standard PDF format. You can read them on Adobe Acrobat, Apple Books, Google Drive, Kindle apps, and any PDF reader across smartphones, tablets, laptops, and desktops.',
    },
    {
      q: 'Can I read the ebook on mobile?',
      a: 'Yes, completely. The PDF pages are designed with crystal-clear typography and structured layouts optimized for smooth reading on Android, iOS iPhones, iPads, tablets, and computers.',
    },
    {
      q: 'How does payment work?',
      a: 'Payments are processed directly through Razorpay, India’s leading 256-bit SSL encrypted payment gateway. You can pay via UPI (Google Pay, PhonePe, Paytm, CRED), Credit/Debit Cards, Net Banking, and Wallets. Payment is verified server-side via HMAC-SHA256 before granting download access.',
    },
    {
      q: 'How soon can I download?',
      a: 'Instantly. There is zero waiting time. As soon as Razorpay confirms the transaction (within seconds), your download button is activated immediately on the success screen.',
    },
    {
      q: 'What happens after payment?',
      a: 'You will see a "Payment Successful" confirmation page with your unique Order Reference (e.g. GP-xxxx), book summary, and an instant "DOWNLOAD EBOOK (PDF)" button. You also receive an email receipt with your secure access token.',
    },
    {
      q: 'What should I do if I face a download problem?',
      a: 'If your download is interrupted or you accidentally close the browser, you can access your download link from the confirmation email. You can also contact our team directly on WhatsApp (+91 99778 96709) or email (gopustak@outlook.com) with your Order Reference for instant support.',
    },
  ];

  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-14 space-y-3">
          <h2 className="text-2xl sm:text-3.5xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Got Questions? We Have Answers.
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Everything you need to know about purchasing, accessing, and reading your UPSC EPFO/APFC ebooks.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50 transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-amber-700 transition-colors text-sm sm:text-base"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Help Banner */}
        <div className="mt-10 p-5 sm:p-6 rounded-2xl bg-slate-950 text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left border border-slate-800">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-white">Still have questions before purchasing?</h4>
            <p className="text-xs text-slate-400 mt-0.5">Chat directly with our subject advisory team on WhatsApp or Email.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919977896709?text=Hi%20GoPustak,%20I%20have%20a%20question%20about%20the%20UPSC%20EPFO/APFC%20ebooks."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 transition-all shadow-md active:scale-95"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span>WhatsApp: +91 99778 96709</span>
            </a>
            <a
              href="mailto:gopustak@outlook.com"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700 transition-all"
            >
              Email Us
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
