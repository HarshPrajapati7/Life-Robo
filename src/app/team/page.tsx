"use client";

import { teamData } from "@/lib/team-data";
import { motion } from "framer-motion";
import { useState } from "react";
import OverlayViewer from "@/components/ui/OverlayViewer";
import TeamCard from "@/components/ui/TeamCard";

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<typeof teamData[0]["members"][0] | null>(null);

  // Flattened member list for navigation
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
    <main className="min-h-screen px-4 md:px-8 py-24 pt-32">
      <OverlayViewer 
        data={selectedMember ? {
            src: selectedMember.image || "",
            title: selectedMember.name,
            subtitle: selectedMember.role,
            details: `A core member of the LIFE ROBO team specializing in ${selectedMember.branch}. Contributing to the advancement of robotics at the University of Lucknow.`,
            type: 'member',
            metadata: {
                "Department": selectedMember.branch || "N/A",
                "Year": selectedMember.year || "N/A",
                "Status": "Active Duty",
                "Access Level": "Member"
            }
        } : null}
        onClose={() => setSelectedMember(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
       
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
        >
            <span className="text-cyber-cyan font-tech tracking-widest uppercase text-sm mb-2 block">University of Lucknow</span>
            <h1 className="text-5xl md:text-7xl font-bold font-display uppercase tracking-tight text-white mb-6 leading-none py-2">
                Meet The <span className="inline-block text-cyber-cyan">Team</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto font-body text-lg">
                The passionate individuals driving innovation and shaping the future of robotics.
            </p>
        </motion.div>

        <div className="space-y-20">
          {teamData.map((section, sectionIdx) => (
            <motion.section 
                key={section.title} 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: sectionIdx * 0.2 }}
                className="relative"
            >
               <div className="flex items-end gap-4 mb-8 border-b border-white/10 pb-4">
                       <h2 className="text-3xl font-bold text-white font-display uppercase tracking-wide">
                           {section.title === "Robotics Club Leads" ? "Club Leadership" : section.title}
                       </h2>
                       <div className="h-4 w-4 bg-cyber-cyan/50 mb-1 skew-x-12"></div>
                       <span className="flex-1"></span>
                       <span className="text-cyber-cyan font-tech text-xs uppercase hidden sm:block">Sector {sectionIdx + 1}</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
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
