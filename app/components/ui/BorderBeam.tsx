"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface BorderBeamProps {
  size?: number;
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
  transition?: object;
  className?: string;
  style?: React.CSSProperties;
  reverse?: boolean;
  initialOffset?: number;
  borderThickness?: number;
  opacity?: number;
  glowIntensity?: number;
  beamBorderRadius?: number;
}

export const BorderBeam = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#4488ff",
  colorTo = "#66aaff",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderThickness = 1,
  opacity = 1,
  glowIntensity = 0,
  beamBorderRadius,
}: BorderBeamProps) => {
  const glowEffect =
    glowIntensity > 0
      ? `0 0 ${glowIntensity * 5}px ${glowIntensity * 2}px var(--color-from)`
      : undefined;

  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]"
      style={{
        borderWidth: `${borderThickness}px`,
      }}
    >
      <motion.div
        className={cn(
          "absolute aspect-square",
          "bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent",
          className
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${beamBorderRadius ?? size}px)`,
            "--color-from": colorFrom,
            "--color-to": colorTo,
            opacity: opacity,
            boxShadow: glowEffect,
            borderRadius: beamBorderRadius
              ? `${beamBorderRadius}px`
              : undefined,
            ...style,
          } as React.CSSProperties
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  );
};
