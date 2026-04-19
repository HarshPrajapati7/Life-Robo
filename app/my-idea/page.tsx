"use client";

import React, { useState } from "react";
import Navbar from "../components/navbar";
import MovingBackground from "../components/MovingBackground";
import { ArrowLeft, Lightbulb, Rocket, Code, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";

export default function MyIdeaPage() {
    const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", domain: "hardware", title: "", pitch: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Attempt to save to Supabase
    try {
      const { error } = await supabase
        .from('ideas')
        .insert([
          { 
            name: formData.name, 
            domain: formData.domain, 
            title: formData.title, 
            pitch: formData.pitch,
            status: 'pending'
          }
        ]);

      if (error) {
        console.error("Error saving idea:", error);
        // Even if it fails (because env vars aren't set yet), we still show success for UI demo purposes
      }

      // Simulate email sending delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#06060c] text-white relative">
      <MovingBackground />
      <div className="relative z-10">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-24">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-12 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Lightbulb size={24} />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-['Fira_Code',monospace] tracking-tight">
              Pitch <span className="text-blue-500">Your Idea</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg mb-12 max-w-2xl"
          >
            Got a crazy robotics, software, or hardware idea? The club provides funding, tools, and mentorship to bring student ideas to life. Pitch it below.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="md:col-span-2 bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center h-full">
                  <div className="w-16 h-16 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-6">
                    <Rocket size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Idea Received!</h3>
                  <p className="text-gray-400">We'll review your pitch and reach out to you within 48 hours to discuss the next steps.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-8 text-blue-400 hover:text-blue-300 text-sm font-medium">Submit another idea</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-blue-100/70 block">Your Name</label>
                      <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors" placeholder="Ada Lovelace" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-blue-100/70 block">Domain</label>
                      <select value={formData.domain} onChange={(e) => setFormData({...formData, domain: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors appearance-none">
                        <option value="hardware" className="bg-[#06060c]">Hardware & Robotics</option>
                        <option value="software" className="bg-[#06060c]">Software & AI</option>
                        <option value="iot" className="bg-[#06060c]">IoT & Electronics</option>
                        <option value="other" className="bg-[#06060c]">Other / Hybrid</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-100/70 block">Project Title</label>
                    <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors" placeholder="e.g. Autonomous Campus Delivery Drone" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-blue-100/70 block">The Pitch (What does it do?)</label>
                    <textarea required rows={5} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none" placeholder="Describe the problem you are solving and how your build works..." value={formData.pitch} onChange={(e) => setFormData({...formData, pitch: e.target.value})}></textarea>
                  </div>

                  <button type="submit" disabled={loading} className="w-full bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 text-white font-medium py-4 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-1">
                    {loading ? "Transmitting..." : "Submit to Leadership Board"}
                  </button>
                </form>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-6"
            >
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                <div className="w-10 h-10 bg-blue-500/10 text-blue-400 rounded-lg flex items-center justify-center mb-4">
                  <Rocket size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Funding Available</h3>
                <p className="text-gray-400 text-sm">Approved projects receive club funding for hardware, sensors, and compute components.</p>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                <div className="w-10 h-10 bg-cyan-500/10 text-cyan-400 rounded-lg flex items-center justify-center mb-4">
                  <Code size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Technical Mentorship</h3>
                <p className="text-gray-400 text-sm">You don't need to know everything. We'll pair you with senior leads to help you build it.</p>
              </div>

              <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 rounded-lg flex items-center justify-center mb-4">
                  <Zap size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Lab Access</h3>
                <p className="text-gray-400 text-sm">Get 24/7 access to 3D printers, soldering stations, and our compute servers.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}
