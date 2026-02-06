"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";


export default function EventsPreview() {
  return (
    <section className="py-24 bg-black/20 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <span className="text-cyber-cyan font-tech text-sm tracking-wider uppercase">Mark Your Calendars</span>
                <h2 className="text-4xl md:text-5xl font-bold mt-2">Upcoming Events</h2>
            </motion.div>
            
            <Link href="/events" className="hidden md:flex items-center text-cyber-cyan font-bold group">
                View All Events <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="group"
            >
                <Link href="/events">
                    <div className="glass-panel h-full p-1 border border-cyber-cyan/30 hover:border-cyber-cyan transition-all overflow-hidden relative group">
                        <div className="absolute inset-0 bg-cyber-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="h-64 bg-black w-full rounded relative overflow-hidden">
                             {/* Real Image */}
                             <div 
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                                style={{ backgroundImage: "url('/images/events/Roboeminence.jpg')" }}
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                             
                             <div className="absolute bottom-4 left-4 z-20">
                                <span className="bg-cyber-cyan text-black text-[10px] font-bold px-2 py-1 rounded-none mb-2 inline-block font-tech uppercase tracking-widest">COMPETITION</span>
                                <h3 className="text-2xl font-bold text-white font-display uppercase">Roboeminence</h3>
                             </div>
                             <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 border border-cyber-cyan/30 flex items-center gap-2 text-[10px] font-tech text-white uppercase tracking-wider">
                                <Calendar size={12} className="text-cyber-cyan" />
                                <span>Upcoming</span>
                             </div>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2 font-body">
                                Prepare for the ultimate robotics showdown. Line follower, maze solver, and robo-soccer competitions.
                            </p>
                            <span className="text-cyber-cyan text-xs font-bold font-tech uppercase tracking-widest flex items-center group-hover:gap-4 transition-all">
                                Participate Now <ArrowRight size={14} />
                            </span>
                        </div>
                    </div>
                </Link>
            </motion.div>

            <motion.div
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="group"
            >
                <Link href="/events">
                    <div className="glass-panel h-full p-1 border border-cyber-yellow/30 hover:border-cyber-yellow transition-all overflow-hidden relative group">
                        <div className="absolute inset-0 bg-cyber-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                         <div className="h-64 bg-black w-full rounded relative overflow-hidden">
                             {/* Real Image */}
                             <div 
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                                style={{ backgroundImage: "url('/images/events/Workshop.jpg')" }}
                             />
                             <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
                             
                             <div className="absolute bottom-4 left-4 z-20">
                                <span className="bg-cyber-yellow text-black text-[10px] font-bold px-2 py-1 rounded-none mb-2 inline-block font-tech uppercase tracking-widest">WORKSHOP</span>
                                <h3 className="text-2xl font-bold text-white font-display uppercase">Lecture Series</h3>
                             </div>
                             <div className="absolute top-4 right-4 z-20 bg-black/60 backdrop-blur-md px-3 py-1 border border-cyber-yellow/30 flex items-center gap-2 text-[10px] font-tech text-white uppercase tracking-wider">
                                <Calendar size={12} className="text-cyber-yellow" />
                                <span>Completed</span>
                             </div>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-400 text-sm mb-4 line-clamp-2 font-body">
                                Dive deep into the world of robotics and animation. 8-day intensive program covering foundational principles.
                            </p>
                            <span className="text-cyber-yellow text-xs font-bold font-tech uppercase tracking-widest flex items-center group-hover:gap-4 transition-all">
                                View Archive <ArrowRight size={14} />
                            </span>
                        </div>
                    </div>
                </Link>
            </motion.div>
        </div>
        
         <div className="mt-8 text-center md:hidden">
            <Link href="/events" className="inline-flex items-center text-cyber-primary font-bold">
                View All Events <ArrowRight className="ml-2" />
            </Link>
         </div>
      </div>
    </section>
  );
}
