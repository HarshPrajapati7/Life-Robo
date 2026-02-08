"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal, ChevronRight } from "lucide-react";
import SimulationCard from "@/components/ui/SimulationCard";
import { SIMULATIONS } from "@/lib/simulations";

export default function PlaygroundSection() {
  const humanoidSim = SIMULATIONS.find(s => s.id === 'humanoid') || SIMULATIONS[0];
  return (
    <section className="py-24 relative overflow-hidden bg-cyber-dark">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          {/* Left: Content */}
          <div className="flex-grow max-w-2xl order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-cyber-cyan mb-6"
            >
              <Terminal size={16} />
              <span className="text-xs font-tech tracking-[0.4em] uppercase">Simulation_Environment</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-white leading-tight mb-8 uppercase"
            >
              3D<br />
              <span className="text-cyber-cyan">PLAYGROUND</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-gray-400 text-base md:text-lg font-body mb-10 leading-relaxed max-w-xl"
            >
              Explore our 3D Robotics Lab. Test rovers and physics in a real-time simulation environment.
            </motion.p>



            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-6 sm:items-center"
            >
              <Link href="/playground" className="group flex items-center gap-4 text-white font-display font-bold text-sm tracking-widest uppercase py-4 px-1 border-b-2 border-transparent hover:border-cyber-cyan transition-all w-fit">
                Enter Playground <ChevronRight className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              
              <Link href="/playground/humanoid" className="group flex items-center gap-4 text-white/80 hover:text-cyber-pink font-display font-bold text-sm tracking-widest uppercase py-4 px-1 border-b-2 border-transparent hover:border-cyber-pink transition-all w-fit">
                Enter Humanoid Robot <ChevronRight className="group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Visual Preview Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full lg:w-[600px] shrink-0 lg:mt-0 order-1 lg:order-2"
          >
            {/* Visual Preview Card matching Playground Page Style */}
            <SimulationCard 
              sim={humanoidSim} 
              isActive={true} 
            />


          </motion.div>

        </div>
      </div>
    </section>
  );
}


