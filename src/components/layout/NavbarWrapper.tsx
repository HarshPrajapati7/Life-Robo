"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  
  // Hide navbar on simulation pages and IDE
  const shouldHideNavbar = (pathname.startsWith("/playground/") && pathname.split("/").length > 2) || pathname.startsWith("/ide");

  if (shouldHideNavbar) return null;

  return <Navbar />;
}
