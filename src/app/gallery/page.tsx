"use client";


import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OverlayViewer from '@/components/ui/OverlayViewer';
import GalleryCard from "@/components/ui/GalleryCard";

// Generate Image Data
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
  const activeCategoryState = useState('All');
  const activeCategory = activeCategoryState[0];
  const setActiveCategory = activeCategoryState[1];
  
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
    <main className="min-h-screen p-8 md:p-24 pt-32">
      <OverlayViewer 
        data={selectedImage ? {
            src: selectedImage.src,
            title: selectedImage.category,
            subtitle: "Media Asset Found",
            details: `A captured moment from the ${selectedImage.category} series, documenting our journey in robotics and engineering excellence.`,
            metadata: {
                "Asset ID": selectedImage.id,
                "Classification": "Gallery Log",
                "Source": "Field Camera"
            }
        } : null} 
        onClose={() => setSelectedImage(null)} 
        onNext={handleNext}
        onPrev={handlePrev}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
        >
            <h1 className="text-5xl md:text-7xl font-bold font-display uppercase tracking-tighter text-white mb-6">
                Club <span className="text-cyber-cyan">Gallery</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto font-body text-lg">
                Capturing moments of innovation and learning.
            </p>
        </motion.div>
        
        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-16 flex-wrap">
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-8 py-3 transition-all duration-300 font-display font-bold uppercase tracking-wider text-sm border hover:border-cyber-cyan ${
                        activeCategory === cat 
                        ? 'bg-cyber-cyan text-black border-cyber-cyan' 
                        : 'bg-transparent text-gray-400 border-white/10 hover:text-white'
                    }`}
                >
                    {cat}
                </button>
            ))}
        </div>
      
        <motion.div layout className="columns-2 md:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            <AnimatePresence>
                {filteredImages.map((img) => (
                <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={img.id} 
                    className="break-inside-avoid mb-6"
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
