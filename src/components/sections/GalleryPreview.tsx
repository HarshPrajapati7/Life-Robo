"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import GalleryCard from "@/components/ui/GalleryCard";

const galleryItems = [
    {
        id: 1,
        title: "Robotics Workshop",
        category: "Workshop",
        src: '/images/gallery/workshops/pic (1).jpg'
    },
    {
        id: 2,
        title: "Animation Series",
        category: "Lecture",
        src: '/images/gallery/lecture-series/pic (3).jpg'
    },
    {
        id: 3,
        title: "Bot Assembly",
        category: "Workshop",
        src: '/images/gallery/workshops/pic (5).jpg'
    }
];

export default function GalleryPreview() {
    return (
        <section className="py-20 border-t border-white/5">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4"
                >
                    <div>
                        <p className="text-white/20 font-tech text-[10px] tracking-[0.3em] uppercase mb-3">Gallery</p>
                        <h2 className="text-2xl md:text-3xl font-black text-white font-display uppercase tracking-tight">
                            From the Lab
                        </h2>
                    </div>
                    <Link href="/gallery" className="group inline-flex items-center gap-2 text-white/30 hover:text-white/60 text-xs uppercase tracking-widest font-tech transition-colors">
                        Full Gallery <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {galleryItems.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08 }}
                        >
                            <GalleryCard item={item} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
