"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  
  // Hide footer on simulation pages
  // Path pattern: /playground/[simId]
  const isSimulationPage = pathname.startsWith("/playground/") && pathname.split("/").length > 2;

  if (isSimulationPage) return null;

  return <Footer />;
}
