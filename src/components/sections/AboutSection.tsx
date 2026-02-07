"use client";

import { motion } from "framer-motion";
import { Zap, Globe, Cpu } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Innovation",
    description: "Cutting-edge robotics research and autonomous systems.",
  },
  {
    icon: Globe,
    title: "Community",
    description: "A global network of students and industry experts.",
  },
  {
    icon: Cpu,
    title: "Practice",
    description: "Turning engineering theory into functional prototypes.",
  },
];

export default function AboutSection() {
  return (
    <section className="py-16 border-y border-white/5 bg-transparent relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:items-center">
          <div className="lg:w-1/3">
            <span className="text-cyber-cyan font-tech text-[10px] tracking-[0.4em] uppercase mb-4 block">Purpose</span>
            <h2 className="text-3xl font-display font-black text-white uppercase leading-tight mb-4">
              Engineering <br/> <span className="text-white/40">The Future</span>
            </h2>
            <p className="text-sm text-gray-500 font-light leading-relaxed max-w-sm">
              Bridge the gap between academic theory and real-world application through collaborative robotics.
            </p>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                    <feature.icon size={16} className="text-cyber-cyan" />
                    <h3 className="text-xs font-bold text-white uppercase tracking-widest">{feature.title}</h3>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed font-light">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
