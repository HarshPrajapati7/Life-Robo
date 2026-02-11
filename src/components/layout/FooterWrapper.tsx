"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  
  // Hide footer on simulation pages
  // Path pattern: /playground/[simId]
  // Hide footer on simulation pages and IDE
  // Path pattern: /playground/[simId]
  const shouldHideFooter = (pathname.startsWith("/playground/") && pathname.split("/").length > 2) || pathname.startsWith("/ide");

  if (shouldHideFooter) return null;

  return <Footer />;
}
