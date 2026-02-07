"use client";

import HeroScene from "@/components/3d/HeroScene";
import AboutSection from "@/components/sections/AboutSection";
import TeamPreview from "@/components/sections/TeamPreview";
import EventsPreview from "@/components/sections/EventsPreview";
import GalleryPreview from "@/components/sections/GalleryPreview";
import PlaygroundSection from "@/components/sections/PlaygroundSection";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Cpu } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {
    const { scrollY, scrollYProgress } = useScroll();
    const [isIntro, setIsIntro] = useState(true);

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const timer = setTimeout(() => setIsIntro(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Parallax transformations
    const textY = useTransform(scrollY, [0, 500], [0, 150]);
    const textOpacityScroll = useTransform(scrollY, [0, 300], [1, 0]);
    const sceneScale = useTransform(scrollY, [0, 500], [1, 0.8]);
    const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

    return (
        <main className="min-h-screen relative overflow-hidden">
            {/* Progress Bar with Glitch Color */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-cyber-cyan origin-left z-50 mix-blend-exclusion"
                style={{ scaleX }}
            />

            {/* Hero Content */}
            <section className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-6 lg:px-8 py-12 md:py-20">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start lg:items-center w-full relative">

                    {/* Left Column: Text Content */}
                    <motion.div
                        style={{ y: textY }}
                        animate={{
                            opacity: isIntro ? 0 : 1,
                            x: isIntro ? -50 : 0
                        }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
                        className="text-left flex flex-col items-start order-2 lg:order-1 mt-8 lg:mt-0"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative mb-6 md:mb-8"
                        >
                            <h1
                                data-text="LIFE ROBO"
                                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#f5f5f7] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] tracking-tighter relative z-10 font-display uppercase leading-none hover-glitch cursor-default"
                            >
                                LIFE ROBO
                            </h1>
                            <div className="absolute -inset-4 border-x border-cyber-cyan/30 scale-y-110 opacity-30"></div>

                            <div className="absolute -bottom-8 left-0 flex items-center gap-3 md:gap-4 text-cyber-cyan font-tech text-[8px] sm:text-[10px] md:text-sm tracking-[0.05em] uppercase whitespace-nowrap">
                                <span>UNIVERSITY OF LUCKNOW</span>
                                <span className="w-1 h-3 bg-cyber-cyan/30"></span>
                                <span>OFFICIAL ROBOTICS CLUB</span>
                            </div>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="mt-10 sm:mt-12 text-base sm:text-lg md:text-xl text-gray-400 max-w-xl font-light tracking-wide font-body border-l-2 border-cyber-cyan pl-5 md:pl-6 text-left"
                        >
                            <span className="text-cyber-cyan font-bold">L.I.F.E.</span> — Learn and Innovation in the Field of Engineering.
                            <br />
                            A community of students passionate about robotics, automation, and building the future.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="mt-10 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-6 w-full lg:w-auto"
                        >
                            <Link href="/playground" className="w-full lg:w-auto">
                                <button className="w-full relative px-8 md:px-10 py-3 md:py-4 group overflow-hidden bg-cyber-cyan text-black font-bold text-base md:text-lg font-display uppercase tracking-widest clip-path-polygon">
                                    <span className="relative z-10 flex items-center gap-2 justify-center">
                                        <Cpu size={20} /> Open Playground
                                    </span>
                                    <div className="absolute inset-0 h-full w-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-100 mix-blend-overlay" />
                                </button>
                            </Link>
                            <Link href="/contact" className="w-full lg:w-auto">
                                <button className="w-full px-8 md:px-10 py-3 md:py-4 border border-white/20 text-white hover:bg-white/5 transition-colors font-mono text-xs md:text-sm uppercase tracking-widest flex items-center gap-2 justify-center">
                                    <span className="w-2 h-2 bg-cyber-cyan rounded-full animate-ping" />
                                    Join Us
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Right Column: Robot Scene */}
                    <motion.div
                        animate={{
                            x: isIntro ? (typeof window !== 'undefined' && window.innerWidth > 1024 ? "-50%" : 0) : 0,
                            scale: isIntro ? 1.4 : 1,
                            opacity: 1
                        }}
                        style={{ scale: sceneScale }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                        className="h-[50vh] sm:h-[60vh] md:h-[650px] w-full relative order-1 lg:order-2 z-20"
                    >
                        <HeroScene />
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    style={{ opacity: scrollIndicatorOpacity }}
                    transition={{ delay: 1.5, repeat: Infinity, duration: 2 }}
                    className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 text-cyber-cyan/50 flex flex-col items-center gap-2 font-tech"
                >
                    <span className="text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase">Scroll Down</span>
                    <div className="h-8 md:h-12 w-[1px] bg-gradient-to-b from-cyber-cyan to-transparent"></div>
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
                <div className="h-px w-full bg-white/5 my-0" />
                <PlaygroundSection />
                <div className="h-px w-full bg-white/5 my-0" />
                <EventsPreview />
                <div className="h-px w-full bg-white/5 my-0" />
                <TeamPreview />
                <div className="h-px w-full bg-white/5 my-0" />
                <GalleryPreview />

                <section className="py-20 md:py-32 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-cyber-cyan/5 pointer-events-none"></div>
                    <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white font-display mb-6 md:mb-8 uppercase px-4">
                        Ready to Start?
                    </h2>
                    <Link href="/login">
                        <button className="px-10 md:px-16 py-4 md:py-6 border-2 border-cyber-cyan text-cyber-cyan font-bold rounded-none hover:bg-cyber-cyan hover:text-black transition-all text-xl md:text-2xl uppercase tracking-widest font-display">
                            Member Login
                        </button>
                    </Link>
                </section>
            </div>
        </main>
    );
}
