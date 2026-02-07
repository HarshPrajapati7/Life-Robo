"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Actual activity images for gallery preview
const previewImages = [
    '/images/gallery/workshops/pic (1).jpg', 
    '/images/gallery/lecture-series/pic (3).jpg',
    '/images/gallery/workshops/pic (5).jpg'
];

export default function GalleryPreview() {
  return (
    <section className="py-24 bg-transparent relative">
       <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                <div className="text-center md:text-left mb-6 md:mb-0">
                    <span className="text-cyber-cyan font-tech text-xs uppercase tracking-widest">Digital Snapshot</span>
                    <h2 className="text-4xl md:text-5xl font-bold mt-2 font-display uppercase tracking-tighter">Club <span className="text-cyber-cyan">Gallery</span></h2>
                    <p className="text-gray-500 mt-2 font-body">Capturing the engineering spirit in action.</p>
                </div>
                <Link href="/gallery">
                    <button className="px-8 py-3 bg-white/5 hover:bg-cyber-cyan hover:text-black transition-all text-xs font-bold font-tech uppercase tracking-widest border border-white/10 group flex items-center gap-2">
                        View Database <div className="w-1 h-3 bg-cyber-cyan group-hover:bg-black" />
                    </button>
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[500px]">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="md:col-span-2 relative h-full rounded-sm overflow-hidden group border border-white/5"
                >
                    <Image 
                        src={previewImages[0]} 
                        alt="Robotics Workshop"
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end p-8">
                        <div className="space-y-1">
                            <span className="text-cyber-cyan font-tech text-[10px] uppercase tracking-[0.2em]">Live Session</span>
                            <h3 className="text-2xl font-bold text-white font-display uppercase">Hands-on Robotics Workshop</h3>
                        </div>
                    </div>
                </motion.div>
                
                <div className="grid grid-rows-2 gap-6 h-full">
                     <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="relative h-full rounded-sm overflow-hidden group border border-white/5"
                    >
                         <Image 
                            src={previewImages[1]} 
                            alt="Lecture Series"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end p-6">
                            <h3 className="text-lg font-bold text-white font-display uppercase">Animation Series</h3>
                        </div>
                    </motion.div>
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="relative h-full rounded-sm overflow-hidden group border border-white/5"
                    >
                         <Image 
                            src={previewImages[2]} 
                            alt="Team Build"
                            fill
                            className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-end p-6">
                            <h3 className="text-lg font-bold text-white font-display uppercase">Bot Integration</h3>
                        </div>
                    </motion.div>
                </div>
            </div>
       </div>
    </section>
  );
}
