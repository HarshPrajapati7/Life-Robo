"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide navbar on simulation pages
  const isSimulationPage = pathname.startsWith("/playground/") && pathname.split("/").length > 2;

  if (isSimulationPage) return null;

  return <Navbar />;
}
