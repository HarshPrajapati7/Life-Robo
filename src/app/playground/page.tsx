"use client";

import { motion } from "framer-motion";
import { Code, Zap, Box, ArrowRight } from "lucide-react";
import Link from "next/link";

const tools = [
  {
    title: "3D Simulations",
    description: "Drive rovers and control humanoid robots in your browser.",
    icon: Box,
    href: "/playground/simulations",
    status: "Active",
    enabled: true,
  },
  {
    title: "Code Editor",
    description: "Write, compile, and run C/C++ code with built-in terminal.",
    icon: Code,
    href: "/ide",
    status: "Active",
    enabled: true,
  },
  {
    title: "Electronics",
    description: "Drag-and-drop circuit builder with LEDs, motors, and microcontrollers.",
    icon: Zap,
    href: "#",
    status: "Coming Soon",
    enabled: false,
  },
];

export default function PlaygroundPage() {
  return (
    <main className="min-h-screen w-full bg-[#060608]/85 flex flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-2xl">

        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-display font-black text-white uppercase tracking-tight mb-2">
            Playground
          </h1>
          <p className="text-white/25 text-sm">
            Interactive tools for learning robotics.
          </p>
        </motion.div>

        {/* Tool Cards — stacked with 1px gaps */}
        <div className="flex flex-col gap-px bg-white/5 border border-white/5">
          {tools.map((tool, i) => {
            const inner = (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-black/40 px-6 py-5 flex items-center gap-5 transition-colors ${tool.enabled ? 'hover:bg-white/[0.02] group' : 'cursor-default'}`}
              >
                <tool.icon size={20} className={tool.enabled ? "text-white/25 shrink-0" : "text-white/10 shrink-0"} />
                <div className="flex-1 min-w-0">
                  <h3 className={`text-sm font-display font-bold uppercase tracking-wider ${tool.enabled ? 'text-white' : 'text-white/25'}`}>
                    {tool.title}
                  </h3>
                  <p className={`text-xs mt-0.5 truncate ${tool.enabled ? 'text-white/25' : 'text-white/10'}`}>
                    {tool.description}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-2">
                  <span className={`text-[9px] uppercase tracking-widest font-bold font-tech ${tool.enabled ? 'text-white/30' : 'text-white/10'}`}>{tool.status}</span>
                  {tool.enabled && (
                    <ArrowRight size={14} className="text-white/15 group-hover:text-white/40 group-hover:translate-x-0.5 transition-all" />
                  )}
                </div>
              </motion.div>
            );

            return tool.enabled ? (
              <Link key={tool.title} href={tool.href}>
                {inner}
              </Link>
            ) : (
              <div key={tool.title}>{inner}</div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
