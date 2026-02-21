"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export type ChromaGridItem = {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
};

type ChromaGridProps = {
  items?: ChromaGridItem[];
  className?: string;
  radius?: number;
  columns?: number;
  rows?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
};

const fallbackItems: ChromaGridItem[] = [
  {
    image: "https://i.pravatar.cc/300?img=8",
    title: "Alex Rivera",
    subtitle: "Full Stack Developer",
    handle: "@alexrivera",
    borderColor: "#4F46E5",
    gradient: "linear-gradient(145deg, #4F46E5, #000)",
    url: "https://github.com/",
  },
  {
    image: "https://i.pravatar.cc/300?img=11",
    title: "Jordan Chen",
    subtitle: "DevOps Engineer",
    handle: "@jordanchen",
    borderColor: "#10B981",
    gradient: "linear-gradient(210deg, #10B981, #000)",
    url: "https://linkedin.com/in/",
  },
  {
    image: "https://i.pravatar.cc/300?img=3",
    title: "Morgan Blake",
    subtitle: "UI/UX Designer",
    handle: "@morganblake",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(165deg, #F59E0B, #000)",
    url: "https://dribbble.com/",
  },
  {
    image: "https://i.pravatar.cc/300?img=16",
    title: "Casey Park",
    subtitle: "Data Scientist",
    handle: "@caseypark",
    borderColor: "#EF4444",
    gradient: "linear-gradient(195deg, #EF4444, #000)",
    url: "https://kaggle.com/",
  },
  {
    image: "https://i.pravatar.cc/300?img=25",
    title: "Sam Kim",
    subtitle: "Mobile Developer",
    handle: "@thesamkim",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(225deg, #8B5CF6, #000)",
    url: "https://github.com/",
  },
  {
    image: "https://i.pravatar.cc/300?img=60",
    title: "Tyler Rodriguez",
    subtitle: "Cloud Architect",
    handle: "@tylerrod",
    borderColor: "#06B6D4",
    gradient: "linear-gradient(135deg, #06B6D4, #000)",
    url: "https://aws.amazon.com/",
  },
];

export const ChromaGrid = ({
  items,
  className = "",
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = "power3.out",
}: ChromaGridProps) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const fadeRef = useRef<HTMLDivElement | null>(null);
  const setXRef = useRef<((value: number) => void) | null>(null);
  const setYRef = useRef<((value: number) => void) | null>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const data = items?.length ? items : fallbackItems;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    setXRef.current = gsap.quickSetter(el, "--x", "px") as (value: number) => void;
    setYRef.current = gsap.quickSetter(el, "--y", "px") as (value: number) => void;

    const { width, height } = el.getBoundingClientRect();
    posRef.current = { x: width / 2, y: height / 2 };
    setXRef.current(posRef.current.x);
    setYRef.current(posRef.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(posRef.current, {
      x,
      y,
      duration: damping,
      ease,
      overwrite: true,
      onUpdate: () => {
        setXRef.current?.(posRef.current.x);
        setYRef.current?.(posRef.current.y);
      },
    });
  };

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    if (fadeRef.current) {
      gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
    }
  };

  const handleLeave = () => {
    if (fadeRef.current) {
      gsap.to(fadeRef.current, { opacity: 1, duration: fadeOut, overwrite: true });
    }
  };

  const handleCardClick = (url?: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleCardMove = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const gridStyle = {
    "--r": `${radius}px`,
    "--cols": columns,
    "--rows": rows,
  } as React.CSSProperties;

  return (
    <div
      ref={rootRef}
      className={`chroma-grid ${className}`.trim()}
      style={gridStyle}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((item, index) => (
        <article
          key={`${item.title}-${index}`}
          className="chroma-card"
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(item.url)}
          style={
            {
              "--card-border": item.borderColor ?? "transparent",
              "--card-gradient": item.gradient ?? "linear-gradient(145deg, #3B82F6, #000)",
              cursor: item.url ? "pointer" : "default",
            } as React.CSSProperties
          }
        >
          <div className="chroma-img-wrapper">
            <img src={item.image} alt={item.title} loading="lazy" />
          </div>
          <footer className="chroma-info">
            <h3 className="name">{item.title}</h3>
            {item.handle ? <span className="handle">{item.handle}</span> : null}
            <p className="role">{item.subtitle}</p>
            {item.location ? <span className="location">{item.location}</span> : null}
          </footer>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid;
