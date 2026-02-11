"use client";

import { motion } from "framer-motion";
import { ArrowRight, Target, Users, Bot } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Bot,
    title: "Robotics",
    description: "Autonomous systems for complex environments.",
  },
  {
    icon: Users,
    title: "Community",
    description: "A collective of engineers building the future.",
  },
  {
    icon: Target,
    title: "Excellence",
    description: "Championship ready precision engineering.",
  },
];

export default function AboutSection() {
  return (
    <section className="py-16 md:py-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-blue-400 font-tech text-xs tracking-[0.2em] uppercase mb-3 block glow-text">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white font-display uppercase tracking-tight leading-[0.9]">
              Engineering <br className="hidden md:block"/>
              <span className="text-white/40">The Future</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xs"
          >
            <p className="text-white/40 text-sm leading-relaxed font-body mb-6">
              Bridging theory and reality through relentless innovation at the University of Lucknow.
            </p>
            <Link href="/about" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-blue-400 transition-colors">
              Read More
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border border-white/5 p-6 hover:bg-white/[0.02] hover:border-white/10 transition-colors group"
            >
              <feature.icon className="text-blue-400/80 mb-4 group-hover:text-blue-400 group-hover:scale-110 transition-all duration-300" size={24} />
              <h3 className="text-lg font-bold text-white font-display uppercase tracking-wide mb-2">
                {feature.title}
              </h3>
              <p className="text-white/30 text-sm leading-relaxed font-body">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
