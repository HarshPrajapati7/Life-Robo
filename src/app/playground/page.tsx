"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Activity, Zap } from "lucide-react";
import { SIMULATIONS, Simulation } from "@/lib/simulations";

export default function PlaygroundPage() {
  const router = useRouter();
  const [selectedSim, setSelectedSim] = useState<Simulation>(SIMULATIONS[0]);
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
              SELECT WORLD
            </h1>
          </div>

          <div className="hidden md:flex gap-4">
            <DashboardStat icon={<Activity size={16} />} label="SYSTEM" value="STABLE" />
            <DashboardStat icon={<Zap size={16} />} label="ENGINE" value="READY" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
           {SIMULATIONS.map((sim) => (
             <SimulationCard 
                key={sim.id} 
                sim={sim} 
                isActive={selectedSim.id === sim.id}
                onSelect={() => setSelectedSim(sim)}
                onStart={() => startSimulation(sim)}
             />
           ))}
        </div>

        <div className="mt-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="flex items-center gap-6">
              <DashboardMiniStat label="BASE" value="INDIA_HO" />
              <DashboardMiniStat label="LINK" value="ACTIVE" />
              <DashboardMiniStat label="TIME" value={currentTime || "--:--:--"} />
           </div>
           <div className="text-[10px] font-tech text-white/20 uppercase tracking-[0.2em]">
             Select a world to begin driving.
           </div>
        </div>
      </motion.div>

      <div className="absolute inset-0 -z-0 opacity-10 bg-cyber-grid pointer-events-none" />
    </main>
  );
}

function SimulationCard({ sim, isActive, onSelect, onStart }: { sim: Simulation, isActive: boolean, onSelect: () => void, onStart: () => void }) {
  return (
    <div 
      onClick={onSelect}
      className={`group relative flex flex-col md:flex-row h-full border transition-all cursor-pointer overflow-hidden ${
        isActive 
          ? "bg-white/[0.04] border-cyber-primary shadow-[0_0_40px_rgba(0,243,255,0.15)]" 
          : "bg-white/[0.01] border-white/10 hover:border-white/20"
      }`}
    >
      <div className="flex-grow p-5 flex flex-col justify-between">
        <div className="flex justify-between items-start">
           <div className="flex flex-col">
              <span className="text-[8px] font-bold text-cyber-muted uppercase tracking-widest">{sim.missionName}</span>
              <h3 className="text-xl font-display font-black text-white uppercase">{sim.name}</h3>
              <p className="text-[10px] text-white/40 font-tech uppercase mt-1">
                {sim.missions[0].task}
              </p>
           </div>
           <button 
              onClick={(e) => { e.stopPropagation(); onStart(); }}
              className={`py-2 px-4 text-[9px] font-tech font-bold uppercase tracking-widest transition-all ${
                isActive ? "bg-cyber-primary text-black" : "bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              START
            </button>
        </div>

        <div className="flex justify-between items-center mt-4 border-t border-white/5 pt-4">
           <p className="text-[10px] text-white/50 font-tech uppercase line-clamp-1 flex-grow pr-4">
              {sim.description}
           </p>
           <div className={`px-2 py-0.5 text-[7px] font-bold uppercase tracking-widest border shrink-0 ${
             sim.difficulty === 'Critical' ? "border-red-500/30 text-red-500" : "border-green-500/30 text-green-500"
           }`}>
             {sim.difficulty}
           </div>
        </div>
      </div>

      {isActive && (
        <motion.div 
          layoutId="active-indicator"
          className="absolute inset-0 border-2 border-cyber-primary pointer-events-none"
        />
      )}
    </div>
  );
}

function DashboardStat({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-center gap-4 bg-white/[0.03] border border-white/5 px-6 py-4 rounded">
      <div className="text-cyber-primary scale-75">{icon}</div>
      <div className="flex flex-col">
        <span className="text-[8px] font-bold text-white/30 uppercase tracking-tighter">{label}</span>
        <span className="text-xs font-display font-black text-white">{value}</span>
      </div>
    </div>
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
