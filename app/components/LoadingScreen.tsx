"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Terminal, Zap, Bot } from "lucide-react";

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState(0);

  const stages = [
    { icon: <Terminal className="w-6 h-6 text-blue-400" />, text: "Initializing Systems..." },
    { icon: <Cpu className="w-6 h-6 text-indigo-400" />, text: "Loading Core Modules..." },
    { icon: <Zap className="w-6 h-6 text-cyan-400" />, text: "Calibrating Sensors..." },
    { icon: <Bot className="w-6 h-6 text-blue-500" />, text: "Boot Sequence Complete" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        const newProgress = prev + Math.floor(Math.random() * 8) + 2;
        if (newProgress >= 25) setStage(1);
        if (newProgress >= 60) setStage(2);
        if (newProgress >= 90) setStage(3);
        return newProgress > 100 ? 100 : newProgress;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0f] text-white overflow-hidden"
    >
      {/* Tech Grid Background */}
      <div className="absolute inset-0 opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at center, #1a1a2e 0%, transparent 70%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '100% 100%, 30px 30px, 30px 30px' }}>
      </div>

      <div className="relative z-10 w-full max-w-md px-8 flex flex-col items-center">
        {/* Animated Logo/Core */}
        <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
          <motion.div 
            animate={{ rotate: 360 }} 
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-t-2 border-r-2 border-blue-500/50"
          />
          <motion.div 
            animate={{ rotate: -360 }} 
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 rounded-full border-b-2 border-l-2 border-cyan-400/50"
          />
          <motion.div 
            animate={{ scale: [1, 1.1, 1] }} 
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bg-blue-600/20 rounded-full w-16 h-16 blur-xl"
          />
          <Bot className="w-10 h-10 text-white z-10" />
        </div>

        {/* Progress Text */}
        <div className="h-8 mb-4 flex items-center justify-center gap-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={stage}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="flex items-center gap-3 font-mono text-sm tracking-wider"
            >
              {stages[stage].icon}
              <span className="text-gray-300">{stages[stage].text}</span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden relative">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500"
            style={{ width: `${progress}%` }}
            transition={{ type: "tween", ease: "linear", duration: 0.2 }}
          />
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSJ0cmFuc3BhcmVudCI+PC9yZWN0Pgo8cGF0aCBkPSJNMCA4TDggMCJzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4yKSIgc3Ryb2tlLXdpZHRoPSIxIj48L3BhdGg+Cjwvc3ZnPg==')] opacity-50" />
        </div>

        <div className="w-full flex justify-between mt-3 font-mono text-xs text-gray-500">
          <span>SYS.BOOT</span>
          <span>{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
}
