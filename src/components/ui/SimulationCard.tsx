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
      className="group cursor-pointer"
    >
      {/* Thumbnail */}
      <div className={`relative aspect-[16/10] overflow-hidden bg-[#0a0a0a] border transition-colors ${
          isActive ? "border-white/15" : "border-white/5 group-hover:border-white/10"
      }`}>
         <div className="absolute inset-0">
              <PreviewScene simId={sim.id} />
         </div>
      </div>

      {/* Info */}
      <div className="mt-3 px-0.5">
        <h3 className="text-white text-sm font-bold leading-tight group-hover:text-white/80 transition-colors">
            {sim.name}
        </h3>
        <p className="text-white/25 text-xs mt-0.5 line-clamp-1">
            {sim.missionName}
        </p>
      </div>
    </div>
  );
}
