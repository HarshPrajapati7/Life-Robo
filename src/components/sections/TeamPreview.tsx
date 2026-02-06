"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Users, Shield } from "lucide-react";
import { teamData } from "@/lib/team-data";

export default function TeamPreview() {
  // Get leads
  const leads = teamData.find(s => s.title === "Robotics Club Leads")?.members || [];
  
  // Get a few others for variety if needed, but let's stick to leads for the preview
  // or maybe the Software Team lead as well.
  const softwareLead = teamData.find(s => s.title.includes("Software"))?.members.find(m => m.role.includes("Lead"));

  return (
    <section className="py-24 relative overflow-hidden">
       {/* Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyber-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cyber-cyan/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
            >
                <div className="flex items-center gap-2 text-cyber-cyan mb-2 font-tech text-sm tracking-widest uppercase">
                    <Shield size={16} />
                    <span>Club Leadership</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-display uppercase tracking-tighter">
                    Team Leads
                </h2>
            </motion.div>
            
            <motion.div
                 initial={{ opacity: 0, x: 20 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 className="text-right hidden md:block"
            >
                <p className="text-cyber-muted font-tech text-xs tracking-widest uppercase">
                    University of Lucknow<br/>
                    Robotics Club
                </p>
            </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[...leads, softwareLead].filter(Boolean).map((member: any, idx) => (
                <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.2 }}
                    className="group relative bg-black border border-white/10 p-6 hover:border-cyber-cyan/50 transition-colors"
                >
                    {/* Tech Corners */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-cyber-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-cyber-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-cyber-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-cyber-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>

                     <div className="flex items-center gap-4 mb-4">
                         <div className="w-16 h-16 rounded-none bg-cyber-dark border border-white/20 flex items-center justify-center overflow-hidden relative group-hover:border-cyber-cyan transition-colors">
                              {/* Scanline on image */}
                              {/* Using CSS class .scanline defined in globals.css */}
                              <div className="absolute inset-0 scanline opacity-20 pointer-events-none mix-blend-overlay"></div>
                              <span className="text-2xl font-bold text-white font-display">{member.name.charAt(0)}</span>
                         </div>
                         <div>
                             <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide">{member.name}</h3>
                             <p className="text-cyber-cyan text-xs font-tech tracking-wider uppercase">{member.role}</p>
                         </div>
                     </div>
                     
                     <div className="border-t border-white/10 pt-4 mt-2">
                         <div className="flex justify-between items-center text-xs font-tech text-gray-500 uppercase tracking-widest">
                             <span>Branch: {member.branch}</span>
                             <span>YR: 0{member.year}</span>
                         </div>
                     </div>
                     
                     {/* Hover Overlay */}
                     <div className="absolute inset-0 bg-cyber-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </motion.div>
            ))}
        </div>
        
        <div className="text-center">
             <Link href="/team">
                <button className="px-8 py-3 border border-cyber-cyan/20 text-cyber-cyan hover:bg-cyber-cyan hover:text-black transition-all font-tech uppercase tracking-widest text-sm relative group overflow-hidden">
                    <span className="relative z-10">View Full Team</span>
                    <div className="absolute inset-0 bg-cyber-cyan/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </button>
             </Link>
        </div>
      </div>
    </section>
  );
}
