"use client";

import React from "react";

export function WopeBackground({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#060010]">

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
}
