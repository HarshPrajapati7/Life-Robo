"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SimulationCard from "@/components/ui/SimulationCard";
import { SIMULATIONS } from "@/lib/simulations";

export default function PlaygroundSection() {
  const humanoidSim = SIMULATIONS.find(s => s.id === 'humanoid') || SIMULATIONS[0];
  const roverSim = SIMULATIONS.find(s => s.id !== 'humanoid') || SIMULATIONS[1];

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
            <p className="text-white/20 font-tech text-[10px] tracking-[0.3em] uppercase mb-3">Playground</p>
            <h2 className="text-2xl md:text-3xl font-display font-black text-white leading-tight uppercase tracking-tight">
              3D Simulations
            </h2>
          </div>
          <Link href="/playground" className="group inline-flex items-center gap-2 text-white/30 hover:text-white/60 text-xs uppercase tracking-widest font-tech transition-colors">
            All Tools <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <SimulationCard sim={humanoidSim} isActive={true} />
          </motion.div>
          {roverSim && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <SimulationCard sim={roverSim} isActive={false} />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
