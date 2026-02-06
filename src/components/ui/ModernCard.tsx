"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import React from "react";

interface ModernCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: "blue" | "green" | "red" | "yellow";
  onClick?: () => void;
}

const glowColors = {
  blue: "hover:shadow-[0_0_20px_-5px_rgba(0,243,255,0.4)] border-cyber-primary/20 hover:border-cyber-primary/60",
  green: "hover:shadow-[0_0_20px_-5px_rgba(52,211,153,0.4)] border-emerald-500/20 hover:border-emerald-500/60",
  red: "hover:shadow-[0_0_20px_-5px_rgba(255,0,85,0.4)] border-cyber-accent/20 hover:border-cyber-accent/60",
  yellow: "hover:shadow-[0_0_20px_-5px_rgba(251,188,4,0.4)] border-yellow-400/20 hover:border-yellow-400/60",
};

export default function ModernCard({ children, className, glowColor = "blue", onClick }: ModernCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={clsx(
        "glass-panel rounded-xl p-6 transition-all duration-300 cursor-pointer relative overflow-hidden group",
        glowColors[glowColor],
        className
      )}
      onClick={onClick}
    >
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyber-primary opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyber-primary opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyber-primary opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyber-primary opacity-50 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10">{children}</div>
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
}
