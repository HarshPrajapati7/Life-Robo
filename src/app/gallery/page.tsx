"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OverlayViewer from '@/components/ui/OverlayViewer';
import GalleryCard from "@/components/ui/GalleryCard";

const lectureImages = Array.from({ length: 17 }).map((_, i) => ({
  src: `/images/gallery/lecture-series/pic (${i + 1}).jpg`,
  category: 'Lecture Series',
  id: `lect-${i}`
}));

const workshopImages = Array.from({ length: 4 }).map((_, i) => ({
  src: `/images/gallery/workshops/pic (${i + 1}).jpg`,
  category: 'Workshops',
  id: `work-${i}`
}));

const allImages = [...lectureImages, ...workshopImages];
const categories = ['All', 'Lecture Series', 'Workshops'];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<(typeof allImages)[0] | null>(null);

  const filteredImages = activeCategory === 'All' 
    ? allImages 
    : allImages.filter(img => img.category === activeCategory);

  const handleNext = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedImage) return;
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const prevIndex = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
  };

  return (
    <main className="min-h-screen px-6 md:px-12 pt-24 pb-16 bg-[#060608]/85">
      <OverlayViewer 
        data={selectedImage ? {
            src: selectedImage.src,
            title: selectedImage.category,
            subtitle: selectedImage.category,
            details: `From the ${selectedImage.category} series.`,
            metadata: {
                "Category": selectedImage.category
            }
        } : null} 
        onClose={() => setSelectedImage(null)} 
        onNext={handleNext}
        onPrev={handlePrev}
      />

      <div className="max-w-7xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
        >
            <h1 className="text-4xl md:text-5xl font-bold font-display uppercase tracking-tight text-white mb-3">
                Gallery
            </h1>
            <p className="text-white/30 text-sm max-w-md">
                Moments from workshops, lectures, and events.
            </p>
        </motion.div>
        
        {/* Filter */}
        <div className="flex gap-1 mb-10">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                        activeCategory === cat 
                        ? 'bg-white text-black' 
                        : 'bg-transparent text-white/25 hover:text-white/50'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      
        <motion.div layout className="columns-2 md:columns-3 gap-4 md:gap-5 space-y-4 md:space-y-5">
            <AnimatePresence>
                {filteredImages.map((img) => (
                <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={img.id} 
                    className="break-inside-avoid mb-5"
                >
                    <GalleryCard 
                        item={img}
                        onClick={() => setSelectedImage(img)}
                    />
                </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
