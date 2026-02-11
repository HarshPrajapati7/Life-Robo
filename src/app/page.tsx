"use client";

import { useRef, useState, useCallback, useLayoutEffect, useEffect } from "react";
import AboutSection from "@/components/sections/AboutSection";
import TeamPreview from "@/components/sections/TeamPreview";
import EventsPreview from "@/components/sections/EventsPreview";
import GalleryPreview from "@/components/sections/GalleryPreview";
import PlaygroundSection from "@/components/sections/PlaygroundSection";
import HeroRobot from "@/components/3d/HeroRobot";
import { motion, useAnimation } from "framer-motion";
import Link from "next/link";

export default function Home() {
    const containerRef = useRef(null);
    const [sceneDeferred, setSceneDeferred] = useState(false);

    // // Mark this page as having heavy content (tells Preloader to wait for page-ready)
    // useLayoutEffect(() => {
    //     window.__pageHeavy = true;
    //     return () => { window.__pageHeavy = false; };
    // }, []);

    // Defer 3D rendering until browser has painted the preloader
    useEffect(() => {
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                setSceneDeferred(true);
            });
        });
    }, []);

    // When 3D scene renders its first frame, signal the preloader
    useEffect(() => {
        const onSceneReady = () => {
            window.dispatchEvent(new CustomEvent('page-ready'));
        };
        window.addEventListener('3d-ready', onSceneReady);
        return () => window.removeEventListener('3d-ready', onSceneReady);
    }, []);


    // Logo Controls
    const logoControls = useAnimation();
    const subtextControls = useAnimation();
    const [isJumping, setIsJumping] = useState(false);

    const handleRobotJump = useCallback(() => {
        if (!isJumping) {
            setIsJumping(true);
            
            // Animate Main Logo
            logoControls.start({
                y: -40,
                scale: 1.05,
                transition: { type: "spring", damping: 12, stiffness: 200 }
            }).then(() => {
                logoControls.start({
                    y: 0,
                    scale: 1,
                    transition: { type: "spring", damping: 20, stiffness: 100 }
                }).then(() => setIsJumping(false));
            });

            // Animate Subtext (slightly less, slightly delayed)
            subtextControls.start({
                y: -20,
                transition: { type: "spring", damping: 12, stiffness: 200, delay: 0.05 }
            }).then(() => {
                subtextControls.start({
                    y: 0,
                    transition: { type: "spring", damping: 20, stiffness: 100 }
                });
            });
        }
    }, [isJumping, logoControls, subtextControls]);

    // Initial load animation
    useLayoutEffect(() => {
        logoControls.start({
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] } 
        });
        subtextControls.start({
            opacity: 1,
            transition: { duration: 0.8 } 
        });
    }, [logoControls, subtextControls]);

    return (
        <main className="relative" ref={containerRef}>
            {/* Hero */}
            <section className="relative h-screen w-full flex flex-col items-center pt-32 pb-12 overflow-hidden">
                
                {/* Text Content - Top */}
                <div className="w-full text-center px-6 relative shrink-0 select-none">
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={subtextControls}
                        className="text-[10px] font-tech text-white/30 uppercase tracking-[0.4em] mb-6 origin-bottom"
                    >
                        University of Lucknow &mdash; Robotics Society
                    </motion.p>

                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={logoControls}
                        className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-[0.8] uppercase font-display cursor-default origin-bottom"
                    >
                        LIFE ROBO
                    </motion.h1>
                </div>

                {/* 3D Model - Center/Bottom (Below Text) */}
                <motion.div 
                    className="w-full flex-1 relative min-h-[300px]"
                >
                    {sceneDeferred && <HeroRobot onJump={handleRobotJump} />}
                </motion.div>

                {/* CTA - Bottom */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="absolute bottom-10 z-20 pointer-events-auto"
                >
                    <Link href="/playground">
                        <button className="px-8 py-3 bg-white/5 backdrop-blur-md border border-white/10 text-white/60 hover:text-white hover:bg-white/10 text-[10px] uppercase tracking-widest font-display font-bold transition-all rounded-full">
                            Enter Lab
                        </button>
                    </Link>
                </motion.div>
            </section>

            <AboutSection />
            <PlaygroundSection />
            <EventsPreview />
            <TeamPreview />
            <GalleryPreview />

            {/* CTA */}
            <section className="py-24 md:py-32 text-center border-t border-white/5">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white font-display mb-4 uppercase px-4 tracking-tight">
                    Join Our Team
                </h2>
                <p className="text-white/30 text-sm mb-10 max-w-md mx-auto">
                    Currently recruiting for the 2026 season. Members get access to the lab, 3D printers, and competition travel.
                </p>
                    <Link href="/login">
                    <button className="px-10 py-3.5 bg-white text-black font-bold hover:bg-white/90 active:scale-[0.97] transition-all text-sm uppercase tracking-widest font-display">
                        Member Login
                    </button>
                </Link>
                <div className="mt-4">
                    <Link href="/register" className="text-[10px] font-tech uppercase tracking-widest text-white/30 hover:text-white transition-colors">
                        New Member? Register
                    </Link>
                </div>
            </section>
        </main>
    );
}
