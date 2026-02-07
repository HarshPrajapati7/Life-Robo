"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, Github, Linkedin, Mail } from "lucide-react";
import { teamData } from "@/lib/team-data";
import Image from "next/image";

export default function TeamPreview() {
    // Get leads for the preview
    const leads = teamData.find(s => s.title === "Robotics Club Leads")?.members || [];
    const softwareLead = teamData.find(s => s.title.includes("Software"))?.members.find(m => m.role.includes("Lead"));

    // Combine for preview, ensuring no nulls
    const teamMembers = [...leads, softwareLead].filter((m): m is NonNullable<typeof m> => !!m);

    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyber-primary/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute right-0 top-0 h-full w-[1px] bg-gradient-to-b from-transparent via-cyber-cyan/20 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-2 text-cyber-cyan mb-2 font-tech text-xs tracking-[0.3em] uppercase">
                        <Shield size={16} />
                        <span>Core Team</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white font-display uppercase tracking-tight">
                        LEAD <span className="text-cyber-cyan">SYSTEMS</span>
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
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12"
                >
                    {teamMembers.map((member) => (
                        <motion.div
                            key={member.name}
                            variants={{
                                hidden: { opacity: 0, y: 40, scale: 0.95 },
                                show: { opacity: 1, y: 0, scale: 1 }
                            }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative bg-[#0a0a0a] border border-white/5 p-6 rounded-xl text-center hover:border-cyber-cyan/40 transition-all duration-500 overflow-hidden"
                        >
                            <div className="relative w-24 h-24 md:w-32 md:h-32 mx-auto mb-6 rounded-full overflow-hidden border-2 border-white/5 group-hover:border-cyber-cyan/40 transition-all duration-500">
                                <Image
                                    src={member.image || '/images/team/placeholder.jpg'}
                                    alt={member.name}
                                    fill
                                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-cyber-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <h3 className="text-lg md:text-xl font-bold text-white mb-1 font-display group-hover:text-cyber-cyan transition-colors">{member.name}</h3>
                            <p className="text-cyber-cyan font-tech text-[10px] md:text-xs uppercase tracking-widest mb-4">{member.role}</p>
                            <p className="text-gray-400 text-xs md:text-sm mb-6 leading-relaxed font-body italic opacity-80 group-hover:opacity-100 transition-opacity">
                                &quot;{member.quote || "Innovating the future of robotics."}&quot;
                            </p>

                            <div className="flex justify-center gap-4 text-gray-500 group-hover:text-white transition-colors">
                                <Github size={18} className="cursor-pointer hover:text-cyber-cyan transition-colors" />
                                <Linkedin size={18} className="cursor-pointer hover:text-cyber-cyan transition-colors" />
                                <Mail size={18} className="cursor-pointer hover:text-cyber-cyan transition-colors" />
                            </div>

                            {/* Decorative scanline effect */}
                            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-cyber-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-30" />
                        </motion.div>
                    ))}
                </motion.div>

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
