"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import OverlayViewer from "@/components/ui/OverlayViewer";
import EventCard from "@/components/ui/EventCard";

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
    <main className="min-h-screen px-6 md:px-12 pt-24 pb-16 bg-[#060608]/85">
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
                "Venue": "Faculty of Engineering"
            }
        } : null}
        onClose={() => setSelectedEvent(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             className="mb-16"
        >
            <h1 className="text-4xl md:text-5xl font-bold font-display text-white mb-3 uppercase tracking-tight">
                Events
            </h1>
            <p className="text-white/30 text-sm max-w-md">
                Workshops, competitions, and seminars from our journey so far.
            </p>
        </motion.div>

        <div className="space-y-20">
            {events.map((event, index) => (
                <motion.div 
                    key={event.title} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                >
                    <EventCard 
                        event={event} 
                        index={index} 
                        onViewDetails={() => setSelectedEvent(event)}
                    />
                </motion.div>
            ))}
        </div>
      </div>
    </main>
  );
}
