"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import PlaygroundScene from "@/components/3d/PlaygroundScene";
import SimulationLoader from "@/components/3d/SimulationLoader";
import { telemetry, inputState } from "@/components/3d/Rover";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
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
    const isAssetsFinished = total === 0 ? true : progress === 100;
    if (isAssetsFinished && isSceneReady) {
      const timer = setTimeout(() => setLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [progress, total, isSceneReady]);

  const [currentGesture, setCurrentGesture] = useState("Idle");

  useEffect(() => {
    if (sim.id !== 'humanoid') return;
    const handleKeyDown = (e: KeyboardEvent) => {
        const key = parseInt(e.key);
        if (!isNaN(key) && key > 0 && key <= GESTURES.length) {
            setCurrentGesture(GESTURES[key - 1]);
        }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sim.id]);

  return (
    <div className="absolute inset-0 z-[100] bg-[#060608] font-tech overflow-hidden select-none">
        <div className="h-full w-full relative">
            <PlaygroundScene simulationId={sim.id} gesture={currentGesture} />
            
            {!loading && (
                <HUD 
                    onExit={() => router.push("/playground/simulations", { scroll: false })} 
                    sim={sim} 
                    currentGesture={currentGesture}
                    setGesture={setCurrentGesture}
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
        </div>
    </div>
  );
}

const GESTURES = ["Idle", "Hi", "Dance", "ThumbsUp", "Punch", "Running", "Jump"];

const HumanoidHUD = ({ currentGesture, setGesture }: { currentGesture: string, setGesture: (g: string) => void }) => (
    <div className="absolute bottom-10 left-0 right-0 px-4 pointer-events-none flex justify-center">
        <div className="pointer-events-auto bg-black/80 rounded-full border border-white/10 p-1.5 flex gap-1 shadow-2xl overflow-x-auto max-w-full">
            {GESTURES.map((g) => (
            <button
                key={g}
                onClick={() => setGesture(g)}
                className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase transition-all tracking-wider whitespace-nowrap ${
                currentGesture === g 
                    ? "bg-white text-black shadow-lg" 
                    : "text-white/50 hover:text-white hover:bg-white/10"
                }`}
            >
                {g}
            </button>
            ))}
        </div>
    </div>
);

const HUD = ({ onExit, sim, currentGesture, setGesture }: { onExit: () => void, sim: Simulation, currentGesture?: string, setGesture?: (g: string) => void }) => {
  const speedRef = useRef<HTMLSpanElement>(null);
  const distRef = useRef<HTMLSpanElement>(null);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    let frameId: number;
    const update = () => {
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <div className="bg-[#0a0a0a] border border-white/10 p-12 text-center max-w-sm w-full">
               <h2 className="text-2xl font-display font-black text-white mb-2 uppercase tracking-tight">Mission Complete</h2>
               <p className="text-white/40 text-xs font-tech uppercase tracking-widest mb-8">Target destination reached</p>
               
               <button 
                  onClick={onExit}
                  className="w-full py-3.5 bg-white text-black font-bold font-display text-sm uppercase tracking-wider hover:bg-white/90 transition-all"
               >
                  Return to Base
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
             <button 
                onClick={onExit}
                className="group flex items-center gap-3 text-white/40 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest font-tech"
             >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Exit
             </button>
        </div>

        <div className="flex flex-col items-end">
             <h1 className="text-sm font-display font-black text-white uppercase tracking-wider">{sim.name}</h1>
             <p className="text-[10px] text-white/30 uppercase tracking-widest font-tech mt-1">{sim.missionName}</p>
        </div>
      </div>

      {sim.id === 'humanoid' ? <HumanoidHUD currentGesture={currentGesture || 'Idle'} setGesture={setGesture || (() => {})} /> : (
        <>
            {/* Stats Panel */}
            <div className="absolute top-20 right-6 pointer-events-none">
                <div className="bg-black/60 border border-white/10 rounded-lg p-4 flex gap-6 backdrop-blur-md">
                    <div className="flex flex-col items-center min-w-[40px]">
                        <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-1">Speed</span>
                        <span className="text-sm font-mono font-bold text-white tabular-nums"><span ref={speedRef}>00</span> <span className="text-[9px] text-white/30">km/h</span></span>
                    </div>
                    <div className="w-px bg-white/10" />
                    <div className="flex flex-col items-center min-w-[40px]">
                        <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest mb-1">Dist</span>
                        <span className="text-sm font-mono font-bold text-white tabular-nums"><span ref={distRef}>0.0</span> <span className="text-[9px] text-white/30">m</span></span>
                    </div>
                </div>
            </div>

            {/* Mobile Controls */}
            <div className="absolute bottom-12 left-0 right-0 flex justify-center pointer-events-auto md:hidden pb-safe">
                <div className="bg-black/40 backdrop-blur-md p-4 rounded-3xl border border-white/5">
                    <div className="flex flex-col items-center gap-3">
                        <ControlButton 
                            icon={<ChevronUp size={24} />} 
                            onStart={() => setControl("forward", true)} 
                            onEnd={() => setControl("forward", false)} 
                        />
                        <div className="flex gap-3">
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
            </div>
        </>
      )}
    </>
  );
}

function ControlButton({ icon, onStart, onEnd }: { icon: React.ReactNode, onStart: () => void, onEnd: () => void }) {
  return (
    <button
      onMouseDown={onStart}
      onMouseUp={onEnd}
      onMouseLeave={onEnd}
      onTouchStart={(e) => { e.preventDefault(); onStart(); }}
      onTouchEnd={(e) => { e.preventDefault(); onEnd(); }}
      className="w-14 h-14 flex items-center justify-center bg-white/10 border border-white/10 rounded-2xl text-white active:bg-white active:text-black transition-all"
    >
      {icon}
    </button>
  );
}
