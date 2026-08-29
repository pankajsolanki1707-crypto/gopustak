'use client';

import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, BookOpen, ShoppingBag } from 'lucide-react';
import { ProductItem } from './ThreeBooksSection';

interface SampleModalProps {
  product: ProductItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBuyNow: (product: ProductItem) => void;
}

export default function SampleModal({
  product,
  isOpen,
  onClose,
  onBuyNow,
}: SampleModalProps) {
  const [currentPageIdx, setCurrentPageIdx] = useState(0);

  if (!isOpen || !product) return null;

  const samplePages = product.samplePages || [];
  const totalPages = samplePages.length;

  const handleNext = () => {
    setCurrentPageIdx((prev) => (prev + 1 < totalPages ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentPageIdx((prev) => (prev - 1 >= 0 ? prev - 1 : totalPages - 1));
  };

  const priceInRs = Math.round(product.priceInPaise / 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto preview-modal-bg flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative bg-slate-900 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white line-clamp-1">
                {product.title}
              </h4>
              <p className="text-xs text-amber-400">
                Sample Page {currentPageIdx + 1} of {totalPages}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onBuyNow(product);
              }}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Buy Ebook (₹{priceInRs})
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Main Content: Image & Navigation */}
        <div className="relative flex-1 bg-slate-950 flex items-center justify-center p-4 overflow-y-auto min-h-[400px]">
          {totalPages > 0 ? (
            <div className="relative max-h-[70vh] flex items-center justify-center">
              <img
                src={samplePages[currentPageIdx]}
                alt={`Sample page ${currentPageIdx + 1} from ${product.title}`}
                className="max-h-[68vh] w-auto object-contain rounded shadow-2xl border border-slate-800"
              />
            </div>
          ) : (
            <p className="text-slate-400 text-sm">No sample pages available.</p>
          )}

          {/* Left / Right Nav Arrows */}
          {totalPages > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center border border-slate-700 backdrop-blur shadow-lg transition-all"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center border border-slate-700 backdrop-blur shadow-lg transition-all"
                aria-label="Next page"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>

        {/* Modal Bottom Thumbnails */}
        <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {samplePages.map((pageUrl, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPageIdx(idx)}
                className={`shrink-0 w-12 h-16 rounded border-2 overflow-hidden transition-all ${
                  currentPageIdx === idx
                    ? 'border-amber-400 scale-105 shadow-md shadow-amber-500/20'
                    : 'border-slate-700 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={pageUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              onClose();
              onBuyNow(product);
            }}
            className="sm:hidden shrink-0 inline-flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-bold bg-amber-500 text-slate-950"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Buy ₹{priceInRs}
          </button>
        </div>

      </div>
    </div>
  );
}
