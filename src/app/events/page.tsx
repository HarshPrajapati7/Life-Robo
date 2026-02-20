"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import OverlayViewer from "@/components/ui/OverlayViewer";
import Image from "next/image";
import Link from "next/link";
import { Calendar, MapPin, Clock, ExternalLink, User, Users } from "lucide-react";
import { events, slugify } from "@/lib/events-data";

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<(typeof events)[0] | null>(null);

  const handleNext = () => {
    if (!selectedEvent) return;
    const currentIndex = events.findIndex(e => e.title === selectedEvent.title);
    const nextIndex = (currentIndex + 1) % events.length;
    setSelectedEvent(events[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedEvent) return;
    const currentIndex = events.findIndex(e => e.title === selectedEvent.title);
    const prevIndex = (currentIndex - 1 + events.length) % events.length;
    setSelectedEvent(events[prevIndex]);
  };

  const colorMap: Record<string, { border: string, bg: string, text: string }> = {
    'cyber-cyan': { border: 'border-cyber-cyan', bg: 'bg-cyber-cyan', text: 'text-cyber-cyan' },
    'cyber-green': { border: 'border-cyber-green', bg: 'bg-cyber-green', text: 'text-cyber-green' },
    'cyber-yellow': { border: 'border-cyber-yellow', bg: 'bg-cyber-yellow', text: 'text-cyber-yellow' },
  };

  return (
    <main className="min-h-screen px-6 md:px-12 pt-24 pb-32 bg-[#060608]/85 relative overflow-hidden">
      <OverlayViewer 
        data={selectedEvent ? {
            src: selectedEvent.image,
            title: selectedEvent.title,
            subtitle: selectedEvent.category,
            details: selectedEvent.description,
            type: 'event',
            metadata: {
                "Schedule": selectedEvent.date,
                ...(selectedEvent.time ? { "Time": selectedEvent.time } : {}),
                "Status": selectedEvent.status || "N/A",
                "Venue": selectedEvent.venue || "Faculty of Engineering",
                ...(selectedEvent.chiefGuest ? { "Chief Guest": selectedEvent.chiefGuest } : {}),
                ...(selectedEvent.coordinators ? { "Coordinators": selectedEvent.coordinators } : {})
            }
        } : null}
        onClose={() => setSelectedEvent(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
      
      <div className="max-w-6xl mx-auto relative">
        <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="mb-24 text-center"
        >
            <h1 className="text-4xl md:text-6xl font-black font-display text-white mb-4 uppercase tracking-tighter">
                Our Journey
            </h1>
            <p className="text-white/40 text-sm md:text-base max-w-2xl mx-auto font-tech uppercase tracking-widest">
                Workshops, competitions, and milestones from recent to past
            </p>
        </motion.div>

        <div className="relative mx-auto w-full">
            {/* The central line on desktop, side line on mobile */}
            <div className="absolute left-[20px] md:left-1/2 top-4 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-white/10 to-transparent md:-translate-x-1/2 z-0" />

            <div className="space-y-16 md:space-y-24">
                {events.map((event, index) => {
                    const isEven = index % 2 === 0;
                    const colors = colorMap[event.color || 'cyber-cyan'] || colorMap['cyber-cyan'];

                    return (
                        <div key={event.title} className="relative flex flex-col md:flex-row md:items-center group z-10">
                            {/* Timeline dot */}
                            <div className={`absolute left-[15px] md:left-1/2 top-8 md:top-1/2 w-[12px] h-[12px] rounded-full border-2 bg-black z-20 md:-translate-x-1/2 md:-translate-y-1/2 ${colors.border}`} />

                            {/* Content area: full width on desktop */}
                            <div className="w-full flex pl-16 pt-2 md:pt-0 md:pl-0 flex-col md:flex-row md:items-stretch gap-0 md:gap-8 group">
                                
                                {/* Image Half */}
                                <motion.div 
                                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, type: "spring" }}
                                    className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end md:order-1' : 'md:justify-start md:order-2'}`}
                                >
                                    <div 
                                        className={`w-full max-w-lg h-64 md:h-full min-h-[300px] relative overflow-hidden rounded-sm border border-white/5 cursor-pointer bg-[#0a0a0c]/80 backdrop-blur-md ${isEven ? 'md:mr-8' : 'md:ml-8'}`}
                                        onClick={() => setSelectedEvent(event)}
                                    >
                                        <Image 
                                            src={event.image} 
                                            alt={event.title} 
                                            fill 
                                            className="object-cover transition-transform duration-700 group-hover:scale-105" 
                                        />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center font-display uppercase tracking-widest text-xs font-bold text-white backdrop-blur-sm z-10">
                                            View Details
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Details Half */}
                                <motion.div 
                                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, type: "spring", delay: 0.1 }}
                                    className={`w-full md:w-1/2 flex mt-4 md:mt-0 ${isEven ? 'md:justify-start md:order-2' : 'md:justify-end md:order-1'}`}
                                >
                                    <div className={`w-full max-w-lg bg-[#0a0a0c]/80 border border-white/5 backdrop-blur-md p-6 md:p-8 overflow-hidden relative group-hover:border-white/10 transition-colors ${isEven ? 'md:ml-8' : 'md:mr-8'}`}>
                                        {/* Glowing effect inside the card */}
                                        <div className={`absolute -inset-10 ${colors.bg} blur-3xl opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`} />
                                        
                                        {/* Metadata badges */}
                                        <div className="flex flex-wrap items-center gap-3 mb-5">
                                            <span className={`px-2.5 py-1 border ${colors.border} text-[10px] font-tech font-bold uppercase tracking-widest ${colors.text} bg-${colors.bg}/5`}>
                                                {event.category}
                                            </span>
                                            <div className="flex items-center gap-1.5 text-white/50 text-[10px] font-tech uppercase tracking-widest bg-white/5 px-2.5 py-1">
                                                <Calendar size={12} /> {event.date}
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className={`text-2xl md:text-3xl font-display font-bold uppercase tracking-wide text-white mb-4 group-hover:${colors.text} transition-colors`}>
                                            {event.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-white/60 text-sm font-body leading-relaxed line-clamp-3 mb-6 pl-4 border-l-2 border-white/10">
                                            {event.description}
                                        </p>

                                        {/* Extra Details */}
                                        {(event.time || event.venue) && (
                                            <div className="space-y-2 mb-6 text-xs text-white/60 font-tech tracking-wide border-t border-white/5 pt-5">
                                                {event.time && (
                                                    <div className="flex items-center gap-3">
                                                        <Clock size={14} className={colors.text}/> 
                                                        <span>{event.time}</span>
                                                    </div>
                                                )}
                                                {event.venue && (
                                                    <div className="flex items-center gap-3">
                                                        <MapPin size={14} className={colors.text}/> 
                                                        <span>{event.venue}</span>
                                                    </div>
                                                )}
                                                {event.chiefGuest && (
                                                    <div className="flex items-center gap-3 mt-1">
                                                        <User size={14} className={colors.text}/> 
                                                        <span className="line-clamp-1">{event.chiefGuest}</span>
                                                    </div>
                                                )}
                                                {event.coordinators && (
                                                    <div className="flex items-center gap-3 mt-3 pt-2 border-t border-white/5">
                                                        <Users size={14} className="text-cyber-green"/> 
                                                        <span className="text-white/40">Coords:</span>
                                                        <span className="line-clamp-1">{event.coordinators}</span>
                                                    </div>
                                                )}
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div className="flex items-center gap-4 mt-8 relative z-20">
                                            <Link 
                                                href={`/events/${slugify(event.title)}`}
                                                className="text-xs font-display font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                                            >
                                                Read More
                                            </Link>
                                            
                                            {event.registrationLink && (
                                                <a 
                                                    href={event.registrationLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={`px-5 py-2.5 bg-white/5 border border-white/10 ${colors.text} text-[10px] font-display font-bold uppercase tracking-widest hover:bg-white/10 hover:border-white/20 transition-all flex items-center gap-2 ml-auto`}
                                                >
                                                    Register <ExternalLink size={12} />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
      </div>
    </main>
  );
}

