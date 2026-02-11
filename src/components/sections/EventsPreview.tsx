"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import EventCard from "@/components/ui/EventCard";

const events = [
    {
        id: 1,
        title: "Roboeminence",
        category: "Competition",
        date: "Upcoming",
        description: "The ultimate robotics showdown — line follower, maze solver, and robo-soccer competitions.",
        image: "/images/events/Roboeminence.jpg",
    },
    {
        id: 2,
        title: "Lecture Series",
        category: "Workshop",
        date: "Completed",
        description: "8-day intensive covering foundational robotics principles to advanced applications.",
        image: "/images/events/Workshop.jpg",
        color: "cyber-green",
    }
];

export default function EventsPreview() {
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
                        <p className="text-white/20 font-tech text-[10px] tracking-[0.3em] uppercase mb-3">Events</p>
                        <h2 className="text-2xl md:text-3xl font-black text-white font-display uppercase tracking-tight">
                            Recent &amp; Upcoming
                        </h2>
                    </div>
                    <Link href="/events" className="group inline-flex items-center gap-2 text-white/30 hover:text-white/60 text-xs uppercase tracking-widest font-tech transition-colors">
                        All Events <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <div className="space-y-8">
                    {events.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                             <EventCard event={event} index={index} isPreview={true} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
