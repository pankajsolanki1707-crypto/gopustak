'use client';

import React from 'react';

export default function TelegramFloatingButton() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center group">
      {/* Tooltip hint on hover */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-lg bg-slate-900/95 text-white text-xs font-semibold shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        Join @Gopustak_official on Telegram
      </span>

      {/* Floating Action Button */}
      <a
        href="https://t.me/Gopustak_official"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect on Telegram @Gopustak_official"
        className="w-13 h-13 p-3 rounded-full bg-[#229ED9] hover:bg-[#1E88E5] text-white shadow-2xl hover:shadow-sky-500/50 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ring-4 ring-white/20"
      >
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-2.01 9.48c-.15.67-.55.83-1.11.52l-3.08-2.27-1.48 1.43c-.16.16-.3.3-.62.3l.22-3.13 5.7-5.15c.25-.22-.05-.34-.39-.12l-7.05 4.44-3.03-.95c-.66-.21-.67-.66.14-.98l11.85-4.57c.55-.2 1.03.13.86.99z" />
        </svg>
      </a>
    </div>
  );
}
