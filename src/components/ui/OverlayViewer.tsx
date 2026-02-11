"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Maximize2, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface OverlayData {
  src: string;
  title: string;
  subtitle?: string;
  details?: string;
  type?: 'member' | 'event' | 'gallery';
  metadata?: Record<string, string>;
}

interface OverlayViewerProps {
  data: OverlayData | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
}

export default function OverlayViewer({ data, onClose, onNext, onPrev }: OverlayViewerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrev) onPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  return (
    <AnimatePresence>
      {data && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-zoom-out"
          />

          {/* Desktop Nav */}
          {onPrev && (
            <button 
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 md:left-8 z-[110] p-4 text-white/30 hover:text-white transition-colors group hidden md:block"
            >
                <ChevronLeft size={36} className="group-hover:-translate-x-1 transition-transform" />
            </button>
          )}
          {onNext && (
            <button 
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 md:right-8 z-[110] p-4 text-white/30 hover:text-white transition-colors group hidden md:block"
            >
                <ChevronRight size={36} className="group-hover:translate-x-1 transition-transform" />
            </button>
          )}

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 overflow-hidden flex flex-col md:flex-row min-h-[50vh] max-h-[90vh] z-[105]"
          >
            {/* Mobile Nav */}
            <div className="md:hidden flex justify-between absolute bottom-4 left-4 right-4 z-20">
                {onPrev && <button onClick={onPrev} className="p-3 bg-black/50 border border-white/10 rounded-full text-white"><ChevronLeft size={24} /></button>}
                {onNext && <button onClick={onNext} className="p-3 bg-black/50 border border-white/10 rounded-full text-white"><ChevronRight size={24} /></button>}
            </div>

            {/* Image */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px]">
                {data.src ? (
                  <Image
                      key={data.src}
                      src={data.src}
                      alt={data.title}
                      fill
                      sizes="100vw"
                      className="object-contain p-4 md:p-8"
                      priority
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="text-8xl font-bold text-white/5 font-display select-none">
                      {data.title.charAt(0)}
                    </span>
                  </div>
                )}
            </div>

            {/* Info */}
            <div className="w-full md:w-72 border-t md:border-t-0 md:border-l border-white/5 p-6 flex flex-col bg-[#0a0a0a]">
              <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-xl font-bold text-white uppercase tracking-wide mb-1 mt-2">
                        {data.title}
                    </h2>
                    {data.subtitle && (
                        <p className="text-white/40 font-tech text-xs uppercase tracking-wider">
                            {data.subtitle}
                        </p>
                    )}
                </div>
                <button
                    onClick={onClose}
                    className="p-2 text-white/30 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>
              </div>

              <div className="flex-1 space-y-6">
                 {data.details && (
                    <p className="text-white/35 text-sm font-body leading-relaxed">
                        {data.details}
                    </p>
                 )}

                 {data.metadata && (
                    <div className="space-y-3 pt-4 border-t border-white/5">
                        {Object.entries(data.metadata).map(([key, value]) => (
                            <div key={key} className="flex flex-col">
                                <span className="text-[10px] text-white/20 font-tech uppercase tracking-wider">{key}</span>
                                <span className="text-white/70 text-sm font-tech">{value}</span>
                            </div>
                        ))}
                    </div>
                 )}
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-white/5">
                {data.src && (
                  <button 
                    onClick={() => window.open(data.src, '_blank')}
                    className="w-full py-3 bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-white/10 font-tech text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                  >
                      <Maximize2 size={14} /> Full Resolution
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
