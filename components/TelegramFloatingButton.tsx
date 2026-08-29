'use client';

import React from 'react';

export default function FloatingSupportButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      {/* WhatsApp Quick Chat Floating Button */}
      <div className="flex items-center group">
        <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-lg bg-slate-900/95 text-white text-xs font-semibold shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          WhatsApp: +91 99778 96709
        </span>
        <a
          href="https://wa.me/919977896709?text=Hi%20GoPustak,%20I%20have%20a%20query%20about%20the%20UPSC%20EPFO/APFC%20ebooks."
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp +91 99778 96709"
          className="w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl hover:shadow-emerald-500/50 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ring-4 ring-white/20"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </a>
      </div>

      {/* Telegram Floating Button */}
      <div className="flex items-center group">
        <span className="hidden sm:inline-block mr-3 px-3 py-1.5 rounded-lg bg-slate-900/95 text-white text-xs font-semibold shadow-xl border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
          Join @Gopustak_official on Telegram
        </span>
        <a
          href="https://t.me/Gopustak_official"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Connect on Telegram @Gopustak_official"
          className="w-12 h-12 rounded-full bg-[#229ED9] hover:bg-[#1E88E5] text-white shadow-2xl hover:shadow-sky-500/50 flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 ring-4 ring-white/20"
        >
          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.56 8.16l-2.01 9.48c-.15.67-.55.83-1.11.52l-3.08-2.27-1.48 1.43c-.16.16-.3.3-.62.3l.22-3.13 5.7-5.15c.25-.22-.05-.34-.39-.12l-7.05 4.44-3.03-.95c-.66-.21-.67-.66.14-.98l11.85-4.57c.55-.2 1.03.13.86.99z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
