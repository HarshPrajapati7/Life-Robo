"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const desktopNavItems = [
  { name: "Home", href: "/" },
  { name: "Team", href: "/team" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
  { name: "Playground", href: "/playground" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Prefetch page assets on hover so they're cached before navigation
  const handleLinkHover = useCallback((href: string) => {
    const pageMap: Record<string, "home" | "gallery" | "events" | "team"> = {
      "/": "home",
      "/gallery": "gallery",
      "/events": "events",
      "/team": "team",
    };
  }, []);

  return (
    <nav className="absolute top-0 w-full z-50 bg-[#060608]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group cursor-pointer" onClick={() => setIsOpen(false)}>
            <h1 className="text-lg font-black font-display tracking-[0.15em] leading-none">
              <span className="text-cyber-green">LIFE</span>
              <span className="text-white/40 ml-1.5">ROBO</span>
            </h1>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {desktopNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onMouseEnter={() => handleLinkHover(item.href)}
                  className={clsx(
                    "px-3 py-1.5 text-[11px] font-bold transition-all duration-200 font-tech uppercase tracking-wider",
                    pathname === item.href
                      ? "text-white"
                      : "text-white/30 hover:text-white/70"
                  )}
                >
                   {item.name}
                </Link>
              ))}
              
              <Link
                href="/login"
                className="ml-4 px-5 py-1.5 bg-white text-black font-bold font-display text-[11px] uppercase tracking-wider hover:bg-white/90 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>

          {/* Mobile Nav Button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-white/50 hover:text-white transition-colors"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#060608] border-b border-white/5 h-screen">
          <div className="px-6 pt-8 pb-6 space-y-4 flex flex-col items-center">
            {desktopNavItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "block px-3 py-2 text-lg font-black font-display uppercase tracking-widest transition-colors",
                  pathname === item.href ? "text-white" : "text-white/20 hover:text-white/60"
                )}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="mt-8 px-10 py-3 bg-white text-black font-bold uppercase tracking-wider font-display text-sm"
            >
              Member Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
