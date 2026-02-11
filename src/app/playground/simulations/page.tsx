"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SIMULATIONS, Simulation } from "@/lib/simulations";
import SimulationCard from "@/components/ui/SimulationCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SimulationsPage() {
  const router = useRouter();
  const [selectedSim, setSelectedSim] = useState<Simulation>(SIMULATIONS.find(s => s.id === 'humanoid') || SIMULATIONS[0]);

  const startSimulation = useCallback((sim: Simulation) => {
    router.push(`/playground/${sim.id}`, { scroll: false });
  }, [router]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        startSimulation(selectedSim);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSim, startSimulation]);

  const rovers = SIMULATIONS.filter(s => s.id !== 'humanoid');
  const humanoids = SIMULATIONS.filter(s => s.id === 'humanoid');

  return (
    <main className="min-h-screen w-full bg-[#060608] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
             <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
             >
              <Link href="/playground" className="group inline-flex items-center gap-2 text-white/30 hover:text-white/60 text-[10px] uppercase tracking-widest font-tech transition-colors mb-4">
                <ArrowLeft size={12} className="group-hover:-translate-x-1 transition-transform" /> Back to Hub
              </Link>
              <h1 className="text-3xl md:text-5xl font-display font-black text-white uppercase tracking-tight mb-2">
                Simulations
              </h1>
              <p className="text-white/30 text-sm max-w-lg">
                Physics-based environments for testing robotics code.
              </p>
            </motion.div>
        </div>

        {/* Simulation Grid */}
        <div className="space-y-16">
          <div>
            <h2 className="text-[10px] text-white/20 font-bold uppercase tracking-[0.3em] mb-6 font-tech pl-1 border-l-2 border-white/10 ml-0.5">Humanoid Labs</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {humanoids.map((sim) => (
                <SimulationCard 
                  key={sim.id} 
                  sim={sim} 
                  isActive={selectedSim.id === sim.id}
                  onSelect={() => setSelectedSim(sim)}
                  onStart={() => startSimulation(sim)}
                />
              ))}
            </div>
          </div>

          <div>
             <h2 className="text-[10px] text-white/20 font-bold uppercase tracking-[0.3em] mb-6 font-tech pl-1 border-l-2 border-white/10 ml-0.5">Rover Missions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {rovers.map((sim) => (
                <SimulationCard 
                  key={sim.id} 
                  sim={sim} 
                  isActive={selectedSim.id === sim.id}
                  onSelect={() => setSelectedSim(sim)}
                  onStart={() => startSimulation(sim)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
