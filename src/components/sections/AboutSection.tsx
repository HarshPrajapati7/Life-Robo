"use client";

import { motion } from "framer-motion";
import { Zap, Globe, Cpu } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Innovation First",
    description: "Pushing the boundaries of what's possible with cutting-edge robotics research and development.",
  },
  {
    icon: Globe,
    title: "Global Community",
    description: "Connecting students with industry experts and peers worldwide to foster collaboration.",
  },
  {
    icon: Cpu,
    title: "Hands-on Learning",
    description: "Practical workshops and projects that turn theoretical knowledge into tangible skills.",
  },
];

export default function AboutSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent-blue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-cyber-cyan font-tech text-xs md:text-sm tracking-widest uppercase">Our Mission</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 text-white font-display uppercase tracking-tight">
            Engineering the Future
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed font-body">
            LIFE ROBO is more than just a club; it&apos;s a launchpad for the next generation of engineers.
            We bridge the gap between academic curriculum and real-world application through mentorship,
            competitions, and collaborative projects.
          </p>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
              }
            }
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.98 },
                show: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="glass-panel p-8 rounded-xl border border-white/5 hover:border-cyber-primary/40 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                <feature.icon size={64} className="text-cyber-primary stroke-1" />
              </div>

              <div className="w-12 h-12 rounded-lg bg-cyber-primary/10 flex items-center justify-center text-cyber-primary mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyber-primary transition-colors relative z-10">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed relative z-10 font-body text-sm md:text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
