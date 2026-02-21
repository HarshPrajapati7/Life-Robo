"use client";

import React, { useEffect } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";

export function BackgroundRippleEffect() {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(20);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 24 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 24 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const interactiveGlow = useMotionTemplate`radial-gradient(28% 22% at ${smoothX}% ${smoothY}%, rgba(68,136,255,0.24), transparent 76%)`;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div style={{ background: interactiveGlow }} className="absolute inset-0" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,rgba(68,136,255,0.58)_0%,rgba(68,136,255,0.22)_36%,rgba(68,136,255,0)_72%)]" />

      <motion.div
        animate={{ scaleX: [1, 1.07, 1], opacity: [0.56, 0.16, 0.56] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[8%] left-1/2 h-[260px] w-[140%] -translate-x-1/2 rounded-[100%] border border-blue-200/20"
      />

      <motion.div
        animate={{ scaleX: [1, 1.12, 1], opacity: [0.4, 0.1, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        className="absolute bottom-[6%] left-1/2 h-[300px] w-[150%] -translate-x-1/2 rounded-[100%] border border-blue-100/15"
      />
    </div>
  );
}
