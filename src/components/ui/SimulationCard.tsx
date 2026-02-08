
import PreviewScene from "@/components/3d/PreviewScene";

import { Simulation } from "@/lib/simulations";

interface SimulationCardProps {
  sim: Simulation;
  isActive?: boolean;
  onSelect?: () => void;
  onStart?: () => void;
}

export default function SimulationCard({ sim, isActive = false, onSelect, onStart }: SimulationCardProps) {
  return (
    <div 
      onClick={onStart}
      onMouseEnter={onSelect}
      className="group cursor-pointer flex flex-col gap-3 relative z-10"
    >
      {/* Thumbnail Container */}
      <div className={`relative aspect-video rounded-xl overflow-hidden bg-white/5 border transition-all ${
          isActive ? "border-cyber-primary shadow-[0_0_20px_rgba(0,243,255,0.2)]" : "border-white/10 group-hover:border-white/30"
      }`}>
         <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-50 z-20" />
         
         <div className="absolute inset-0 z-0 bg-[#050505]">
            <div className="absolute inset-0 bg-cyber-grid opacity-20" />
             <PreviewScene simId={sim.id} />
         </div>
         

      </div>

      {/* Info Section */}
      <div className="flex flex-col px-1 mt-2">
        <h3 className="text-white font-bold text-sm leading-tight group-hover:text-cyber-primary transition-colors uppercase">
            {sim.name}
        </h3>
        <p className="text-white/40 text-xs mt-1 font-medium">
            {sim.missionName}
        </p>
         <p className="text-white/30 text-[10px] mt-0.5 line-clamp-1 leading-relaxed font-mono">
            {sim.description}
        </p>
      </div>
    </div>
  );
}
