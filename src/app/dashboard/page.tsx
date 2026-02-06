"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Users, 
  Settings, 
  LogOut, 
  ShieldAlert, 
  Cpu, 
  BookOpen, 
  Trophy,
  History,
  Plus
} from "lucide-react";

interface UserInfo {
  email: string;
  role: 'admin' | 'member';
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserInfo | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("liferobo_user");
    if (!savedUser) {
      router.push("/login");
    } else {
      setUser(JSON.parse(savedUser));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("liferobo_user");
    router.push("/login");
  };

  if (!user) return null;

  return (
    <main className="min-h-screen bg-black pt-24 pb-12 px-4 md:px-8">
      {/* Dashboard Grid Pattern */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-cyber-cyan font-tech text-xs uppercase tracking-[0.3em] mb-2">
                <div className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse"></div>
                System Active: {user.role === 'admin' ? 'Root Access' : 'Standard Node'}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold font-display text-white uppercase tracking-tighter">
                Control <span className="text-cyber-cyan">Center</span>
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
                <div className="text-white font-tech text-sm tracking-wider uppercase">{user.email.split('@')[0]}</div>
                <div className="text-gray-500 text-[10px] uppercase tracking-widest">{user.role} Privilege</div>
            </div>
            <button 
                onClick={handleLogout}
                className="p-3 border border-white/10 text-gray-400 hover:text-cyber-pink hover:border-cyber-pink/50 transition-all rounded-sm bg-white/5"
            >
                <LogOut size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Stats & Identity */}
            <div className="space-y-8">
                {/* Profile Card */}
                <div className="bg-white/5 border border-white/10 p-6 tech-border-corner">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-cyber-dark border border-cyber-cyan/30 flex items-center justify-center relative">
                            <Users className="text-cyber-cyan" size={32} />
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-cyber-cyan flex items-center justify-center text-[10px] text-black font-bold">L2</div>
                        </div>
                        <div>
                            <h3 className="text-white font-display uppercase tracking-widest">Ident: {user.email.split('@')[0]}</h3>
                            <p className="text-cyber-cyan font-tech text-xs uppercase opacity-70">Sector: Lucknow_Main</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="h-[2px] w-full bg-white/5 relative overflow-hidden">
                            <div className="absolute h-full bg-cyber-cyan w-3/4"></div>
                        </div>
                        <div className="flex justify-between text-[10px] font-tech text-gray-400 uppercase tracking-widest">
                            <span>Experience Progress</span>
                            <span>75%</span>
                        </div>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 border border-white/10 p-4">
                        <div className="text-cyber-cyan font-tech text-[10px] uppercase mb-1">Projects</div>
                        <div className="text-2xl font-display text-white">12</div>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-4">
                        <div className="text-cyber-yellow font-tech text-[10px] uppercase mb-1">Seminars</div>
                        <div className="text-2xl font-display text-white">08</div>
                    </div>
                </div>
            </div>

            {/* Middle Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
                {user.role === 'admin' ? (
                    <div className="space-y-8">
                        {/* Admin Tools */}
                        <div className="section-title flex items-center gap-4 mb-4">
                            <h2 className="text-xl font-bold font-display text-white uppercase tracking-widest">Administrative Core</h2>
                            <div className="flex-1 h-[1px] bg-white/10"></div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group bg-white/5 border border-white/10 p-6 hover:border-cyber-cyan transition-all cursor-pointer">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-cyber-cyan/10 text-cyber-cyan"><ShieldAlert size={24} /></div>
                                    <div className="text-[10px] text-cyber-cyan font-tech bg-cyber-cyan/5 px-2 py-1 uppercase">Restricted</div>
                                </div>
                                <h4 className="text-white font-display mb-2">MEMBER DIRECTORY</h4>
                                <p className="text-gray-500 text-xs">Manage access privileges and identity verification for all club nodes.</p>
                            </div>

                            <div className="group bg-white/5 border border-white/10 p-6 hover:border-cyber-cyan transition-all cursor-pointer">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-cyber-cyan/10 text-cyber-cyan"><Plus size={24} /></div>
                                    <div className="text-[10px] text-cyber-cyan font-tech bg-cyber-cyan/5 px-2 py-1 uppercase">Active</div>
                                </div>
                                <h4 className="text-white font-display mb-2">EVENT COMMAND</h4>
                                <p className="text-gray-400 text-xs">Deploy new mission chronologies and update existing competition logs.</p>
                            </div>
                        </div>

                        {/* System Logs */}
                        <div className="bg-white/5 border border-white/10 p-6">
                             <div className="flex items-center gap-2 mb-6">
                                <History size={16} className="text-cyber-cyan" />
                                <h3 className="text-white font-display text-sm tracking-widest uppercase">Global Activity Stream</h3>
                             </div>
                             <div className="space-y-4 font-tech text-[10px] text-gray-500">
                                <div className="flex gap-4 border-l border-white/10 pl-4 py-1">
                                    <span className="text-cyber-cyan">[01:24:05]</span>
                                    <span>User member_alpha accessed "RoboEminence" resources</span>
                                </div>
                                <div className="flex gap-4 border-l border-white/10 pl-4 py-1">
                                    <span className="text-cyber-pink">[23:12:44]</span>
                                    <span>System Alert: Manual override in Gallery/Sector_04</span>
                                </div>
                                <div className="flex gap-4 border-l border-white/10 pl-4 py-1">
                                    <span className="text-cyber-cyan">[18:05:21]</span>
                                    <span>New member registration request from node: 192.168.1.45</span>
                                </div>
                             </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* Member Experience */}
                        <div className="section-title flex items-center gap-4 mb-4">
                            <h2 className="text-xl font-bold font-display text-white uppercase tracking-widest">Learning Modules</h2>
                            <div className="flex-1 h-[1px] bg-white/10"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="group bg-white/5 border border-white/10 p-6 hover:border-cyber-cyan transition-all cursor-pointer relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-12 h-12 flex items-center justify-center">
                                    <BookOpen className="text-white/10 group-hover:text-cyber-cyan/20 transition-all" size={48} />
                                </div>
                                <h4 className="text-white font-display mb-2 uppercase">INTRO TO ARDUINO</h4>
                                <p className="text-gray-500 text-xs mb-4 uppercase font-tech">Module 01: Hardware Foundations</p>
                                <div className="w-full bg-white/5 h-1">
                                    <div className="bg-cyber-cyan h-full w-2/3"></div>
                                </div>
                            </div>

