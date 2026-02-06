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
           initial={{ opacity: 0, y: 50 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="text-center mb-16"
        >
          <span className="text-cyber-cyan font-tech text-sm tracking-wider uppercase">Our Mission</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-2 text-white">
            Engineering the Future
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            LIFE ROBO is more than just a club; it&apos;s a launchpad for the next generation of engineers. 
            We bridge the gap between academic curriculum and real-world application through mentorship, 
            competitions, and collaborative projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              className="glass-panel p-8 rounded-xl border border-cyber-primary/20 hover:border-cyber-primary/60 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                  <feature.icon size={64} className="text-cyber-primary stroke-1" />
              </div>
              
              <div className="w-12 h-12 rounded-lg bg-cyber-primary/10 flex items-center justify-center text-cyber-primary mb-6 group-hover:scale-110 transition-transform relative z-10">
                <feature.icon size={24} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyber-primary transition-colors relative z-10">{feature.title}</h3>
              <p className="text-cyber-muted leading-relaxed relative z-10">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
