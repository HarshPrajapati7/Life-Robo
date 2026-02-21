"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import EditorCode from "./EditorCode";
import { BorderBeam } from "./ui/BorderBeam";

const LaserFlow = dynamic(() => import("./ui/LaserFlow"), {
  ssr: false,
  loading: () => <div />,
});

export default function Hero() {
  const [output, setOutput] = useState("");
  const [outputType, setOutputType] = useState<"success" | "error" | "idle">("idle");
  const [isRunning, setIsRunning] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleRunResult = (result: { output: string; type: "success" | "error" | "idle" }) => {
    setOutput(result.output);
    setOutputType(result.type);
    // Scroll to output after a tick
    setTimeout(() => {
      outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <>
      {/* FULL-SCREEN LaserFlow + Editor */}
      <section
        className="relative w-full overflow-hidden"
        style={{ height: "100vh", backgroundColor: "#010008" }}
      >
        {/* LaserFlow — fills entire viewport, z-0 */}
        <div className="absolute inset-0 z-0">
          <LaserFlow
            color="#4488ff"
            horizontalSizing={0.51}
            verticalSizing={1.5}
            wispDensity={1}
            flowSpeed={0.35}
            flowStrength={0.25}
            fogIntensity={0.45}
            fogScale={0.3}
            fogFallSpeed={0.6}
            decay={1.1}
            falloffStart={1.2}
            mouseTiltStrength={0.01}
          />
        </div>

        {/* Ambient radial glow behind laser — adds depth like Huly */}
        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 40% 70% at 50% 30%, rgba(0, 80, 255, 0.08) 0%, transparent 100%),
              radial-gradient(ellipse 60% 40% at 50% 85%, rgba(0, 40, 180, 0.06) 0%, transparent 100%)
            `,
          }}
        />

        {/* Subtle vignette edges for cinematic feel */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background: `
              linear-gradient(to right, rgba(1, 0, 8, 0.4) 0%, transparent 15%, transparent 85%, rgba(1, 0, 8, 0.4) 100%)
            `,
          }}
        />

        {/* Hero headline — positioned in upper portion, above editor */}
        <div
  className="absolute z-[5] flex w-full flex-col items-start pointer-events-none"
  style={{
    top: "8%",
    left: 0,
    paddingLeft: "clamp(40px, 8vw, 160px)",
  }}
>
  <h1
    style={{
      fontFamily:
        "'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: "clamp(48px, 7vw, 96px)",
      fontWeight: 700,
      lineHeight: 1.05,
      letterSpacing: "-0.03em",
      // Moving the gradient logic entirely to inline styles to avoid conflicts
      background:
        "linear-gradient(180deg, #ffffff 0%, #ffffff 30%, #a0a0b0 60%, #6b6b80 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      maxWidth: "600px",
    }}
  >
    Talk to{"\n"}machines
  </h1>
  <p
    style={{
      fontFamily:
        "'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: "clamp(14px, 1.3vw, 18px)",
      fontWeight: 400,
      lineHeight: 1.6,
      color: "rgba(255, 255, 255, 0.45)",
      maxWidth: "420px",
      marginTop: "16px",
    }}
  >
    Write, compile &amp; run C/C++ code instantly — right in your browser.
  </p>
</div>

        {/* Editor card — bottom portion, flush to bottom edge */}
        <div className="absolute inset-0 z-[6] flex items-end justify-center pb-6 sm:pb-8">
          <div
            className="relative"
            style={{
              width: "min(900px, calc(100% - 3rem))",
              height: "min(50vh, 560px)",
              borderRadius: "16px 16px 0 0",
              overflow: "hidden",
              borderTop: "1.5px solid rgba(68, 136, 255, 0.15)",
              borderLeft: "1.5px solid rgba(68, 136, 255, 0.15)",
              borderRight: "1.5px solid rgba(68, 136, 255, 0.15)",
              boxShadow: `
                0 -10px 60px rgba(68, 136, 255, 0.07),
                0 0 100px rgba(68, 136, 255, 0.04)
              `,
              background: "#020510",
            }}
          >
            {/* BorderBeam animations */}
            <BorderBeam
              size={200}
              duration={8}
              colorFrom="#4488ff"
              colorTo="#88ccff"
              borderThickness={1}
              beamBorderRadius={16}
              glowIntensity={2}
            />
            <BorderBeam
              size={150}
              duration={8}
              delay={4}
              colorFrom="#66aaff"
              colorTo="#4488ff"
              borderThickness={1}
              reverse
              beamBorderRadius={16}
              glowIntensity={1}
            />
            {/* Glow line at top of editor card */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
              style={{
                width: "50%",
                height: "1px",
                background: "linear-gradient(90deg, transparent 0%, rgba(100, 170, 255, 0.5) 30%, rgba(120, 190, 255, 0.8) 50%, rgba(100, 170, 255, 0.5) 70%, transparent 100%)",
              }}
            />
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 z-10 pointer-events-none"
              style={{
                width: "30%",
                height: "30px",
                background: "radial-gradient(ellipse at 50% 0%, rgba(60, 140, 255, 0.12) 0%, transparent 100%)",
              }}
            />
            <EditorCode
              onRunResult={handleRunResult}
              isRunning={isRunning}
              setIsRunning={setIsRunning}
            />
          </div>
        </div>
      </section>

      {/* OUTPUT SECTION — below the fold, scroll to see */}
      <section
        ref={outputRef}
        className="relative w-full min-h-[50vh]"
        style={{
          background: "linear-gradient(to bottom, #010008 0%, #000510 30%, #000818 100%)",
        }}
      >
        {/* Top edge glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[2px] pointer-events-none"
          style={{
            background: "linear-gradient(90deg, transparent 0%, rgba(0, 110, 255, 0.5) 30%, rgba(0, 110, 255, 0.8) 50%, rgba(0, 110, 255, 0.5) 70%, transparent 100%)",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[40%] h-[60px] pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at 50% 0%, rgba(0, 80, 255, 0.2) 0%, transparent 100%)",
          }}
        />

        <div className="max-w-[900px] mx-auto px-6 pt-10 pb-16">
          {/* Output header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{
                  backgroundColor:
                    isRunning
                      ? "#3b82f6"
                      : outputType === "success"
                      ? "#34aed3"
                      : outputType === "error"
                      ? "#f87171"
                      : "#ffffff20",
                  boxShadow:
                    isRunning
                      ? "0 0 10px #3b82f6"
                      : outputType === "success"
                      ? "0 0 10px #34d399"
                      : outputType === "error"
                      ? "0 0 10px #f87171"
                      : "none",
                }}
              />
              <span
                className="text-sm font-medium tracking-wide"
                style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Fira Code', monospace" }}
              >
                OUTPUT
              </span>
            </div>

            {outputType === "success" && (
              <span className="text-[10px] px-2 py-0.5 rounded-full border" style={{ background: 'rgba(52, 211, 153, 0.12)', color: '#6ee7b7', borderColor: 'rgba(52, 211, 153, 0.3)' }}>
                ✓ Compiled Successfully
              </span>
            )}
            {outputType === "error" && (
              <span className="text-[10px] px-2 py-0.5 rounded-full border" style={{ background: 'rgba(248, 113, 113, 0.12)', color: '#fca5a5', borderColor: 'rgba(248, 113, 113, 0.3)' }}>
                ✕ Error
              </span>
            )}
            {isRunning && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1.5">
                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Running…
              </span>
            )}
          </div>

          {/* Output content */}
          <div
            className="rounded-xl overflow-hidden"
            style={{
              backgroundColor: "rgba(2, 5, 16, 0.95)",
              border: "1px solid rgba(0, 80, 220, 0.2)",
              backdropFilter: "blur(20px)",
              minHeight: "200px",
              boxShadow: "0 0 40px rgba(0, 50, 180, 0.06)",
            }}
          >
            <pre
              className={`p-6 text-sm leading-relaxed overflow-auto max-h-[60vh]`}
              style={{
                fontFamily: "'Fira Code', monospace",
                color:
                  outputType === "error"
                    ? "#fca5a5"
                    : outputType === "success"
                    ? "#86efac"
                    : "rgba(255,255,255,0.25)",
              }}
            >
              {isRunning ? (
                <span className="text-blue-400/60 flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Compiling &amp; executing…
                </span>
              ) : output ? (
                output
              ) : (
                "Press Run to see output here..."
              )}
            </pre>
          </div>
        </div>
      </section>
    </>
  );
}