                            <div className="group bg-white/5 border border-white/10 p-6 hover:border-cyber-cyan transition-all cursor-pointer relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-12 h-12 flex items-center justify-center">
                                    <Cpu className="text-white/10 group-hover:text-cyber-cyan/20 transition-all" size={48} />
                                </div>
                                <h4 className="text-white font-display mb-2 uppercase">CAD MODELLING</h4>
                                <p className="text-gray-500 text-xs mb-4 uppercase font-tech">Module 04: Advanced Rendering</p>
                                <div className="w-full bg-white/5 h-1 text-center">
                                     <span className="text-[10px] text-gray-500">LOCKED: COMPLETE PRE-REQUISITES</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Achievements */}
                        <div className="bg-white/5 border border-white/10 p-6">
                             <div className="flex items-center gap-2 mb-6">
                                <Trophy size={16} className="text-cyber-yellow" />
                                <h3 className="text-white font-display text-sm tracking-widest uppercase">Verified Service Logs</h3>
                             </div>
                             <div className="space-y-3">
                                <div className="p-3 bg-white/5 border-l-2 border-cyber-yellow flex justify-between items-center">
                                    <span className="text-xs text-white font-tech">ROBO-EMINENCE PARTICIPANT</span>
                                    <span className="text-[10px] text-cyber-yellow font-tech">CERT_ID: 884-90</span>
                                </div>
                                <div className="p-3 bg-white/5 border-l-2 border-cyber-cyan flex justify-between items-center">
                                    <span className="text-xs text-white font-tech">LECTURE SERIES COMPLETED</span>
                                    <span className="text-[10px] text-cyber-cyan font-tech">CERT_ID: 102-44</span>
                                </div>
                             </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </main>
  );
}
