"use client";

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OverlayViewer from '@/components/ui/OverlayViewer';

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
  
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const filteredImages = activeCategory === 'All' 
    ? allImages 
    : allImages.filter(img => img.category === activeCategory);

  const handleNext = () => {
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    const nextIndex = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
  };

  const handlePrev = () => {
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
                    onClick={() => setSelectedImage(img)}
                    className="break-inside-avoid relative group overflow-hidden border border-white/10 hover:border-cyber-cyan/50 transition-colors cursor-pointer"
                >
                    {/* Tech Corners */}
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyber-cyan opacity-0 group-hover:opacity-100 transition-opacity z-20"></div>

                    <Image
                    src={img.src}
                    alt={`${img.category} Image`}
                    width={500}
                    height={300}
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 z-10">
                         <span className="text-cyber-cyan font-tech text-xs uppercase tracking-wider">{img.category}</span>
                    </div>
                </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
      </div>
    </main>
  );
}
