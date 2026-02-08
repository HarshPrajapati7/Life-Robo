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

          {/* Navigation Shortcuts - Fixed to edges */}
          {onPrev && (
            <button 
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                className="absolute left-4 md:left-8 z-[110] p-4 text-white/50 hover:text-cyber-cyan transition-colors group hidden md:block"
            >
                <ChevronLeft size={48} className="group-hover:-translate-x-2 transition-transform" />
            </button>
          )}
          {onNext && (
            <button 
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                className="absolute right-4 md:right-8 z-[110] p-4 text-white/50 hover:text-cyber-cyan transition-colors group hidden md:block"
            >
                <ChevronRight size={48} className="group-hover:translate-x-2 transition-transform" />
            </button>
          )}

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-5xl bg-black border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col md:flex-row min-h-[50vh] max-h-[90vh] z-[105]"
          >
            {/* ... rest of the modal content same as before ... */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-50"></div>
            
            {/* Mobile Nav Overlay */}
            <div className="md:hidden flex justify-between absolute bottom-4 left-4 right-4 z-20">
                {onPrev && <button onClick={onPrev} className="p-3 bg-black/50 border border-white/10 rounded-full text-white"><ChevronLeft size={24} /></button>}
                {onNext && <button onClick={onNext} className="p-3 bg-black/50 border border-white/10 rounded-full text-white"><ChevronRight size={24} /></button>}
            </div>

            {/* Image Section */}
            <div className="relative flex-1 bg-cyber-dark flex items-center justify-center overflow-hidden min-h-[300px]">
                <div className="absolute inset-0 scanline opacity-10 pointer-events-none"></div>
                {data.src ? (
                  <Image
                      key={data.src} // Add key to trigger animation on source change
                      src={data.src}
                      alt={data.title}
                      fill
                      sizes="100vw"
                      className="object-contain p-4 md:p-8"
                      priority
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <span className="text-8xl font-bold text-white/10 font-display select-none">
                      {data.title.charAt(0)}
                    </span>
                  </div>
                )}
            </div>

            {/* Info Section same as before */}

            {/* Info Section */}
            <div className="w-full md:w-80 border-t md:border-t-0 md:border-l border-white/10 p-6 flex flex-col bg-black/40 backdrop-blur-xl">
              <div className="flex justify-between items-start mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-white font-display uppercase tracking-wider mb-1 mt-2">
                        {data.title}
                    </h2>
                    {data.subtitle && (
                        <p className="text-cyber-cyan font-tech text-xs uppercase tracking-[0.2em]">
                            {data.subtitle}
                        </p>
                    )}
                </div>
                <button
                    onClick={onClose}
                    className="p-2 text-gray-500 hover:text-cyber-pink transition-colors group"
                >
                    <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>

              <div className="flex-1 space-y-6">
                 {data.details && (
                    <div className="space-y-2">
                        <span className="text-[10px] text-gray-500 font-tech uppercase tracking-widest flex items-center gap-2">
                            <div className="w-1 h-3 bg-cyber-pink"></div> Log Entry
                        </span>
                        <p className="text-gray-400 text-sm font-body leading-relaxed">
                            {data.details}
                        </p>
                    </div>
                 )}

                 {data.metadata && (
                    <div className="space-y-4 pt-4 border-t border-white/5">
                        {Object.entries(data.metadata).map(([key, value]) => (
                            <div key={key} className="flex flex-col">
                                <span className="text-[10px] text-gray-600 font-tech uppercase tracking-[0.1em]">{key}</span>
                                <span className="text-white text-sm font-tech uppercase tracking-wider">{value}</span>
                            </div>
                        ))}
                    </div>
                 )}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-2 text-[10px] text-cyber-cyan/50 font-tech uppercase mb-4 tracking-tighter">
                   <div className="animate-pulse w-1.5 h-1.5 rounded-full bg-cyber-cyan"></div> System Linked
                </div>
                {data.src && (
                  <button 
                    onClick={() => window.open(data.src, '_blank')}
                    className="w-full py-3 bg-white/5 border border-white/10 text-white font-tech text-xs uppercase tracking-widest hover:bg-cyber-cyan hover:text-black transition-all flex items-center justify-center gap-2"
                  >
                      <Maximize2 size={14} /> Full Resolution
                  </button>
                )}
              </div>
            </div>

            {/* Corner Details */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyber-cyan/30 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyber-pink/30 pointer-events-none"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
