"use client";
import React, { useRef, useEffect, useCallback } from "react";

export const CanvasRevealEffect = ({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 255, 255]],
  containerClassName,
  dotSize = 3,
  showGradient = true,
}: {
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, time: number) => {
      ctx.clearRect(0, 0, width, height);
      const gap = 4;
      const cols = Math.ceil(width / (dotSize + gap));
      const rows = Math.ceil(height / (dotSize + gap));
      const centerX = width / 2;
      const centerY = height / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * (dotSize + gap);
          const y = j * (dotSize + gap);

          const dx = x - centerX;
          const dy = y - centerY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = Math.sqrt(centerX * centerX + centerY * centerY);

          const seed = Math.sin(i * 12.9898 + j * 78.233) * 43758.5453;
          const rand = seed - Math.floor(seed);

          const introOffset = (dist / maxDist) * 2 + rand * 0.3;
          const animTime = time * animationSpeed;

          if (animTime < introOffset) continue;

          const frequency = 5.0;
          const showOffset = rand;
          const flickerSeed = Math.sin(
            (i * 12.9898 + j * 78.233) *
              Math.floor(time / frequency + showOffset + frequency + 1)
          ) * 43758.5453;
          const flickerRand = flickerSeed - Math.floor(flickerSeed);

          const opacityIndex = Math.min(
            Math.floor(Math.abs(flickerRand) * opacities.length),
            opacities.length - 1
          );
          let opacity = opacities[opacityIndex];

          const fadeIn = Math.min((animTime - introOffset) / 0.5, 1);
          opacity *= fadeIn;

          const colorIndex = Math.min(
            Math.floor(Math.abs(flickerRand) * colors.length),
            colors.length - 1
          );
          const color = colors[colorIndex];

          ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`;
          ctx.fillRect(x, y, dotSize, dotSize);
        }
      }
    },
    [animationSpeed, colors, dotSize, opacities]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);
    startTimeRef.current = performance.now();

    const animate = () => {
      const elapsed = (performance.now() - startTimeRef.current) / 1000;
      const rect = container.getBoundingClientRect();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const dpr = window.devicePixelRatio || 1;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(ctx, rect.width, rect.height, elapsed);
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationRef.current);
    };
  }, [draw]);

  return (
    <div
      ref={containerRef}
      className={`h-full relative w-full ${containerClassName ?? ""}`}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {showGradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent to-[84%]" />
      )}
    </div>
  );
};

export default CanvasRevealEffect;
