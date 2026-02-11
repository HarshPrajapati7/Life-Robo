"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { teamData } from "@/lib/team-data";
import TeamCard from "@/components/ui/TeamCard";

export default function TeamPreview() {
    const leads = teamData.find(s => s.title === "Robotics Club Leads")?.members || [];
    const softwareLead = teamData.find(s => s.title.includes("Software"))?.members.find(m => m.role.includes("Lead"));
    const teamMembers = [...leads, softwareLead].filter((m): m is NonNullable<typeof m> => !!m);

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
                        <p className="text-white/20 font-tech text-[10px] tracking-[0.3em] uppercase mb-3">Team</p>
                        <h2 className="text-2xl md:text-3xl font-black text-white font-display uppercase tracking-tight">
                            Core Members
                        </h2>
                    </div>
                    <Link href="/team" className="group inline-flex items-center gap-2 text-white/30 hover:text-white/60 text-xs uppercase tracking-widest font-tech transition-colors">
                        Full Team <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </motion.div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {teamMembers.map((member, idx) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.06 }}
                        >
                            <TeamCard member={member} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
