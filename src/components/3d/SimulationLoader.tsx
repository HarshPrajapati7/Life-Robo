"use client";

import { motion } from "framer-motion";
import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export default function SimulationLoader() {
  const { progress, loaded, total } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    const effectiveProgress = total === 0 ? 100 : progress;
    const timer = setInterval(() => {
        setDisplayProgress(prev => {
            if (prev < effectiveProgress) return prev + 1;
            return prev;
        });
    }, total === 0 ? 5 : 15);
    return () => clearInterval(timer);
  }, [progress, total]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#02040a] flex flex-col items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center max-w-md w-full px-6">
        {/* Loading Ring */}
        <div className="relative w-20 h-20 mx-auto mb-10">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-t-2 border-cyber-primary rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-tech text-cyber-primary font-bold">
                {Math.round(displayProgress)}%
            </span>
          </div>
        </div>

        {/* Text Content */}
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
        >
          <h2 className="text-sm font-display font-bold text-white tracking-[0.4em] uppercase mb-4">
            Loading_System
          </h2>
          <div className="space-y-4">
             <div className="w-full bg-white/5 h-1 relative overflow-hidden">
                <motion.div 
                  initial={{ width: "0%" }}
                  animate={{ width: `${displayProgress}%` }}
                  className="absolute top-0 left-0 h-full bg-cyber-primary shadow-[0_0_10px_#00f3ff]"
                />
             </div>
             
             <div className="flex justify-between font-tech text-[10px] uppercase tracking-widest text-cyber-muted">
                <span>Assets: {loaded} / {total}</span>
                <span className="animate-pulse">Active</span>
             </div>
          </div>
        </motion.div>
      </div>
      <div className="scanline opacity-10" />
    </div>
  );
}
