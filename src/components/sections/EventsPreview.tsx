"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Calendar } from "lucide-react";
import Image from "next/image";

const events = [
    {
        id: 1,
        title: "Roboeminence",
        category: "Competition",
        date: "Upcoming",
        description: "Prepare for the ultimate robotics showdown. Line follower, maze solver, and robo-soccer competitions.",
        image: "/images/events/Roboeminence.jpg",
    },
    {
        id: 2,
        title: "Lecture Series",
        category: "Workshop",
        date: "Completed",
        description: "Dive deep into the world of robotics and animation. 8-day intensive program covering foundational principles.",
        image: "/images/events/Workshop.jpg",
    }
];

export default function EventsPreview() {
    return (
        <section className="py-24 bg-black/20 relative">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="text-cyber-cyan font-tech text-xs tracking-widest uppercase mb-2 block">Upcoming</span>
                        <h2 className="text-4xl md:text-6xl font-black text-white font-display uppercase tracking-tight">
                            LATEST <span className="text-cyber-cyan">LOGS</span>
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Link href="/events" className="group flex items-center gap-2 text-cyber-cyan font-tech text-xs uppercase tracking-widest border border-cyber-cyan/30 px-6 py-3 hover:bg-cyber-cyan/10 transition-all">
                            Complete Archive <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                <motion.div
                    variants={{
                        hidden: { opacity: 0 },
                        show: {
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.15,
                                delayChildren: 0.2
                            }
                        }
                    }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    {events.map((event) => (
                        <motion.div
                            key={event.id}
                            variants={{
                                hidden: { opacity: 0, y: 40, scale: 0.98 },
                                show: { opacity: 1, y: 0, scale: 1 }
                            }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative bg-[#0a0a0a] border border-white/5 hover:border-cyber-cyan/40 overflow-hidden rounded-xl transition-all duration-500"
                        >
                            <div className="aspect-[16/10] relative overflow-hidden">
                                <div className="absolute inset-0 bg-cyber-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
                                <Image
                                    src={event.image}
                                    alt={event.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                                />
                                <div className="absolute top-4 left-4 z-20">
                                    <span className="bg-black/80 backdrop-blur-md text-cyber-cyan text-[10px] font-tech px-3 py-1 uppercase tracking-widest border-l-2 border-cyber-cyan">
                                        {event.date}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6 md:p-8">
                                <span className="text-cyber-cyan/60 text-[10px] font-tech uppercase tracking-[0.2em] mb-2 block">{event.category}</span>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-display group-hover:text-cyber-cyan transition-colors">{event.title}</h3>
                                <p className="text-gray-400 text-sm md:text-base leading-relaxed font-body mb-6 line-clamp-2">
                                    {event.description}
                                </p>
                                <div className="flex items-center gap-2 text-white/40 text-[10px] font-tech uppercase tracking-widest pt-4 border-t border-white/5">
                                    <Calendar size={12} className="text-cyber-cyan" /> View Details
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <div className="mt-8 text-center md:hidden">
                    <Link href="/events" className="inline-flex items-center text-cyber-cyan font-tech text-[10px] uppercase tracking-widest">
                        View All Events <ChevronRight size={14} className="ml-2" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
