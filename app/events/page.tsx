"use client";

import React, { useState } from "react";
import Navbar from "../components/navbar";
import MovingBackground from "../components/MovingBackground";
import { ArrowLeft, Calendar, Clock, MapPin, Users, CheckCircle } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";

const events = [
  {
    id: 1,
    title: "Autonomous Rover Challenge",
    date: "May 10, 2026",
    time: "10:00 AM",
    location: "Engineering Block B, Lab 204",
    type: "Competition",
    typeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    spots: 20,
    desc: "Build an autonomous rover that navigates a pre-defined obstacle course using ultrasonic sensors and basic CV.",
  },
  {
    id: 2,
    title: "Intro to ROS 2 Workshop",
    date: "May 17, 2026",
    time: "2:00 PM",
    location: "Computer Science Block, Room 101",
    type: "Workshop",
    typeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    spots: 30,
    desc: "A hands-on beginner workshop on Robot Operating System 2. No prior ROS experience needed.",
  },
  {
    id: 3,
    title: "PCB Design Masterclass",
    date: "May 24, 2026",
    time: "11:00 AM",
    location: "Electronics Lab 3",
    type: "Workshop",
    typeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    spots: 15,
    desc: "Learn KiCad from scratch. By the end you will have designed and submitted a real PCB for club fabrication.",
  },
  {
    id: 4,
    title: "Inter-College Bot Battle",
    date: "June 7, 2026",
    time: "9:00 AM",
    location: "University Auditorium",
    type: "Competition",
    typeColor: "bg-orange-500/10 text-orange-400 border-orange-500/20",
    spots: 40,
    desc: "Our annual flagship event. Compete against teams from 12 colleges across Uttar Pradesh.",
  },
  {
    id: 5,
    title: "Machine Learning for Robotics",
    date: "June 14, 2026",
    time: "3:00 PM",
    location: "AI Lab, Block D",
    type: "Seminar",
    typeColor: "bg-green-500/10 text-green-400 border-green-500/20",
    spots: 50,
    desc: "A guest lecture by our alumni at IIT Kanpur covering practical ML applications in robotics like gesture control.",
  },
];

export default function EventsPage() {
  const [rsvpd, setRsvpd] = useState<number[]>([]);
  const [loading, setLoading] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [showEmailModal, setShowEmailModal] = useState<number | null>(null);

  const handleRSVP = async (eventId: number, eventTitle: string) => {
    if (!email.trim()) {
      setShowEmailModal(eventId);
      return;
    }
    setLoading(eventId);
    try {
      const { error } = await supabase.from('rsvps').insert([
        { event_id: eventId, event_title: eventTitle, email, status: 'confirmed' }
      ]);
      await new Promise(r => setTimeout(r, 600));
      setRsvpd(prev => [...prev, eventId]);
      setShowEmailModal(null);
      setEmail("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-[#06060c] text-white relative">
      <MovingBackground />
      <div className="relative z-10">
        <Navbar />
        <div className="max-w-5xl mx-auto px-6 py-24">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-12 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-blue-400 text-sm font-medium uppercase tracking-widest mb-3">Upcoming</p>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Events &<br />
              <span className="text-blue-500">Workshops</span>
            </h1>
            <p className="text-gray-400 text-lg mb-16 max-w-xl">
              From beginner workshops to inter-college battles. RSVP to reserve your spot.
            </p>
          </motion.div>

          {/* Email modal */}
          {showEmailModal !== null && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0f1117] border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-xl"
              >
                <h3 className="text-xl font-bold text-white mb-2">Confirm RSVP</h3>
                <p className="text-gray-400 text-sm mb-6">Enter your college email to receive a confirmation and reminder for this event.</p>
                <input
                  type="email"
                  required
                  placeholder="yourname@university.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors mb-4"
                />
                <div className="flex gap-3">
                  <button
                    onClick={() => { setShowEmailModal(null); setEmail(""); }}
                    className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      const ev = events.find(e => e.id === showEmailModal);
                      if (ev) handleRSVP(ev.id, ev.title);
                    }}
                    disabled={loading === showEmailModal || !email.trim()}
                    className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all disabled:opacity-50"
                  >
                    {loading === showEmailModal ? "Confirming..." : "Confirm RSVP"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-blue-500/20 to-transparent"></div>
            <div className="space-y-8">
              {events.map((event, i) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="relative pl-16"
                >
                  <div className={`absolute left-4 top-6 w-4 h-4 rounded-full border-2 border-blue-500 ${rsvpd.includes(event.id) ? 'bg-blue-500' : 'bg-[#06060c]'} -translate-x-1/2 transition-colors duration-500`}></div>

                  <div className="bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 rounded-2xl p-6 transition-all group">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className={`text-xs font-medium px-3 py-1 rounded-full border ${event.typeColor}`}>{event.type}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{event.title}</h3>
                        <p className="text-gray-400 text-sm mb-4 max-w-xl">{event.desc}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1.5"><Calendar size={14} className="text-blue-400" />{event.date}</span>
                          <span className="flex items-center gap-1.5"><Clock size={14} className="text-blue-400" />{event.time}</span>
                          <span className="flex items-center gap-1.5"><MapPin size={14} className="text-blue-400" />{event.location}</span>
                          <span className="flex items-center gap-1.5"><Users size={14} className="text-blue-400" />{event.spots} spots</span>
                        </div>
                      </div>

                      <div className="self-center">
                        {rsvpd.includes(event.id) ? (
                          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                            <CheckCircle size={15} /> RSVP Confirmed
                          </div>
                        ) : (
                          <button
                            onClick={() => setShowEmailModal(event.id)}
                            disabled={loading === event.id}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(37,99,235,0.35)] disabled:opacity-50"
                          >
                            {loading === event.id ? "Confirming..." : "RSVP Now"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
