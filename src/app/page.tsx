"use client";

import AboutSection from "@/components/sections/AboutSection";
import TeamPreview from "@/components/sections/TeamPreview";
import EventsPreview from "@/components/sections/EventsPreview";
import GalleryPreview from "@/components/sections/GalleryPreview";
import PlaygroundSection from "@/components/sections/PlaygroundSection";
import HeroRobot from "@/components/3d/HeroRobot";
import { motion } from "framer-motion";
import Link from "next/link";
import { Cpu, ArrowDown } from "lucide-react";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay, ease: "easeOut" as const },
    }),
};

export default function Home() {
    return (
        <main className="relative">
            {/* Hero */}
            <section className="min-h-[70svh] sm:min-h-[80svh] flex items-center justify-center px-4 py-16 sm:py-20">
                <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                <div className="flex-1 text-center lg:text-left">
                    <motion.h1
                        initial="hidden"
                        animate="visible"
                        custom={0}
                        variants={fadeUp}
                        data-text="LIFE ROBO"
                        className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-white tracking-tighter font-display uppercase leading-none hover-glitch cursor-default"
                    >
                        LIFE ROBO
                    </motion.h1>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={0.15}
                        variants={fadeUp}
                        className="flex items-center justify-center gap-3 text-cyber-cyan font-tech text-[10px] sm:text-xs tracking-[0.05em] uppercase mt-4"
                    >
                        <span>University of Lucknow</span>
                        <span className="w-1 h-3 bg-cyber-cyan/40" />
                        <span>Official Robotics Club</span>
                    </motion.div>

                    <motion.p
                        initial="hidden"
                        animate="visible"
                        custom={0.3}
                        variants={fadeUp}
                        className="mt-8 text-gray-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-body"
                    >
                        <span className="text-cyber-cyan font-semibold">L.I.F.E.</span> — Learn and Innovation in the Field of Engineering.
                        A community passionate about robotics, automation, and building the future.
                    </motion.p>

                    <motion.div
                        initial="hidden"
                        animate="visible"
                        custom={0.45}
                        variants={fadeUp}
                        className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <Link href="/playground" className="w-4/5 sm:w-auto">
                            <button className="w-full px-5 sm:px-8 py-2.5 sm:py-3.5 bg-cyber-cyan text-black font-bold text-xs sm:text-sm font-display uppercase tracking-widest flex items-center gap-2 justify-center hover:brightness-110 active:scale-95 transition-all">
                                <Cpu size={16} /> Open Playground
                            </button>
                        </Link>
                        <Link href="/contact" className="w-4/5 sm:w-auto">
                            <button className="w-full px-5 sm:px-8 py-2.5 sm:py-3.5 border border-white/20 text-white hover:bg-white/5 active:scale-95 transition-all font-tech text-[10px] sm:text-xs uppercase tracking-widest flex items-center gap-2 justify-center">
                                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-cyber-cyan rounded-full animate-pulse" />
                                Join Us
                            </button>
                        </Link>
                    </motion.div>
                </div>

                {/* Robot on desktop */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="hidden lg:block w-[500px] h-[550px] flex-shrink-0"
                >
                    <HeroRobot />
                </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cyber-cyan/40"
                >
                    <ArrowDown size={16} className="animate-bounce" />
                </motion.div>
            </section>

            {/* Sections */}
            <div className="border-t border-white/10">
                <PlaygroundSection />
                <div className="h-px bg-white/5" />
                <AboutSection />
                <div className="h-px bg-white/5" />
                <EventsPreview />
                <div className="h-px bg-white/5" />
                <TeamPreview />
                <div className="h-px bg-white/5" />
                <GalleryPreview />

                {/* CTA */}
                <section className="py-20 md:py-28 text-center bg-cyber-cyan/5">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display mb-8 uppercase px-4">
                        Ready to Start?
                    </h2>
                    <Link href="/login">
                        <button className="px-12 py-4 border-2 border-cyber-cyan text-cyber-cyan font-bold hover:bg-cyber-cyan hover:text-black active:scale-95 transition-all text-lg md:text-xl uppercase tracking-widest font-display">
                            Member Login
                        </button>
                    </Link>
                </section>
            </div>
        </main>
    );
}
