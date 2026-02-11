"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function BackgroundEffects() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Detect mobile: touch device or narrow viewport
    const mobile = window.innerWidth < 768 || 'ontouchstart' in window;
    setIsMobile(mobile);
  }, []);

  if (!mounted) return null;

  // Mobile: lightweight static background to prevent GPU memory exhaustion
  if (isMobile) {
    return (
      <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#060608]">
        {/* Static glow - top left (no animation, no willChange) */}
        <div
          className="absolute -top-[10%] -left-[10%] w-[50vw] h-[50vw] rounded-full opacity-20 transform-gpu"
          style={{
            background: "radial-gradient(circle, rgba(0,240,255,0.25) 0%, transparent 70%)",
          }}
        />
        {/* Static glow - bottom right */}
        <div
          className="absolute -bottom-[10%] -right-[10%] w-[45vw] h-[45vw] rounded-full opacity-15 transform-gpu"
          style={{
            background: "radial-gradient(circle, rgba(30,58,138,0.35) 0%, transparent 70%)",
          }}
        />
      </div>
    );
  }

  // Desktop: full animated effects
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#060608]">
      {/* 
        1. Ambient Glows 
      */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ willChange: "transform" }}
        className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-cyber-cyan/20 rounded-full blur-[80px] mix-blend-screen transform-gpu"
      />
      
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
          x: [0, -30, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        style={{ willChange: "transform" }}
        className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] bg-blue-900/30 rounded-full blur-[80px] mix-blend-screen transform-gpu"
      />

      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.3, 0.1],
          x: [0, 30, 0],
          y: [0, 30, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        style={{ willChange: "transform" }}
        className="absolute top-[30%] right-[20%] w-[40vw] h-[40vw] bg-cyber-green/10 rounded-full blur-[80px] mix-blend-screen transform-gpu"
      />

      {/* 
        2. Flowing Lines (SVG)
      */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#00f0ff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        
        {/* Wave 1 - Horizontal Drift */}
        <motion.path
          d="M -100 200 Q 400 0 800 400 T 2000 300"
          fill="none"
          stroke="url(#grad1)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: [0, 1, 0],
            opacity: [0, 0.5, 0],
            x: [-50, 0, -50] 
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Wave 2 - Horizontal Flow */}
        <motion.path
          d="M -100 600 Q 500 300 1000 800 T 2200 400"
          fill="none"
          stroke="rgba(0, 240, 255, 0.3)"
          strokeWidth="3"
          initial={{ x: -200 }}
          animate={{ x: 0 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
           style={{ filter: "blur(2px)", willChange: "transform" }}
        />

         {/* Vertical Waves */}
         <motion.path
            d="M 200 -100 Q 300 500 200 1200"
            fill="none"
            stroke="rgba(0, 240, 255, 0.2)"
            strokeWidth="4"
            animate={{ 
              x: [0, 50, 0],
              scaleX: [1, 1.1, 1] 
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{ willChange: "transform" }}
         />
           <motion.path
            d="M 1700 -100 Q 1600 500 1700 1200"
            fill="none"
            stroke="rgba(0, 240, 255, 0.15)"
            strokeWidth="4"
            animate={{ 
              x: [0, -50, 0],
              scaleX: [1, 1.2, 1]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            style={{ willChange: "transform" }}
         />
           <motion.path
            d="M 100 -100 Q 150 500 100 1200"
            fill="none"
            stroke="rgba(0, 255, 157, 0.1)"
            strokeWidth="2"
            animate={{ 
               x: [0, 30, 0],
             }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
            style={{ willChange: "transform" }}
         />
           <motion.path
            d="M 1800 -100 Q 1750 500 1800 1200"
            fill="none"
            stroke="rgba(0, 255, 157, 0.1)"
            strokeWidth="2"
            animate={{ 
               x: [0, -20, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
            style={{ willChange: "transform" }}
         />
      </svg>
    </div>
  );
}
