"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const galleryItems = [
    {
        id: 1,
        title: "Robotics Workshop",
        category: "Live Session",
        image: '/images/gallery/workshops/pic (1).jpg'
    },
    {
        id: 2,
        title: "Animation Series",
        category: "Lecture",
        image: '/images/gallery/lecture-series/pic (3).jpg'
    },
    {
        id: 3,
        title: "Bot Integration",
        category: "Team Build",
        image: '/images/gallery/workshops/pic (5).jpg'
    }
];

export default function GalleryPreview() {
    return (
        <section className="py-24 bg-black relative">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <span className="text-cyber-cyan font-tech text-xs tracking-widest uppercase mb-2 block tracking-[0.4em]">Visual Archive</span>
                    <h2 className="text-4xl md:text-6xl font-black text-white font-display uppercase tracking-tight">
                        FIELD <span className="text-cyber-cyan">DATA</span>
                    </h2>
                </motion.div>

                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.1,
                                delayChildren: 0.1
                            }
                        }
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {galleryItems.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={{
                                hidden: { opacity: 0, y: 40, scale: 0.95, rotateX: 10, rotateY: -10 },
                                show: { opacity: 1, y: 0, scale: 1, rotateX: 0, rotateY: 0 }
                            }}
                            transition={{
                                duration: 1.2,
                                ease: [0.16, 1, 0.3, 1]
                            }}
                            className="group relative aspect-square overflow-hidden rounded-xl border border-white/5 hover:border-cyber-cyan/40 bg-[#0a0a0a] transition-all duration-500"
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover transition-all duration-700 md:grayscale md:group-hover:grayscale-0 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                            <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <span className="text-cyber-cyan font-tech text-[10px] uppercase tracking-widest mb-1 block">{item.category}</span>
                                <h3 className="text-xl md:text-2xl font-bold text-white font-display mb-2">{item.title}</h3>

                                <div className="w-8 h-1 bg-cyber-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </div>

                            {/* Holographic overlay on hover */}
                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-cyber-cyan/10 to-transparent mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
