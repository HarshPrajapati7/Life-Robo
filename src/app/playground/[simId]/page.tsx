"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import PlaygroundScene from "@/components/3d/PlaygroundScene";
import SimulationLoader from "@/components/3d/SimulationLoader";
import { telemetry, inputState } from "@/components/3d/Rover";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useProgress } from "@react-three/drei";
import { SIMULATIONS, Simulation } from "@/lib/simulations";

export default function SimulationPage() {
  const params = useParams();
  const router = useRouter();
  const simId = params.simId as string;
  
  const sim = useMemo(() => 
    SIMULATIONS.find(s => s.id === simId) || SIMULATIONS[0], 
  [simId]);

  const [isSceneReady, setIsSceneReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const { progress, total } = useProgress();

  useEffect(() => {
    const handleSceneReady = () => setIsSceneReady(true);
    window.addEventListener('3d-ready', handleSceneReady);
    return () => window.removeEventListener('3d-ready', handleSceneReady);
  }, []);

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [loading]);

  useEffect(() => {
    const isAssetsFinished = total === 0 ? true : progress === 100;
    if (isAssetsFinished && isSceneReady) {
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [progress, total, isSceneReady]);

  return (
    <div className="absolute inset-0 z-[100] bg-[#02040a] font-tech overflow-hidden">
        <div className="h-full w-full relative">
            <PlaygroundScene simulationId={sim.id} />
            
            {!loading && (
                <HUD 
                    onExit={() => router.push("/playground", { scroll: false })} 
                    sim={sim} 
                />
            )}

            <AnimatePresence>
                {loading && (
                    <motion.div 
                        className="absolute inset-0 z-[110]"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <SimulationLoader />
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="scanline opacity-10" />
        </div>
    </div>
  );
}

const HUD = ({ onExit, sim }: { onExit: () => void, sim: Simulation }) => {
  const xRef = useRef<HTMLSpanElement>(null);
  const yRef = useRef<HTMLSpanElement>(null);
  const zRef = useRef<HTMLSpanElement>(null);
  const speedRef = useRef<HTMLSpanElement>(null);
  const distRef = useRef<HTMLSpanElement>(null);
  const fpsRef = useRef<HTMLSpanElement>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let frameId: number;
    let lastTime = performance.now();
    let frames = 0;

    const update = () => {
        const time = performance.now();
        frames++;

        if (time >= lastTime + 1000) {
            if (fpsRef.current) fpsRef.current.textContent = Math.round((frames * 1000) / (time - lastTime)).toString();
            frames = 0;
            lastTime = time;
        }

        if (xRef.current) xRef.current.textContent = telemetry.x.toFixed(1);
        if (yRef.current) yRef.current.textContent = telemetry.y.toFixed(1);
        if (zRef.current) zRef.current.textContent = telemetry.z.toFixed(1);
        if (speedRef.current) speedRef.current.textContent = Math.round(telemetry.speed).toString();
        if (distRef.current) distRef.current.textContent = telemetry.distanceToTarget.toFixed(1);
        
        if (telemetry.targetReached && !complete) {
            setComplete(true);
        }
        
        frameId = requestAnimationFrame(update);
    };
    update();
    return () => cancelAnimationFrame(frameId);
  }, [complete]);

  const setControl = (dir: keyof typeof inputState, active: boolean) => {
    inputState[dir] = active;
  };

  return (
    <>
      <AnimatePresence>
        {complete && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm"
          >
            <div className="bg-black/80 border border-cyber-primary/30 p-10 flex flex-col items-center max-w-sm w-full relative overflow-hidden">
               <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-primary" />
               <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-primary" />
               
               <div className="w-12 h-1 bg-cyber-primary mb-6 animate-pulse" />
               <h2 className="text-3xl font-display font-black text-white mb-1 uppercase tracking-tighter">DRIVE FINISHED</h2>
               <p className="text-cyber-primary text-[10px] font-tech font-bold mb-8 tracking-[0.3em] uppercase">Target Area Reached</p>
               
               <button 
                  onClick={onExit}
                  className="w-full py-4 border border-white/10 hover:border-cyber-primary hover:bg-cyber-primary hover:text-black text-white text-[11px] font-bold uppercase tracking-[0.4em] transition-all duration-300"
               >
                  EXIT DRIVE
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-cyber-primary/40 pointer-events-none" />
      <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-cyber-primary/40 pointer-events-none" />
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-cyber-primary/60 pointer-events-none" />
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-cyber-primary/60 pointer-events-none" />

      <div className="absolute inset-x-0 top-0 pt-4 px-6 flex justify-between items-start pointer-events-none">
        <div className="flex flex-col">
           <div className="flex items-center gap-2">
              <span className="bg-cyber-primary text-black text-[7px] font-black px-1 py-0.5 uppercase tracking-widest">LIVE</span>
              <h1 className="text-sm font-display font-black text-white tracking-[0.1em] uppercase">
                {sim.missionName}
              </h1>
           </div>
        </div>

        <div className="pointer-events-auto">
          <button 
            onClick={onExit}
            className="text-white/40 hover:text-cyber-accent transition-all text-[9px] font-bold uppercase tracking-widest flex items-center gap-2 group"
          >
            <span className="w-1 h-3 bg-white/20 group-hover:bg-cyber-accent transition-all" /> EXIT
          </button>
        </div>
      </div>

      <div className="absolute top-16 left-6 w-48 pointer-events-none">
          <div className="border-l-2 border-cyber-primary/30 pl-3 py-1">
             <div className="text-[8px] font-black text-cyber-primary/60 uppercase tracking-widest mb-1">OBJECTIVE</div>
             <div className="space-y-1">
                {sim.missions.slice(0, 1).map((m) => (
                  <div key={m.id} className="flex gap-2">
                     <div className="text-[9px] text-white/80 font-medium uppercase tracking-tight leading-tight">{m.task}</div>
                  </div>
                ))}
             </div>
          </div>
      </div>

      <div className="absolute top-20 right-6 pointer-events-none">
          <div className="glass-panel px-4 py-2 bg-black/60 border border-white/10 flex items-center gap-4 backdrop-blur-md rounded-md shadow-lg">
               <div className="flex flex-col items-center min-w-[30px]">
                  <span className="text-[6px] font-bold text-cyber-primary/60 uppercase tracking-widest">FPS</span>
                  <span className="text-[10px] font-tech text-cyber-primary tabular-nums"><span ref={fpsRef}>60</span></span>
               </div>
               <div className="h-3 w-px bg-white/10" />
               <div className="flex flex-col items-center min-w-[30px]">
                  <span className="text-[6px] font-bold text-white/30 uppercase tracking-widest">ALT</span>
                  <span className="text-[10px] font-tech text-white tabular-nums"><span ref={yRef}>0.0</span></span>
               </div>
               <div className="h-3 w-px bg-white/10" />
               <div className="flex flex-col items-center min-w-[40px]">
                  <span className="text-[6px] font-black text-cyber-primary uppercase tracking-widest">DIST</span>
                  <span className="text-[11px] font-tech text-cyber-primary tabular-nums font-bold"><span ref={distRef}>00.0</span></span>
               </div>
               <div className="h-3 w-px bg-white/10" />
               <div className="flex flex-col items-center min-w-[30px]">
                  <span className="text-[6px] font-bold text-white/30 uppercase tracking-widest">KPH</span>
                  <span className="text-[10px] font-tech text-white tabular-nums"><span ref={speedRef}>00</span></span>
               </div>
          </div>
      </div>
      
      <MiniMap sim={sim} />

      <div className="absolute bottom-12 left-12 pointer-events-auto scale-90 md:scale-100 origin-bottom-left md:hidden">
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

function MiniMap({ sim }: { sim: Simulation }) {
  const roverRef = useRef<HTMLDivElement>(null);
  const boundary = 75;
  
  useEffect(() => {
     let frameId: number;
     const update = () => {
        if (roverRef.current) {
            const scale = 40 / boundary;
            const x = telemetry.x * scale;
            const y = telemetry.z * scale;
            roverRef.current.style.transform = `translate(${x}px, ${y}px) rotate(${-telemetry.rotation}rad)`;
        }
        frameId = requestAnimationFrame(update);
     }
     update();
     return () => cancelAnimationFrame(frameId);
  }, []);

  const scale = 40 / boundary;
  const tx = sim.targetPos.x * scale;
  const ty = sim.targetPos.z * scale;

  return (
    <div className="absolute bottom-6 right-6 w-28 h-28 bg-black/80 border border-white/20 rounded-full backdrop-blur-md flex items-center justify-center overflow-hidden pointer-events-none shadow-2xl">
        <div className="absolute inset-0 border border-white/10 rounded-full scale-50" />
        <div className="absolute inset-0 border border-white/5 rounded-full scale-90" />
        <div className="absolute w-full h-px bg-white/10" />
        <div className="absolute h-full w-px bg-white/10" />
        <div 
            className="absolute w-1.5 h-1.5 bg-red-500 rounded-full shadow-[0_0_4px_red] animate-pulse z-10" 
            style={{ transform: `translate(${tx}px, ${ty}px)` }}
        />
        <div 
            ref={roverRef}
            className="z-20 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[8px] border-b-cyber-primary origin-bottom"
            style={{ filter: 'drop-shadow(0 0 2px #00f3ff)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-cyber-primary/5 to-transparent animate-spin-slow w-full h-full rounded-full" />
    </div>
  )
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
