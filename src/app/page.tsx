"use client";



"use client";

import HeroScene from "@/components/3d/HeroScene";
import AboutSection from "@/components/sections/AboutSection";
import TeamPreview from "@/components/sections/TeamPreview";
import EventsPreview from "@/components/sections/EventsPreview";
import GalleryPreview from "@/components/sections/GalleryPreview";
import PlaygroundSection from "@/components/sections/PlaygroundSection";
import { motion, useScroll, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowDown, Cpu, Activity, Zap } from "lucide-react";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="min-h-screen relative overflow-hidden">
        {/* Progress Bar with Glitch Color */}
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-cyber-cyan origin-left z-50 mix-blend-exclusion"
            style={{ scaleX }}
        />

      {/* 3D Background - Fixed */}
      <div className="fixed inset-0 z-0 opacity-40 grayscale-[50%] contrast-125">
          <HeroScene />
      </div>
      
      {/* Hero Content */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 text-center">
        
        <div className="absolute top-24 right-8 hidden md:block opacity-50 text-white">
             <Activity className="animate-pulse" />
        </div>
        

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.8 }}
           className="relative mb-8"
        >
            <h1 
                data-text="LIFE ROBO"
                className="text-6xl md:text-[9rem] font-bold text-[#f5f5f7] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] tracking-tighter relative z-10 font-display uppercase leading-none hover-glitch cursor-default"
            >
            LIFE ROBO
            </h1>
            <div className="absolute -inset-4 border-x border-cyber-cyan/30 scale-y-110 opacity-30"></div>
            
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 text-cyber-cyan font-tech text-[10px] md:text-sm tracking-[0.05em] uppercase w-full justify-center whitespace-nowrap">
                <span>UNIVERSITY OF LUCKNOW</span>
                <span className="w-1 h-3 bg-cyber-cyan/30"></span>
                <span>OFFICIAL ROBOTICS CLUB</span>
            </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-12 text-lg md:text-xl text-gray-400 max-w-2xl font-light tracking-wide font-body border-l-2 border-cyber-cyan pl-6 text-left"
        >
          <span className="text-cyber-cyan font-bold">L.I.F.E.</span> — Learn and Innovation in the Field of Engineering.
          <br/>
          A community of students passionate about robotics, automation, and building the future.
        </motion.p>
        
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-16 flex flex-col md:flex-row gap-6"
        >
             <Link href="/playground">
                <button className="relative px-10 py-4 group overflow-hidden bg-cyber-cyan text-black font-bold text-lg font-display uppercase tracking-widest clip-path-polygon">
                    <span className="relative z-10 flex items-center gap-2">
                        <Cpu size={20} /> Open Playground
                    </span>
                    <div className="absolute inset-0 h-full w-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-100 mix-blend-overlay" />
                </button>
             </Link>
             <Link href="/contact">
                <button className="px-10 py-4 border border-white/20 text-white hover:bg-white/5 transition-colors font-mono text-sm uppercase tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyber-cyan rounded-full animate-ping" />
                    Join Us
                </button>
             </Link>
        </motion.div>

        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1.5, repeat: Infinity, duration: 2 }}
            className="absolute bottom-12 text-cyber-cyan/50 flex flex-col items-center gap-2 font-tech"
        >
            <span className="text-[10px] tracking-[0.5em] uppercase">Scroll Down</span>
            <div className="h-12 w-[1px] bg-gradient-to-b from-cyber-cyan to-transparent"></div>
        </motion.div>
      </section>

      {/* Sections Wrapper */}
      <div className="relative z-10 bg-background/90 backdrop-blur-md border-t border-cyber-cyan/20">
          
          {/* Decorative Divider */}
          <div className="w-full h-2 bg-cyber-cyan/10 flex items-center justify-between px-4 overflow-hidden">
               {Array.from({ length: 20 }).map((_, i) => (
                   <div key={i} className="w-1 h-full bg-cyber-cyan/20 skew-x-12"></div>
               ))}
          </div>

          <AboutSection />
          <div className="h-px w-full bg-border-color my-0" />
          <PlaygroundSection />
          <div className="h-px w-full bg-border-color my-0" />
          <EventsPreview />
           <div className="h-px w-full bg-border-color my-0" />
          <TeamPreview />
           <div className="h-px w-full bg-border-color my-0" />
          <GalleryPreview />
          
          <section className="py-32 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-cyber-cyan/5 pointer-events-none"></div>
              <h2 className="text-4xl md:text-6xl font-bold text-white font-display mb-8 uppercase">
                  Ready to Start?
              </h2>
               <Link href="/login">
                <button className="px-16 py-6 border-2 border-cyber-cyan text-cyber-cyan font-bold rounded-none hover:bg-cyber-cyan hover:text-black transition-all text-2xl uppercase tracking-widest font-display">
                    Member Login
                </button>
             </Link>
          </section>
      </div>
    </main>
  );
}
