'use client';

import React, { useState } from 'react';
import { Eye, BookOpen, ChevronRight, FileText } from 'lucide-react';
import { ProductItem } from './ThreeBooksSection';

interface SamplePagesGalleryProps {
  products: ProductItem[];
  onViewSample: (product: ProductItem) => void;
}

export default function SamplePagesGallery({
  products,
  onViewSample,
}: SamplePagesGalleryProps) {
  const [selectedBookIdx, setSelectedBookIdx] = useState(0);

  const activeProduct = products[selectedBookIdx] || products[0];
  const samplePages = activeProduct?.samplePages || [];

  return (
    <section id="sample-pages" className="py-20 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-600">
            Real Source Previews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Sample Pages from the 3 Ebooks
          </h2>
          <p className="text-base sm:text-lg text-slate-600">
            Browse actual excerpt pages extracted directly from each uploaded ebook PDF before purchasing.
          </p>
        </div>

        {/* Book Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {products.map((product, idx) => (
            <button
              key={product.id || idx}
              onClick={() => setSelectedBookIdx(idx)}
              className={`flex items-center gap-2.5 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                selectedBookIdx === idx
                  ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 ring-2 ring-amber-500'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 text-xs flex items-center justify-center font-mono">
                {idx + 1}
              </span>
              <span className="line-clamp-1">{product.title}</span>
            </button>
          ))}
        </div>

        {/* Active Book Sample Grid */}
        {activeProduct && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-8">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-wide">
                  {activeProduct.edition} • {activeProduct.language}
                </span>
                <h3 className="text-xl font-bold text-slate-900">
                  {activeProduct.title}
                </h3>
              </div>

              <button
                onClick={() => onViewSample(activeProduct)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-sm transition-all"
              >
                <Eye className="w-4 h-4" />
                VIEW FULL SAMPLE ({samplePages.length} Pages)
              </button>
            </div>

            {/* Thumbnails Showcase */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {samplePages.map((pageUrl, idx) => (
                <div
                  key={idx}
                  onClick={() => onViewSample(activeProduct)}
                  className="group relative cursor-pointer rounded-lg overflow-hidden border border-slate-200 bg-slate-900 shadow-sm hover:shadow-md hover:border-amber-400 transition-all aspect-[1/1.4]"
                >
                  <img
                    src={pageUrl}
                    alt={`Sample page ${idx + 1} from ${activeProduct.title}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-amber-500 text-slate-950 px-2.5 py-1 rounded shadow">
                      <Eye className="w-3 h-3" />
                      Page {idx + 1}
                    </span>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
