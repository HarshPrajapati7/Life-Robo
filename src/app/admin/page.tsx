"use client";

import Link from "next/link";
import { LayoutDashboard, Users, Image as ImageIcon, Calendar } from "lucide-react";

export default function AdminPage() {
  const stats = [
    { name: "Total Events", value: "12", icon: Calendar, color: "text-cyber-primary" },
    { name: "Team Members", value: "24", icon: Users, color: "text-cyber-secondary" },
    { name: "Gallery Images", value: "156", icon: ImageIcon, color: "text-cyber-accent" },
  ];

  return (
    <main className="min-h-screen p-8 md:p-12 pt-24 bg-[#0a0a0a]">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold font-display tracking-widest text-white uppercase glow-text">Admin_Console</h1>
        <div className="px-4 py-1 bg-cyber-primary/10 border border-cyber-primary/30 rounded text-cyber-primary text-xs font-mono animate-pulse">
            SYSTEM_SECURE
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {stats.map((stat) => (
          <div key={stat.name} className="glass-panel p-6 rounded-xl border border-cyber-primary/10 flex items-center justify-between hover:border-cyber-primary/30 transition-all">
            <div>
              <p className="text-cyber-muted text-xs uppercase tracking-wider font-mono">{stat.name}</p>
              <p className="text-3xl font-bold mt-2 text-white font-display">{stat.value}</p>
            </div>
            <stat.icon className={`w-8 h-8 ${stat.color} opacity-80`} />
          </div>
        ))}
      </div>

      <h2 className="text-xl font-bold mb-6 text-white font-mono uppercase tracking-wider border-b border-white/10 pb-2">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/admin/events" className="group glass-panel p-6 rounded-xl border border-cyber-primary/10 hover:border-cyber-primary transition-all relative overflow-hidden">
          <div className="absolute inset-0 bg-cyber-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Calendar className="w-8 h-8 text-cyber-primary mb-4 group-hover:scale-110 transition-transform relative z-10" />
          <h3 className="text-lg font-bold mb-2 text-white relative z-10">Manage Events</h3>
          <p className="text-cyber-muted text-sm relative z-10 font-mono">Create, edit, or delete upcoming events.</p>
        </Link>
        <Link href="/admin/team" className="group glass-panel p-6 rounded-xl border border-cyber-primary/10 hover:border-cyber-secondary transition-all relative overflow-hidden">
           <div className="absolute inset-0 bg-cyber-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <Users className="w-8 h-8 text-cyber-secondary mb-4 group-hover:scale-110 transition-transform relative z-10" />
          <h3 className="text-lg font-bold mb-2 text-white relative z-10">Manage Team</h3>
          <p className="text-cyber-muted text-sm relative z-10 font-mono">Update profiles of faculty and student coordinators.</p>
        </Link>
        <Link href="/admin/gallery" className="group glass-panel p-6 rounded-xl border border-cyber-primary/10 hover:border-cyber-accent transition-all relative overflow-hidden">
           <div className="absolute inset-0 bg-cyber-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <ImageIcon className="w-8 h-8 text-cyber-accent mb-4 group-hover:scale-110 transition-transform relative z-10" />
          <h3 className="text-lg font-bold mb-2 text-white relative z-10">Manage Gallery</h3>
          <p className="text-cyber-muted text-sm relative z-10 font-mono">Upload and organize gallery images.</p>
        </Link>
      </div>
    </main>
  );
}
