"use client";

import { teamData } from "@/lib/team-data";
import { motion } from "framer-motion";
import { useState } from "react";
import OverlayViewer from "@/components/ui/OverlayViewer";
import TeamCard from "@/components/ui/TeamCard";

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<typeof teamData[0]["members"][0] | null>(null);

  const allMembers = teamData.flatMap(section => section.members);

  const handleNext = () => {
    if (!selectedMember) return;
    const currentIndex = allMembers.findIndex(m => m.name === selectedMember.name);
    const nextIndex = (currentIndex + 1) % allMembers.length;
    setSelectedMember(allMembers[nextIndex]);
  };

  const handlePrev = () => {
    if (!selectedMember) return;
    const currentIndex = allMembers.findIndex(m => m.name === selectedMember.name);
    const prevIndex = (currentIndex - 1 + allMembers.length) % allMembers.length;
    setSelectedMember(allMembers[prevIndex]);
  };

  return (
    <main className="min-h-screen px-6 md:px-12 pt-24 pb-16 bg-[#060608]/85">
      <OverlayViewer 
        data={selectedMember ? {
            src: selectedMember.image || "",
            title: selectedMember.name,
            subtitle: selectedMember.role,
            details: `${selectedMember.branch || "Engineering"} · ${selectedMember.year || ""}`,
            type: 'member',
            metadata: {
                "Department": selectedMember.branch || "N/A",
                "Year": selectedMember.year || "N/A"
            }
        } : null}
        onClose={() => setSelectedMember(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
       
      <div className="max-w-7xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16"
        >
            <h1 className="text-4xl md:text-5xl font-bold font-display uppercase tracking-tight text-white mb-3">
                Team
            </h1>
            <p className="text-white/30 text-sm max-w-md">
                The people behind LIFE ROBO at the University of Lucknow.
            </p>
        </motion.div>

        <div className="space-y-16">
          {teamData.map((section, sectionIdx) => (
            <motion.section 
                key={section.title} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIdx * 0.1 }}
            >
               <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-3">
                  <h2 className="text-xl font-bold text-white font-display uppercase tracking-wide">
                      {section.title === "Robotics Club Leads" ? "Club Leadership" : section.title}
                  </h2>
                  <span className="flex-1"></span>
                  <span className="text-white/15 font-tech text-[10px] uppercase tracking-widest">{section.members.length} members</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {section.members.map((member, idx) => (
                  <TeamCard 
                    key={`${member.name}-${idx}`}
                    member={member}
                    onClick={() => setSelectedMember(member)}
                  />
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </main>
  );
}
