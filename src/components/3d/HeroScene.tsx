"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";
import * as THREE from "three";
import { Float, Line, Sphere, Stars, Sparkles } from "@react-three/drei";

function SceneReadyTracker() {
  const rendered = useRef(false);
  useFrame(() => {
    if (!rendered.current) {
      rendered.current = true;
      if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent("3d-ready"));
    }
  });
  return null;
}

function Atom(props: any) {
  const points = useMemo(() => new THREE.EllipseCurve(0, 0, 3, 1.15, 0, 2 * Math.PI, false, 0).getPoints(100), []);
  const points3d = useMemo(() => points.map(p => new THREE.Vector3(p.x, p.y, 0)), [points]);

  return (
    <group {...props}>
      {/* Electron Orbits */}
      <Line worldUnits points={points3d} color="#00f3ff" lineWidth={0.3} rotation={[0, 0, 1]} opacity={0.5} transparent />
      <Line worldUnits points={points3d} color="#00f3ff" lineWidth={0.3} rotation={[0, 0, -1]} opacity={0.5} transparent />
      <Line worldUnits points={points3d} color="#00f3ff" lineWidth={0.3} rotation={[0, 0, 0]} opacity={0.5} transparent />
      
      {/* Nucleus */}
      <Sphere args={[0.4, 64, 64]}>
        <meshStandardMaterial color="#ff5400" emissive="#ff5400" emissiveIntensity={3} toneMapped={false} />
      </Sphere>
      <pointLight intensity={2} distance={10} color="#ff5400" />
    </group>
  );
}

function Electron({ radius = 2.75, speed = 6, ...props }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (ref.current) {
      // Complex orbital movement
      ref.current.position.set(
        Math.sin(t) * radius, 
        (Math.cos(t) * radius * Math.atan(t)) / Math.PI / 1.25, 
        0
      );
    }
  });
  return (
    <group {...props}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.08]} />
        <meshBasicMaterial color="#00f3ff" toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function HeroScene() {
  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px]">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 10], fov: 45 }} className="rounded-2xl overflow-hidden bg-black/40 border border-white/5 shadow-2xl">
        <SceneReadyTracker />
        <Suspense fallback={null}>
          <Float speed={4} rotationIntensity={1} floatIntensity={1}>
            <Atom />
            <group rotation={[0, 0, 1]}>
              <Electron speed={2} radius={3} />
            </group>
            <group rotation={[0, 0, -1]}>
              <Electron speed={2.5} radius={3} />
            </group>
            <group rotation={[0, 0, 0]}>
              <Electron speed={3} radius={3} />
            </group>
          </Float>
          
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <Sparkles count={80} scale={10} size={1} speed={0.4} opacity={0.4} color="#00f3ff" />
        </Suspense>
        <fog attach="fog" args={["#0d0d0d", 5, 20]} />
      </Canvas>
    </div>
  );
}
