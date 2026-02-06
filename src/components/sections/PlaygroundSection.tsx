"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Terminal, Cpu, Move, ShieldCheck, ChevronRight } from "lucide-react";

export default function PlaygroundSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-cyber-dark">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left: Content */}
          <div className="flex-grow max-w-2xl">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-display font-black text-white leading-tight mb-8 uppercase"
            >
              VIRTUAL<br />
              <span className="text-cyber-cyan">SANDBOX</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg font-body mb-10 leading-relaxed max-w-xl"
            >
              Enter our interactive 3D laboratory. Test your robotics logic, 
              control virtual rovers, and experiment with physics in a 
              zero-latency browser environment.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <FeatureItem 
                icon={<Cpu size={20} className="text-cyber-cyan" />} 
                title="Physics Core" 
                desc="Real-time Rapier-3D integration" 
              />
              <FeatureItem 
                icon={<Move size={20} className="text-cyber-secondary" />} 
                title="Full Control" 
                desc="Kinematic rover drive system" 
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link href="/playground" className="group flex items-center gap-4 text-white font-display font-bold text-sm tracking-widest uppercase py-4 px-1 border-b-2 border-transparent hover:border-cyber-cyan transition-all w-fit">
                Enter Playground <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Right: Visual Preview Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full lg:w-[500px] shrink-0"
          >
            <div className="glass-panel p-2 relative group cursor-pointer overflow-hidden rounded-xl border-cyber-cyan/20">
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-50 z-20" />
              
              {/* Fake UI Overlay */}
              <div className="absolute inset-0 z-10 p-6 flex flex-col justify-between pointer-events-none group-hover:bg-cyber-cyan/5 transition-colors duration-500">
                <div className="flex justify-between items-start">
                   <div className="bg-black/80 backdrop-blur-md px-3 py-1 border-l-2 border-cyber-cyan">
                      <span className="text-[8px] font-tech text-cyan-400 uppercase tracking-widest">LR_SANDBOX_V2</span>
                   </div>
                   <div className="bg-black/80 backdrop-blur-md p-1">
                      <ShieldCheck size={14} className="text-green-500" />
                   </div>
                </div>
                
                <div className="w-12 h-12 rounded-full border border-cyber-cyan/30 flex items-center justify-center bg-black/40 group-hover:scale-110 transition-transform">
                    <div className="w-8 h-8 rounded-full border-t-2 border-cyber-cyan animate-spin" />
                </div>
              </div>

              {/* Image Preview */}
              <div className="relative aspect-video bg-[#050505] overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-cyber-grid opacity-20" />
                  {/* Procedurally generated rover silhouette/wireframe feel */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-16 bg-cyber-cyan/10 border border-cyber-cyan shadow-[0_0_30px_rgba(0,243,255,0.2)] rounded relative">
                       <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-4 h-8 bg-cyber-cyan/20 border-x border-cyber-cyan/40" />
                       <div className="absolute bottom-0 left-0 w-full h-1 bg-cyber-cyan/40" />
                    </div>
                  </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center gap-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-1 w-8 bg-white/5 rounded-full overflow-hidden">
                   <motion.div 
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                    className="h-full w-full bg-cyber-cyan/40"
                   />
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function FeatureItem({ icon, title, desc }: { icon: any, title: string, desc: string }) {
  return (
    <div className="flex gap-4 p-4 hover:bg-white/5 transition-colors border-l border-white/5 hover:border-cyber-primary/20">
      <div className="shrink-0">{icon}</div>
      <div>
        <h4 className="text-white font-display text-sm uppercase tracking-wide mb-1">{title}</h4>
        <p className="text-[11px] font-tech text-cyber-muted uppercase tracking-tighter">{desc}</p>
      </div>
    </div>
  );
}
