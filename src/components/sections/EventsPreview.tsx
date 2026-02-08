"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import EventCard from "@/components/ui/EventCard";

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
        <section className="py-24 bg-black/20 relative overflow-hidden">
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
                    className="space-y-16"
                >
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            variants={{
                                hidden: { opacity: 0, y: 40 },
                                show: { opacity: 1, y: 0 }
                            }}
                        >
                             <EventCard event={event} index={index} isPreview={true} />
                        </motion.div>
                    ))}
                </motion.div>


            </div>
        </section>
    );
}
