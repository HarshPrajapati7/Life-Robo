"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { SIMULATIONS, Simulation } from "@/lib/simulations";
import SimulationCard from "@/components/ui/SimulationCard";

export default function PlaygroundPage() {
  const router = useRouter();
  const [selectedSim, setSelectedSim] = useState<Simulation>(SIMULATIONS.find(s => s.id === 'humanoid') || SIMULATIONS[0]);
  const [currentTime, setCurrentTime] = useState<string>("");

  const startSimulation = (sim: Simulation) => {
    router.push(`/playground/${sim.id}`, { scroll: false });
  };

  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString());
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        startSimulation(selectedSim);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedSim, router]);

  const rovers = SIMULATIONS.filter(s => s.id !== 'humanoid');
  const humanoids = SIMULATIONS.filter(s => s.id === 'humanoid');

  return (
    <main className="min-h-[calc(100vh-80px)] w-full bg-[#02040a] relative overflow-hidden flex flex-col items-center font-tech">
      <motion.div 
        key="dashboard"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-grow flex flex-col gap-8 max-w-6xl mx-auto w-full px-6 py-12 relative z-10"
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-4 border-b border-white/5 pb-8">
          <div>
            <span className="text-cyber-primary text-[10px] font-black uppercase tracking-[0.4em] mb-2 block">SIM_ARENA</span>
            <h1 className="text-4xl font-display font-black text-white uppercase tracking-tight">
              SIMULATION SELECT
            </h1>
          </div>
        </div>

        <div className="space-y-8">
            <div>
                <h2 className="text-cyber-accent text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyber-accent" /> Humanoid Labs
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <h2 className="text-cyber-primary text-xs font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyber-primary" /> Rover Missions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

        <div className="mt-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="flex items-center gap-6">
              <DashboardMiniStat label="BASE" value="INDIA_HO" />
              <DashboardMiniStat label="LINK" value="ACTIVE" />
              <DashboardMiniStat label="TIME" value={currentTime || "--:--:--"} />
           </div>
           <div className="text-[10px] font-tech text-white/20 uppercase tracking-[0.2em]">
             Select a simulation to begin operations.
           </div>
        </div>
      </motion.div>

      <div className="absolute inset-0 -z-0 opacity-10 bg-cyber-grid pointer-events-none" />
    </main>
  );
}

function DashboardMiniStat({ label, value }: { label: string, value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-[9px] font-bold text-white/20 uppercase tracking-tighter">{label}</span>
      <span className="text-[11px] font-bold text-white/60 tracking-widest uppercase">{value}</span>
    </div>
  );
}
