"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function MainContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSimulationPage = pathname.startsWith("/playground/") && pathname.split("/").length > 2;

  return (
    <div className={clsx(
        "flex-grow relative",
        !isSimulationPage && "pt-20" // Match navbar height (h-20 = 5rem = 80px)
    )}>
      {children}
    </div>
  );
}
