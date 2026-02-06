export default function IDEPage() {
  return (
    <main className="h-[calc(100vh-64px)] w-full flex flex-col md:flex-row bg-[#050505] overflow-hidden">
      <div className="w-full md:w-64 border-r border-white/5 bg-[#0a0a0a] flex flex-col">
        <div className="p-4 border-b border-white/5">
             <h2 className="text-xs font-bold text-cyber-muted uppercase tracking-widest flex items-center justify-between">
                 Explorer <span className="text-[10px] text-cyber-primary">v1.2</span>
             </h2>
        </div>
        <div className="space-y-0.5 p-2">
           <div className="px-3 py-1.5 bg-cyber-primary/10 border-l-2 border-cyber-primary rounded-r text-sm text-white cursor-pointer font-mono flex items-center gap-2">
               <span className="text-cyber-primary">#</span> main.py
           </div>
           <div className="px-3 py-1.5 hover:bg-white/5 border-l-2 border-transparent rounded-r text-sm text-cyber-muted cursor-pointer font-mono flex items-center gap-2 transition-colors">
               <span className="text-cyber-muted">#</span> utils.py
           </div>
        </div>
      </div>
      
      <div className="flex-grow flex flex-col bg-[#020202] relative">
         {/* Editor Tabs */}
        <div className="h-10 border-b border-white/5 bg-[#0a0a0a] flex items-center">
           <div className="px-4 h-full bg-[#020202] border-t-2 border-cyber-secondary text-sm text-white flex items-center font-mono border-r border-white/5">
               main.py
           </div>
        </div>
        
        {/* Editor Content Area */}
        <div className="flex-grow p-4 font-mono text-sm text-cyber-text overflow-auto">
             <div className="flex gap-4">
                 <div className="text-cyber-muted/30 text-right select-none">1</div>
                 <div><span className="text-cyber-secondary">import</span> <span className="text-white">robotics</span></div>
             </div>
             <div className="flex gap-4">
                 <div className="text-cyber-muted/30 text-right select-none">2</div>
                 <div></div>
             </div>
             <div className="flex gap-4">
                 <div className="text-cyber-muted/30 text-right select-none">3</div>
                 <div><span className="text-cyber-secondary">def</span> <span className="text-cyber-primary">initialize_system</span>():</div>
             </div>
              <div className="flex gap-4">
                 <div className="text-cyber-muted/30 text-right select-none">4</div>
                 <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">robotics.connect(</span><span className="text-[#a5ff90]">&quot;ws://localhost:8080&quot;</span><span className="text-white">)</span></div>
             </div>
             <div className="flex gap-4">
                 <div className="text-cyber-muted/30 text-right select-none">5</div>
                 <div>&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-white">print(</span><span className="text-[#a5ff90]">&quot;System Online&quot;</span><span className="text-white">)</span></div>
             </div>
             
             {/* Cursor */}
             <div className="flex gap-4 animate-pulse mt-1">
                 <div className="text-cyber-muted/30 text-right select-none">6</div>
                 <div className="w-2 h-4 bg-cyber-primary"></div>
             </div>
        </div>
        
        {/* Status Bar */}
        <div className="h-6 bg-cyber-primary/10 border-t border-cyber-primary/20 flex items-center justify-between px-4 text-[10px] text-cyber-primary font-mono uppercase tracking-wider">
            <div>READY</div>
            <div className="flex gap-4">
                <span>Ln 6, Col 1</span>
                <span>UTF-8</span>
                <span>PYTHON</span>
            </div>
        </div>
      </div>
    </main>
  );
}
