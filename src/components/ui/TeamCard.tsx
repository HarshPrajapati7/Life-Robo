
import { motion } from "framer-motion";
import Image from "next/image";
import { TeamMember } from "@/lib/team-data";

interface TeamCardProps {
  member: TeamMember;
  onClick?: () => void;
}

export default function TeamCard({ member, onClick }: TeamCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="group relative bg-black border border-white/10 p-3 md:p-6 hover:border-cyber-cyan/50 transition-colors cursor-pointer h-full"
    >
        {/* Tech Corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-l border-t border-cyber-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute top-0 right-0 w-2 h-2 border-r border-t border-cyber-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-cyber-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-cyber-cyan opacity-50 group-hover:opacity-100 transition-opacity"></div>

      <div className="flex flex-col md:flex-row items-center md:items-center gap-4 mb-4">
          <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 rounded-none bg-cyber-dark border border-white/20 flex items-center justify-center overflow-hidden relative group-hover:border-cyber-cyan transition-colors">
                {/* Scanline on image */}
                <div className="absolute inset-0 scanline opacity-20 pointer-events-none mix-blend-overlay"></div>
                {member.image ? (
                  <Image src={member.image} alt={member.name} width={64} height={64} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-white font-display">{member.name.charAt(0)}</span>
                )}
          </div>
          <div className="overflow-hidden text-center md:text-left w-full">
              <h3 className="text-sm md:text-lg font-bold text-white font-display uppercase tracking-wide leading-tight mb-1">
                  {member.name}
              </h3>
              <p className="text-cyber-cyan text-[10px] md:text-xs font-tech tracking-wider uppercase truncate">{member.role}</p>
          </div>
      </div>
      
      <div className="border-t border-white/10 pt-4 mt-2">
          <div className="flex justify-between items-center text-xs font-tech text-gray-500 uppercase tracking-widest">
              <span>{member.branch || "N/A"}</span>
              <span>{member.year ? `YR: ${member.year}` : ""}</span>
          </div>
      </div>
      
      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-cyber-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
    </motion.div>
  );
}
