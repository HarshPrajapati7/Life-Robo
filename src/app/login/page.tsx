"use client";

import { useState } from "react";
import { Info } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Determine role based on email
    const role = email.toLowerCase().includes("admin") ? "admin" : "member";
    
    setTimeout(() => {
        // Store session mockup
        localStorage.setItem("liferobo_user", JSON.stringify({ email, role }));
        setIsLoading(false);
        router.push("/dashboard");
    }, 1200);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">

      <div className="glass-panel p-8 w-full max-w-md border border-white/10 relative z-10 backdrop-blur-xl">
        <h1 className="text-3xl font-bold text-white font-display mb-2 text-center tracking-widest uppercase">
            Member Login
        </h1>
        <p className="text-center text-gray-500 text-xs font-tech mb-8 uppercase tracking-wide">Enter your credentials to access member area</p>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-cyber-cyan font-tech uppercase tracking-wider">Email Address</label>
            <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyber-cyan focus:outline-none text-white font-body transition-all" 
                placeholder="user@liferobo.com" 
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold text-cyber-cyan font-tech uppercase tracking-wider">Password</label>
            <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 focus:border-cyber-cyan focus:outline-none text-white font-body transition-all" 
                placeholder="••••••••" 
            />
          </div>
          
          <button 
            disabled={isLoading}
            className="w-full bg-cyber-pink hover:bg-cyber-pink/90 text-black py-4 font-bold transition-all uppercase tracking-widest font-display text-sm"
          >
            {isLoading ? "Logging in..." : "Log In"}
          </button>
          
          <p className="text-center text-xs text-gray-400 font-body mt-4">
            Don&apos;t have an account? <Link href="/contact" className="text-cyber-cyan hover:underline">Request access</Link>
          </p>
        </form>

        {/* Test Credentials Box */}
        <div className="mt-8 p-4 border border-cyber-yellow/20 bg-cyber-yellow/5">
            <div className="flex items-center gap-2 text-[10px] text-cyber-yellow font-tech uppercase tracking-widest mb-3">
                <Info size={14} /> Sandbox Testing Credentials
            </div>
            <div className="space-y-3">
                <div className="flex justify-between items-center text-[10px] font-tech text-white">
                    <div className="opacity-80">
                        <span className="text-gray-500 uppercase block">Admin</span>
                        <span>admin@liferobo.uni.edu</span>
                    </div>
                    <code className="bg-white/5 px-2 py-1 text-cyber-cyan">admin123</code>
                </div>
                <div className="flex justify-between items-center text-[10px] font-tech text-white">
                    <div className="opacity-80">
                        <span className="text-gray-500 uppercase block">Member</span>
                        <span>member@liferobo.uni.edu</span>
                    </div>
                    <code className="bg-white/5 px-2 py-1 text-cyber-cyan">member123</code>
                </div>
            </div>
        </div>
      </div>
    </main>
  );
}
