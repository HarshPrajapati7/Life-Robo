"use client";

import { useEffect, useRef } from "react";
import { Terminal as XTerminal } from "lucide-react";

interface TerminalProps {
  logs: string[];
  height?: number; // Optional custom height logic if needed
}

export default function Terminal({ logs }: TerminalProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  return (
    <div className="h-full flex flex-col bg-black/60 border-t border-white/10 font-mono text-xs">
      <div className="h-8 flex items-center justify-between px-4 bg-black/40 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-2 text-[10px] font-tech text-gray-400 uppercase tracking-widest">
            <XTerminal size={12} /> Terminal Output
        </div>
        <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50 animate-pulse" />
            <span className="text-[9px] text-gray-600 font-tech">READY</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-1 cust-scrollbar">
        {logs.length === 0 && (
          <div className="text-gray-700 italic px-2">Waiting for output...</div>
        )}
        {logs.map((log, i) => (
          <div key={i} className="leading-tight break-all">
             <span className={`${
               log.includes('[ERR]') ? 'text-red-400' :
               log.includes('[WARN]') ? 'text-yellow-400' :
               log.includes('[SUCCESS]') ? 'text-green-400' :
               log.includes('[SYSTEM]') ? 'text-cyber-cyan' :
               'text-gray-300'
             }`}>
               {log}
             </span>
          </div>
        ))}
        <div ref={endRef} />
      </div>
    </div>
  );
}
