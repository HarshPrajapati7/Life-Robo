"use client";

import { useState, useEffect, useRef } from "react";
import PlaygroundScene from "@/components/3d/PlaygroundScene";
import SimulationLoader from "@/components/3d/SimulationLoader";
import { telemetry, inputState } from "@/components/3d/Rover";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Database, ChevronRight, Maximize2, ChevronUp, ChevronDown, ChevronLeft } from "lucide-react";
import { useProgress } from "@react-three/drei";

export default function PlaygroundPage() {
  const [gameState, setGameState] = useState<"dashboard" | "loading" | "simulation">("dashboard");
  const { progress, total } = useProgress();

  const startSimulation = () => {
    setGameState("loading");
  };

  // Auto-transition when real assets are loaded or if no assets are found (total === 0)
  useEffect(() => {
    const isFinished = total === 0 ? true : progress === 100;
    
    if (gameState === "loading" && isFinished) {
      const timer = setTimeout(() => {
        setGameState("simulation");
      }, 1500); // Small buffer for "Optimization" feel
      return () => clearTimeout(timer);
    }
  }, [progress, total, gameState]);

  return (
    <main className="min-h-[calc(100vh-80px)] w-full bg-[#02040a] relative overflow-hidden flex flex-col items-center">
      <AnimatePresence mode="wait">
        {/* DASHBOARD VIEW */}
        {gameState === "dashboard" && (
          <motion.div 
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex-grow flex flex-col md:flex-row gap-8 max-w-7xl mx-auto w-full px-6 py-12 items-center justify-center relative z-10"
          >
            <div className="flex-grow max-w-xl">
              <div className="flex items-center gap-2 text-cyber-primary mb-4">
                 <div className="w-1.5 h-1.5 bg-cyber-primary animate-ping rounded-full" />
                 <span className="text-xs font-tech tracking-[0.3em] uppercase">Laboratory_Status_Online</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-display font-black text-white leading-none mb-6">
                ROBO<br /><span className="text-cyber-primary">PLAYGROUND</span>
              </h1>
              <p className="text-cyber-muted font-body text-lg mb-10 leading-relaxed max-w-md">
                Interactive playground to test robot controls and movement in a 3D environment.
              </p>

              <button 
                onClick={startSimulation}
                className="group relative px-8 py-5 bg-cyber-primary text-black font-display font-black text-sm tracking-[.25em] overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(0,243,255,0.6)]"
              >
                  <div className="absolute inset-0 bg-white/30 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 skew-x-12" />
                  <span className="relative z-10 flex items-center gap-3">
                      <Maximize2 size={18} /> ENTER_SIMULATION
                  </span>
              </button>
            </div>

            <div className="w-full md:w-96 flex flex-col gap-4">
               <DashboardCard icon={<Cpu size={20} />} title="System" value="Core Engine" status="Ready" />
               <DashboardCard icon={<Database size={20} />} title="Scene" value="Main Sandbox" status="Active" />
            </div>
          </motion.div>
        )}

        {/* LOADING VIEW */}
        {gameState === "loading" && (
          <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
             <SimulationLoader />
          </motion.div>
        )}

        {/* SIMULATION VIEW - FIXED FULL SCREEN */}
        {gameState === "simulation" && (
          <motion.div 
            key="simulation" 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] bg-[#02040a]"
          >
            <div className="h-full w-full relative">
              <PlaygroundScene />
              <HUD onExit={() => setGameState("dashboard")} />
              <div className="scanline opacity-10" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Background for Dashboard */}
      {gameState === "dashboard" && (
        <div className="absolute inset-0 -z-0 opacity-10 bg-cyber-grid pointer-events-none" />
      )}
    </main>
  );
}

function HUD({ onExit }: { onExit: () => void }) {
  const xRef = useRef<HTMLSpanElement>(null);
  const zRef = useRef<HTMLSpanElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);

  // High-performance HUD update loop (Outside React state)
  useEffect(() => {
    let frameId: number;
    const update = () => {
        if (xRef.current) xRef.current.textContent = telemetry.x.toFixed(1);
        if (zRef.current) zRef.current.textContent = telemetry.z.toFixed(1);
        if (speedRef.current) speedRef.current.textContent = Math.round(telemetry.speed).toString();
        frameId = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(frameId);
  }, []);

  const setControl = (dir: keyof typeof inputState, active: boolean) => {
    inputState[dir] = active;
  };

  return (
    <>
      {/* Corner Brackets */}
      <div className="absolute top-6 left-6 w-16 h-16 border-t-2 border-l-2 border-cyber-primary/40 pointer-events-none" />
      <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-cyber-primary/40 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-cyber-primary/40 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-16 h-16 border-b-2 border-r-2 border-cyber-primary/40 pointer-events-none" />

      {/* Master Top Bar */}
      <div className="absolute inset-x-0 top-0 pt-6 px-6 md:pt-10 md:px-12 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl md:text-3xl font-display font-black text-white tracking-[0.2em] uppercase">
            PLAYGROUND <span className="text-cyber-primary text-sm md:text-xl ml-2">LR-01</span>
          </h1>
        </div>

        {/* Exit Button - Top Right Always Accessible */}
        <div className="pointer-events-auto">
          <button 
            onClick={onExit}
            className="glass-panel px-4 py-2 md:px-8 md:py-3 border-cyber-accent text-cyber-accent hover:bg-cyber-accent hover:text-white transition-all text-[10px] md:text-xs font-bold uppercase tracking-widest backdrop-blur-md"
          >
            EXIT_SIM
          </button>
        </div>
      </div>

      {/* Telemetry Overlay - Top Center-ish or Bottom-ish */}
      <div className="absolute top-20 md:top-auto md:bottom-12 left-1/2 -translate-x-1/2 pointer-events-none w-full max-w-xs md:max-w-md px-6">
          <div className="glass-panel px-4 py-3 md:px-8 md:py-4 bg-black/60 border-cyber-primary/30 flex justify-between items-center backdrop-blur-xl">
               <div className="flex flex-col">
                  <span className="text-[8px] md:text-[10px] font-tech text-cyber-muted uppercase tracking-tighter">POS_X</span>
                  <span className="text-sm md:text-xl font-tech text-white tabular-nums"><span ref={xRef}>0.0</span></span>
               </div>
               <div className="flex flex-col">
                  <span className="text-[8px] md:text-[10px] font-tech text-cyber-muted uppercase tracking-tighter">POS_Z</span>
                  <span className="text-sm md:text-xl font-tech text-white tabular-nums"><span ref={zRef}>0.0</span></span>
               </div>
               <div className="flex flex-col text-right">
                  <span className="text-[8px] md:text-[10px] font-tech text-cyber-muted uppercase tracking-tighter">VELOCITY</span>
                  <span className="text-sm md:text-xl font-tech text-cyber-primary tabular-nums"><span ref={speedRef}>000</span></span>
               </div>
          </div>
      </div>
      
      {/* Visual Log - Hiddden on Mobile */}
      <div className="absolute bottom-12 right-12 w-64 pointer-events-none hidden md:block">
         <div className="bg-black/80 border-l border-cyber-primary/20 p-5 font-tech text-[10px] text-white/50 space-y-2 backdrop-blur-md">
             <div className="flex justify-between"><span>System Status</span> <span className="text-green-400">OK</span></div>
             <div className="flex justify-between"><span>Controls</span> <span>WASD / TOUCH</span></div>
             <div className="flex justify-between"><span>Camera</span> <span>Orbit</span></div>
         </div>
      </div>

      {/* MOBILE / INTERACTIVE CONTROLS */}
      <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 pointer-events-auto scale-90 md:scale-100 origin-bottom-left">
          <div className="flex flex-col items-center gap-2">
            <ControlButton 
                icon={<ChevronUp size={24} />} 
                onStart={() => setControl("forward", true)} 
                onEnd={() => setControl("forward", false)} 
            />
            <div className="flex gap-2">
                <ControlButton 
                    icon={<ChevronLeft size={24} />} 
                    onStart={() => setControl("left", true)} 
                    onEnd={() => setControl("left", false)} 
                />
                <ControlButton 
                    icon={<ChevronDown size={24} />} 
                    onStart={() => setControl("backward", true)} 
                    onEnd={() => setControl("backward", false)} 
                />
                <ControlButton 
                    icon={<ChevronRight size={24} />} 
                    onStart={() => setControl("right", true)} 
                    onEnd={() => setControl("right", false)} 
                />
            </div>
          </div>
      </div>
    </>
  );
}

function ControlButton({ icon, onStart, onEnd }: { icon: React.ReactNode, onStart: () => void, onEnd: () => void }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9, backgroundColor: "rgba(0, 243, 255, 0.4)" }}
      onMouseDown={onStart}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
      onTouchStart={(e) => { e.preventDefault(); onStart(); }}
      onTouchEnd={(e) => { e.preventDefault(); onEnd(); }}
      className="w-14 h-14 flex items-center justify-center bg-white/10 border border-white/20 rounded-xl text-white backdrop-blur-md select-none touch-none shadow-[0_4px_0_rgba(255,255,255,0.05)] active:translate-y-1 active:shadow-none transition-all"
    >
      {icon}
    </motion.button>
  );
}

function DashboardCard({ icon, title, value, status }: { icon: React.ReactNode, title: string, value: string, status: string }) {
  return (
    <div className="glass-panel p-6 border-white/10 hover:border-cyber-primary transition-all cursor-default group backdrop-blur-md bg-white/5">
      <div className="flex items-center gap-3 mb-3 text-cyber-muted">
         <div className="p-2 bg-white/5 rounded-lg group-hover:text-cyber-primary group-hover:bg-cyber-primary/10 transition-all">{icon}</div>
         <span className="text-[10px] font-tech uppercase tracking-[0.2em]">{title}</span>
      </div>
      <div className="text-base font-display font-black text-white mb-2 uppercase tracking-wide">{value}</div>
      <div className="text-[9px] font-tech text-green-400/70 border border-green-400/20 px-2.5 py-1 w-fit rounded uppercase flex items-center gap-1.5">
        <span className="w-1 h-1 bg-green-400 rounded-full" /> {status}
      </div>
    </div>
  );
}
