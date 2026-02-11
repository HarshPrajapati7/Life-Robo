"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.([^<>()[\]\\.,;:\s@"]+))*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
        setError("Please enter your full name.");
        return;
    }

    if (!validateEmail(email)) {
        setError("Please enter a valid email address.");
        return;
    }

    if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
    }

    if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

    setIsLoading(true);
    
    // Mock registration logic
    const role = "member";
    
    setTimeout(() => {
        localStorage.setItem("liferobo_user", JSON.stringify({ name, email, role }));
        setIsLoading(false);
        router.push("/dashboard");
    }, 1500);
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-[#060608]/85">
      <div className="w-full max-w-sm">
        <div className="p-8 border border-white/5 bg-white/[0.01]">
            
            <div className="mb-8">
                <h1 className="text-2xl font-black text-white font-display mb-1 uppercase tracking-wider">
                    Join Team
                </h1>
                <p className="text-white/25 text-xs">Create your member account</p>
            </div>
            
            <form onSubmit={handleRegister} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/30 font-tech uppercase tracking-widest">Full Name</label>
                <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-white/30 focus:outline-none text-white font-body transition-all placeholder:text-white/10 text-sm" 
                    placeholder="John Doe" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/30 font-tech uppercase tracking-widest">Email</label>
                <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-white/30 focus:outline-none text-white font-body transition-all placeholder:text-white/10 text-sm" 
                    placeholder="you@email.com" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/30 font-tech uppercase tracking-widest">Password</label>
                <input 
                    type="password" 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-white/30 focus:outline-none text-white font-body transition-all placeholder:text-white/10 text-sm" 
                    placeholder="••••••••" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-white/30 font-tech uppercase tracking-widest">Confirm Password</label>
                <input 
                    type="password" 
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-0 py-3 bg-transparent border-b border-white/10 focus:border-white/30 focus:outline-none text-white font-body transition-all placeholder:text-white/10 text-sm" 
                    placeholder="••••••••" 
                />
              </div>

              {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-red-500/5 border border-red-500/10 text-red-400 text-[11px] font-tech"
                  >
                      {error}
                  </motion.div>
              )}
              
              <button 
                disabled={isLoading}
                className="w-full py-3.5 bg-white text-black font-bold font-display text-sm uppercase tracking-wider hover:bg-white/90 active:scale-[0.98] transition-all disabled:opacity-50"
              >
                {isLoading ? "Creating Account..." : "Register"}
              </button>
              
              <div className="flex justify-center items-center text-[10px] text-white/20 font-tech pt-1 space-x-1">
                  <span>Already a member?</span>
                  <Link href="/login" className="text-white/30 hover:text-white/60 transition-colors uppercase tracking-wider font-bold">Sign In</Link>
              </div>
            </form>
        </div>
      </div>
    </main>
  );
}
