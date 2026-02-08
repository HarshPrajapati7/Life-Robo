"use client";

import LoadingWave from "../ui/LoadingWave";

export default function SimulationLoader() {
  return (
    <div className="fixed inset-0 z-[100] bg-[#030305] flex items-center justify-center overflow-hidden overscroll-none touch-none">
      <div className="absolute inset-0 bg-cyber-grid opacity-5 pointer-events-none" />
      <LoadingWave size="md" />
      <div className="scanline opacity-10" />
    </div>
  );
}
