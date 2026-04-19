"use client";

import React from "react";
import Navbar from "../components/navbar";
import MovingBackground from "../components/MovingBackground";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-[#06060c] text-white relative">
      <MovingBackground />
      <div className="relative z-10">
        <Navbar />
        <div className="max-w-6xl mx-auto px-6 py-24">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-12 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6 font-['Fira_Code',monospace] tracking-tight"
          >
            Club <span className="text-blue-500">Projects</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl text-lg mb-16"
          >
            Explore the hardware and software builds completed by our members.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Autonomous Rover", tag: "Robotics", desc: "Terrain-aware rover with sensor fusion and waypoint logic." },
              { title: "Line Follower", tag: "Automation", desc: "High-speed PID tuning and IR sensor calibration for track stability." },
              { title: "Battle Bot Chassis", tag: "Hardware", desc: "Custom aluminum chassis with impact-tolerant mechanics." },
              { title: "Computer Vision Arm", tag: "AI/ML", desc: "Robotic arm sorting objects using OpenCV and a camera feed." },
              { title: "Smart Home Hub", tag: "IoT", desc: "Arduino-based central hub controlling lab lighting and locks." },
              { title: "Drone Swarm Logic", tag: "Software", desc: "Simulation algorithms for coordinated multi-drone flight." }
            ].map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.2 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.05] transition-colors"
              >
                <span className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 block">{p.tag}</span>
                <h3 className="text-xl font-semibold mb-3">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
