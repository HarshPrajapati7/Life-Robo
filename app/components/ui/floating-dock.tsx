"use client";

import Link from "next/link";
import { LayoutGroup, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type FloatingDockItem = {
  title: string;
  icon: ReactNode;
  href: string;
  external?: boolean;
};

type FloatingDockProps = {
  items: FloatingDockItem[];
  activeHref?: string;
  className?: string;
  mobileClassName?: string;
};

const containerClassName =
  "pointer-events-auto relative overflow-hidden rounded-full border border-white/15 bg-black/45 p-2 backdrop-blur-2xl";

const glowClassName =
  "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_0%,rgba(255,114,162,0.28),transparent_52%),radial-gradient(circle_at_80%_90%,rgba(255,144,88,0.24),transparent_50%)]";

function DockItem({ item, isActive }: { item: FloatingDockItem; isActive: boolean }) {
  const inner = (
    <motion.span
      whileHover={{ y: -2, scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      className={cn(
        "group relative flex h-11 w-11 items-center justify-center rounded-full text-white/75 transition-colors duration-200",
        isActive ? "text-white" : "hover:text-white"
      )}
    >
      {isActive && (
        <motion.span
          layoutId="dock-active-pill"
          className="absolute inset-0 rounded-full border border-white/20 bg-white/10 shadow-[0_0_24px_rgba(255,126,177,0.4)]"
          transition={{ type: "spring", stiffness: 420, damping: 34 }}
        />
      )}
      <span className="pointer-events-none absolute top-12 left-1/2 -translate-x-1/2 rounded-md border border-white/10 bg-black/80 px-2 py-1 text-xs text-white/90 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        {item.title}
      </span>
      <span className="relative z-[1] h-5 w-5">{item.icon}</span>
    </motion.span>
  );

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.title}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={item.href} aria-label={item.title}>
      {inner}
    </Link>
  );
}

function DockInner({
  items,
  activeHref,
  justifyClassName,
}: {
  items: FloatingDockItem[];
  activeHref?: string;
  justifyClassName: string;
}) {
  return (
    <div className={cn(containerClassName, justifyClassName)}>
      <div className={glowClassName} />
      <div className="relative flex items-center gap-1">
        {items.map((item) => (
          <DockItem key={item.title} item={item} isActive={activeHref === item.href} />
        ))}
      </div>
    </div>
  );
}

export function FloatingDock({
  items,
  activeHref,
  className,
  mobileClassName,
}: FloatingDockProps) {
  return (
    <LayoutGroup id="top-capsule-dock">
      <motion.div
        initial={{ y: -16, opacity: 0, scale: 0.96 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "pointer-events-none fixed inset-x-0 top-4 z-50 hidden justify-center sm:flex",
          className
        )}
      >
        <DockInner items={items} activeHref={activeHref} justifyClassName="px-2" />
      </motion.div>

      <motion.div
        initial={{ y: -14, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
        className={cn(
          "pointer-events-none fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:hidden",
          mobileClassName
        )}
      >
        <DockInner items={items} activeHref={activeHref} justifyClassName="w-full max-w-sm px-1.5" />
      </motion.div>
    </LayoutGroup>
  );
}
