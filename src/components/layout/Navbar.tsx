"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import clsx from "clsx";

const desktopNavItems = [
  { name: "Home", href: "/" },
  { name: "Team", href: "/team" },
  { name: "Events", href: "/events" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact", href: "/contact" },
  { name: "Playground", href: "/playground" },
  { name: "IDE", href: "/ide" },
];

const mobileVisibleItems = [
  { name: "Home", href: "/" },
  { name: "Team", href: "/team" },
  { name: "Gallery", href: "/gallery" },
];

const mobileMenuItems = [
  { name: "Events", href: "/events" },
  { name: "Contact", href: "/contact" },
  { name: "Playground", href: "/playground" },
  { name: "IDE", href: "/ide" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/90 backdrop-blur-md border-b border-white/10">
      {/* Top decorative line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyber-cyan to-transparent opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center gap-4 group cursor-pointer">
            <div className="relative w-12 h-12 flex items-center justify-center bg-cyber-dark border border-white/10 rounded-sm tech-border-corner transition-all group-hover:border-cyber-cyan/50 p-1">
                 <Image src="/images/logo.png" alt="Life Robo Logo" width={48} height={48} className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
                <Link href="/" className="text-2xl font-bold text-white font-display tracking-widest leading-none group-hover:text-neon-cyan transition-colors">
                LIFE ROBO
                </Link>
                <span className="text-[10px] text-cyber-muted font-tech tracking-[0.1em] opacity-70 uppercase">University of Lucknow</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-1">
              {desktopNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    "px-4 py-2 text-xs font-bold transition-all duration-300 font-tech relative overflow-hidden group uppercase",
                    pathname === item.href
                      ? "text-black bg-cyber-cyan"
                      : "text-gray-400 hover:text-white"
                  )}
                >
                   <span className="relative z-10">{item.name}</span>
                   {pathname !== item.href && (
                       <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyber-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                   )}
                </Link>
              ))}
              
              <Link
                href="/login"
                className="ml-6 px-6 py-2 bg-transparent border border-cyber-pink text-white font-bold font-display text-sm hover:bg-cyber-pink hover:text-black transition-all duration-300 clip-path-polygon"
                style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
              >
                LOGIN
              </Link>
            </div>
          </div>

          {/* Mobile Navigation & Toggle */}
          <div className="flex md:hidden items-center">
            <div className="flex items-center mr-1">
                {mobileVisibleItems.filter(item => pathname !== item.href).map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="px-2 py-1 text-[9px] font-bold transition-all duration-300 font-tech relative overflow-hidden group uppercase text-gray-400 hover:text-white"
                    >
                        <span className="relative z-10">{item.name}</span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cyber-cyan transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </Link>
                ))}
            </div>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-cyber-cyan hover:bg-white/5 focus:outline-none"
            >
              {isOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-cyber-cyan/30">
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 font-tech">
            {/* Nav Sections inside Hamburger */}
            <div className="text-[10px] text-cyber-cyan/50 font-tech uppercase tracking-[0.2em] px-3 pt-4 pb-2">Central Ops</div>
            {mobileMenuItems.filter(i => ["Events", "Contact"].includes(i.name)).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "block px-3 py-3 text-base font-bold border-l-2 ml-2 transition-all uppercase",
                  pathname === item.href ? "border-cyber-cyan text-cyber-cyan bg-white/5" : "border-transparent text-gray-400"
                )}
              >
                {item.name}
              </Link>
            ))}

            <div className="text-[10px] text-cyber-yellow/50 font-tech uppercase tracking-[0.2em] px-3 pt-6 pb-2">Labs & Tools</div>
            {mobileMenuItems.filter(i => ["Playground", "IDE"].includes(i.name)).map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  "block px-3 py-3 text-base font-bold border-l-2 ml-2 transition-all uppercase",
                  pathname === item.href ? "border-cyber-yellow text-cyber-yellow bg-white/5" : "border-transparent text-gray-400"
                )}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="mx-3 mt-8 block text-center px-4 py-4 bg-cyber-pink/20 text-cyber-pink border border-cyber-pink font-bold uppercase tracking-widest font-display text-sm"
            >
              Member Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
