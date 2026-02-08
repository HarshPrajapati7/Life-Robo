"use client";

import { motion } from "framer-motion";
import GalleryCard from "@/components/ui/GalleryCard";

const galleryItems = [
    {
        id: 1,
        title: "Robotics Workshop",
        category: "Live Session",
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
        title: "Bot Integration",
        category: "Team Build",
        src: '/images/gallery/workshops/pic (5).jpg'
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
                        >
                            <GalleryCard item={item} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
