
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
      whileHover={{ y: -3 }}
      onClick={onClick}
      className="group relative bg-white/[0.02] border border-white/5 p-5 md:p-6 hover:border-white/15 transition-colors cursor-pointer h-full"
    >
      <div className="flex flex-col md:flex-row items-center md:items-center gap-4 mb-4">
          <div className="w-12 h-12 md:w-14 md:h-14 flex-shrink-0 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden relative">
                {member.image ? (
                  <Image src={member.image} alt={member.name} width={64} height={64} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xl font-bold text-white/60 font-display">{member.name.charAt(0)}</span>
                )}
          </div>
          <div className="overflow-hidden text-center md:text-left w-full">
              <h3 className="text-sm md:text-base font-bold text-white tracking-wide leading-tight mb-1">
                  {member.name}
              </h3>
              <p className="text-white/40 text-[10px] md:text-xs font-tech tracking-wider uppercase truncate">{member.role}</p>
          </div>
      </div>
      
      <div className="border-t border-white/5 pt-3 mt-2">
          <div className="flex justify-between items-center text-[10px] font-tech text-white/25 uppercase tracking-widest">
              <span>{member.branch || "N/A"}</span>
              <span>{member.year ? `YR: ${member.year}` : ""}</span>
          </div>
      </div>
    </motion.div>
  );
}
