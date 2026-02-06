"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      title: "Data Collection",
      icon: Eye,
      content: "We collect minimal personal information necessary for club registration and event coordination. This includes names, university IDs, branch of study, and contact details provided during registration."
    },
    {
      title: "Information Usage",
      icon: Lock,
      content: "Your data is used solely for identifying club members, managing project teams, and communicating about upcoming workshops, seminars, and competitions organized by LIFE ROBO."
    },
    {
      title: "Data Security",
      icon: Shield,
      content: "We implement industry-standard security protocols to protect your information. Your account credentials and personal data are stored in secure environments accessible only to authorized club leads."
    },
    {
      title: "Cookies & Tracking",
      icon: FileText,
      content: "Our platform uses essential session cookies to keep you logged into the member area. We do not use third-party tracking pixels or sell your data to any external marketing agencies."
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
                Privacy <span className="text-cyber-cyan">Protocol</span>
            </h1>
            <p className="text-gray-400 font-body text-lg">
                Last Updated: February 2026 | Version: 2.0.4
            </p>
        </motion.div>

        <div className="space-y-12">
            {sections.map((section, idx) => (
                <motion.div 
                    key={section.title}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="glass-panel p-8 border border-white/10 group hover:border-cyber-cyan/30 transition-colors"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <section.icon className="text-cyber-cyan w-6 h-6" />
                        <h2 className="text-xl font-bold text-white font-display uppercase tracking-wider">{section.title}</h2>
                    </div>
                    <p className="text-gray-400 font-body leading-relaxed pl-10 border-l border-cyber-cyan/20">
                        {section.content}
                    </p>
                </motion.div>
            ))}
        </div>

        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-20 p-8 border border-cyber-cyan/10 bg-cyber-cyan/5 text-center"
        >
            <p className="text-sm font-tech text-cyber-cyan uppercase tracking-[0.2em]">
                Questions regarding data integrity should be directed to the club command center.
            </p>
        </motion.div>
      </div>
    </main>
  );
}
