export default function AdminTeamPage() {
  return (
    <main className="min-h-screen p-8 md:p-12 pt-24 bg-[#0a0a0a]">
       <div className="flex justify-between items-center mb-12">
           <h1 className="text-3xl font-bold font-display tracking-widest text-white uppercase glow-text">Personnel_Files</h1>
           <div className="px-3 py-1 bg-cyber-secondary/10 border border-cyber-secondary/30 rounded text-cyber-secondary text-xs font-mono">
                HR_LEVEL_CLEARANCE
           </div>
      </div>
      
      <div className="glass-panel p-12 rounded-xl border border-cyber-secondary/20 text-center">
        <div className="w-16 h-16 border-4 border-t-cyber-secondary border-r-transparent border-b-cyber-primary border-l-transparent rounded-full animate-spin mx-auto mb-6" />
        <p className="text-cyber-muted font-mono mb-6">cms_module_loading...</p>
        <button className="px-6 py-3 bg-cyber-secondary/10 border border-cyber-secondary text-cyber-secondary hover:bg-cyber-secondary hover:text-white transition-all font-bold uppercase tracking-wider rounded-none">
            Update_Roster
        </button>
      </div>
    </main>
  );
}
