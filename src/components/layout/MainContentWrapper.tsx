"use client";

import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function MainContentWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const shouldRemovePadding = (pathname.startsWith("/playground/") && pathname.split("/").length > 2) || pathname.startsWith("/ide");

  return (
    <div className={clsx(
        "flex-grow relative",
        !shouldRemovePadding && "pt-0" // Match navbar height (h-20 = 5rem = 80px)
    )}>
      {children}
    </div>
  );
}
