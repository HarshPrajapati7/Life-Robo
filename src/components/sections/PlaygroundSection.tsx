"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Globe, Rocket, Moon, ArrowRight } from "lucide-react";
import { SIMULATIONS, Simulation } from "@/lib/simulations";

const SIM_ICONS: Record<string, React.ElementType> = {
  earth: Globe,
  mars: Rocket,
  moon: Moon,
};

export default function PlaygroundSection() {
  return (
    <section className="py-20 relative bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <span className="text-cyber-cyan font-tech text-[10px] tracking-[0.4em] uppercase mb-2 block">Simulations</span>
            <h2 className="text-2xl font-display font-black text-white uppercase tracking-tight">
              Active <span className="text-white/40">Environments</span>
            </h2>
          </div>
          <Link href="/playground" className="group flex items-center gap-2 text-white/50 hover:text-white transition-colors">
            <span className="text-[10px] font-tech uppercase tracking-widest">View All</span>
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SIMULATIONS.map((sim, index) => (
            <SimCard key={sim.id} sim={sim} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SimCard({ sim, index }: { sim: Simulation; index: number }) {
  const Icon = SIM_ICONS[sim.id];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/playground/${sim.id}`} className="group block">
        <div className="p-6 bg-white/[0.02] border border-white/5 hover:border-cyber-cyan/30 transition-all duration-300 relative overflow-hidden">
           <div className="flex items-start justify-between mb-4">
              <div 
                className="w-8 h-8 flex items-center justify-center bg-white/5 rounded-sm"
                style={{ color: sim.color }}
              >
                 {Icon && <Icon size={16} />}
              </div>
              <span className="text-[8px] font-tech text-white/20 uppercase tracking-widest">MT-{index}</span>
           </div>

           <h3 className="text-lg font-display font-black text-white uppercase mb-1">{sim.name}</h3>
           <p className="text-[11px] text-gray-500 font-light mb-4 line-clamp-1">{sim.description}</p>
           
           <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-[9px] font-tech text-cyber-cyan uppercase tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center gap-2">
                Launch <ArrowRight size={10} />
              </span>
              <div className="flex gap-1">
                 <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sim.color }} />
                 <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                 <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
              </div>
           </div>
        </div>
      </Link>
    </motion.div>
  );
}
