"use client";

import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useState } from "react";
import OverlayViewer from "@/components/ui/OverlayViewer";

const events = [
  {
    title: "RoboEminence",
    date: "Upcoming",
    category: "Competition",
    description: "\"RoboEminence,\" a dynamic event featuring a range of robot demonstrations, including Robo Fire, Optical Avoiding, and Voice Control models. The event was inaugurated by DRDO scientist Dr. Vidya Shankar Pandey.",
    image: "/images/events/Roboeminence.jpg",
    status: "Registration Open",
    color: "cyber-cyan"
  },
  {
    title: "Lecture Series",
    date: "Completed",
    category: "Education",
    description: "The 8-day robotics and animation lecture series was transformative for students, covering foundational principles to advanced applications. The program offered a holistic understanding of both theory and practice.",
    image: "/images/events/LectureSeries.jpg",
    status: "Archived",
    color: "cyber-cyan"
  },
  {
    title: "Introductory Workshop",
    date: "Completed",
    category: "Workshop",
    description: "The introductory workshop on robotics and animation was a transformative experience for students, guided by skilled instructors. It seamlessly blended theoretical concepts with hands-on exposure.",
    image: "/images/events/Workshop.jpg",
    status: "Archived",
    color: "cyber-yellow"
  }
];

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

  return (
    <main className="min-h-screen p-8 md:p-24 pt-32 relative overflow-hidden">
      <OverlayViewer 
        data={selectedEvent ? {
            src: selectedEvent.image,
            title: selectedEvent.title,
            subtitle: selectedEvent.category,
            details: selectedEvent.description,
            type: 'event',
            metadata: {
                "Schedule": selectedEvent.date,
                "Status": selectedEvent.status,
                "Venue": "Faculty of Engineering",
                "Protocol": "Active"
            }
        } : null}
        onClose={() => setSelectedEvent(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="text-center mb-20"
        >
            <h1 className="text-5xl md:text-7xl font-bold font-display text-white mb-6 uppercase tracking-tighter loading-none">
                Club <span className="text-cyber-cyan">Timeline</span>
            </h1>
            <p className="text-gray-400 font-body text-lg max-w-2xl mx-auto">
                Chronological archive of our workshops, competitions, and seminars.
            </p>
        </motion.div>

        <div className="space-y-24">
            {events.map((event, index) => (
                <motion.div 
                    key={event.title} 
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center group`}
                >
                    {/* Image Section */}
                    {/* Using a color map for dynamic tailwind classes */}
                    {(() => {
                        const colorMap = {
                            'cyber-cyan': {
                                border: 'border-cyber-cyan',
                                text: 'text-cyber-cyan',
                                bg: 'bg-cyber-cyan',
                                bg20: 'bg-cyber-cyan/20'
                            },
                            'cyber-pink': {
                                border: 'border-cyber-pink',
                                text: 'text-cyber-pink',
                                bg: 'bg-cyber-pink',
                                bg20: 'bg-cyber-pink/20'
                            },
                            'cyber-yellow': {
                                border: 'border-cyber-yellow',
                                text: 'text-cyber-yellow',
                                bg: 'bg-cyber-yellow',
                                bg20: 'bg-cyber-yellow/20'
                            }
                        };
                        const colors = colorMap[event.color as keyof typeof colorMap] || colorMap['cyber-cyan'];

                        return (
                            <>
                            <div className="w-full lg:w-1/2 relative">
                                <div className={`absolute -inset-4 ${colors.bg20} rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                <div className="relative h-[300px] md:h-[400px] w-full border border-white/10 glass-panel overflow-hidden">
                                     <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url('${event.image}')` }} />
                                     <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                </div>
                                
                                 <div className={`absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 ${colors.border}`} />
                                 <div className={`absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 ${colors.border}`} />
                            </div>

                            <div className="w-full lg:w-1/2 space-y-6">
                                <div className="flex items-center gap-4">
                                     <span className={`px-3 py-1 rounded-sm border ${colors.border} ${colors.text} text-xs font-tech font-bold uppercase tracking-wider`}>
                                         {event.category}
                                     </span>
                                     <span className="text-gray-500 text-xs font-tech uppercase tracking-wider flex items-center gap-2">
                                         <Calendar size={12} /> {event.date}
                                     </span>
                                </div>
                                
                                <h2 className="text-4xl font-bold text-white font-display uppercase tracking-wide group-hover:text-cyber-cyan transition-colors">
                                    {event.title}
                                </h2>
                                
                                <p className="text-gray-400 text-lg leading-relaxed border-l-2 border-white/10 pl-6 font-body">
                                    {event.description}
                                </p>
                                
                                <div className="pt-4 flex items-center gap-6">
                                    <button 
                                        onClick={() => setSelectedEvent(event)}
                                        className={`px-8 py-3 bg-transparent border border-white/20 text-white hover:${colors.bg} hover:text-black hover:${colors.border} transition-all font-display font-bold uppercase tracking-widest text-sm`}
                                    >
                                        View Details
                                    </button>
                                     <span className={`font-tech text-xs ${colors.text} uppercase tracking-widest`}>
                                         {event.status}
                                     </span>
                                </div>
                            </div>
                            </>
                        );
                    })()}
                </motion.div>
            ))}
        </div>
      </div>
    </main>
  );
}
