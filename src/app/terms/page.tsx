"use client";

import { motion } from "framer-motion";
import { Scale, Users, Cpu, AlertTriangle } from "lucide-react";

export default function TermsPage() {
  const terms = [
    {
      title: "Club Membership",
      icon: Users,
      content: "Membership to LIFE ROBO is subject to university approval. Members are expected to maintain professional conduct and contribute actively to club projects and events."
    },
    {
      title: "Intellectual Property",
      icon: Cpu,
      content: "All codebase, research, and robot designs developed under the LIFE ROBO banner remain the collaborative property of the club and the contributing members, governed by open-source robotics principles."
    },
    {
      title: "Proper Usage",
      icon: Scale,
      content: "The club's equipment, labs, and online platform must be used strictly for educational and innovative purposes. Any unauthorized use or digital exploitation is strictly prohibited."
    },
    {
      title: "Liability Waiver",
      icon: AlertTriangle,
      content: "Robotics involves hardware interaction. While we maintain strict safety protocols, LIFE ROBO is not liable for personal property damage resulting from experimental hardware failure during testing phases."
    }
  ];

  return (
    <main className="min-h-screen p-8 md:p-24 pt-32 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
        >
            <h1 className="text-4xl md:text-6xl font-bold font-display uppercase tracking-widest text-white mb-6">
                Terms of <span className="text-cyber-cyan">Protocol</span>
            </h1>
            <p className="text-gray-400 font-body text-lg">
                Operational Guidelines for LIFE ROBO Members
            </p>
        </motion.div>

        <div className="space-y-12">
            {terms.map((term, idx) => (
                <motion.div 
                    key={term.title}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass-panel p-8 border border-white/10 group hover:border-cyber-cyan/30 transition-colors"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <term.icon className="text-cyber-cyan w-6 h-6" />
                        <h2 className="text-xl font-bold text-white font-display uppercase tracking-wider">{term.title}</h2>
                    </div>
                    <p className="text-gray-400 font-body leading-relaxed pl-10 border-l border-cyber-cyan/20">
                        {term.content}
                    </p>
                </motion.div>
            ))}
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 text-center"
        >
            <p className="text-[10px] text-gray-500 font-tech uppercase tracking-[0.3em] max-w-lg mx-auto">
                By accessing this platform, you agree to abide by the digital and operational protocols of the Robotics Club, University of Lucknow.
            </p>
        </motion.div>
      </div>
    </main>
  );
}
