"use client";

import { motion } from "framer-motion";

interface LoadingWaveProps {
    className?: string;
    color?: string;
    size?: "sm" | "md" | "lg";
}

export default function LoadingWave({ 
    className = "", 
    color = "#00f0ff",
    size = "md" 
}: LoadingWaveProps) {
    const dimensions = {
        sm: { w: "w-24", h: "h-12", view: "0 0 100 80", amp: [25, 15] },
        md: { w: "w-32", h: "h-20", view: "0 0 100 80", amp: [35, 25] },
        lg: { w: "w-48", h: "h-32", view: "0 0 100 80", amp: [45, 30] }
    }[size];

    return (
        <div className={`relative ${dimensions.w} ${dimensions.h} flex items-center justify-center ${className}`}>
            <svg width="100%" height="100%" viewBox={dimensions.view} fill="none" xmlns="http://www.w3.org/2000/svg">
                <SinWavePath color={color} delay={0} speed={1.5} amplitude={dimensions.amp[0]} />
                <SinWavePath color={color} delay={0.2} speed={1.5} amplitude={dimensions.amp[1]} opacity={0.3} />
            </svg>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-cyber-cyan/10 rounded-full blur-[50px] pointer-events-none" />
        </div>
    );
}

function SinWavePath({ color, delay, speed, amplitude, opacity = 1 }: { color: string, delay: number, speed: number, amplitude: number, opacity?: number }) {
    const amp = amplitude || 0;
    const pathA = `M 0 40 C 30 ${40 - amp}, 70 ${40 + amp}, 100 40`;
    const pathB = `M 0 40 C 30 ${40 + amp}, 70 ${40 - amp}, 100 40`;

    return (
        <motion.path
            fill="transparent"
            stroke={color}
            strokeWidth="2"
            strokeLinecap="round"
            style={{ opacity }}
            initial={{ d: pathA }}
            animate={{
                d: [pathA, pathB, pathA]
            }}
            transition={{
                duration: speed,
                repeat: Infinity,
                ease: "easeInOut",
                delay: delay
            }}
        />
    );
}
