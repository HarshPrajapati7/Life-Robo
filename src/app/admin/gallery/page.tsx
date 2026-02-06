export default function AdminGalleryPage() {
  return (
    <main className="min-h-screen p-8 md:p-12 pt-24 bg-[#0a0a0a]">
       <div className="flex justify-between items-center mb-12">
           <h1 className="text-3xl font-bold font-display tracking-widest text-white uppercase glow-text">Media_Archive</h1>
           <div className="px-3 py-1 bg-cyber-accent/10 border border-cyber-accent/30 rounded text-cyber-accent text-xs font-mono">
                ARCHIVE_ACCESS
           </div>
      </div>
      
      <div className="glass-panel p-12 rounded-xl border border-cyber-accent/20 text-center">
        <div className="w-16 h-16 border-4 border-t-cyber-accent border-r-transparent border-b-cyber-primary border-l-transparent rounded-full animate-spin mx-auto mb-6" />
        <p className="text-cyber-muted font-mono mb-6">cms_module_loading...</p>
        <button className="px-6 py-3 bg-cyber-accent/10 border border-cyber-accent text-cyber-accent hover:bg-cyber-accent hover:text-white transition-all font-bold uppercase tracking-wider rounded-none">
            Upload_Data
        </button>
      </div>
    </main>
  );
}
