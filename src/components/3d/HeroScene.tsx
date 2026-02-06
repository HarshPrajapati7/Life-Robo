"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { Float, Stars, Trail } from "@react-three/drei";

function Atom() {
  const points = useMemo(() => new THREE.EllipseCurve(0, 0, 10, 10, 0, 2 * Math.PI, false, 0).getPoints(100), []);
  return (
    <group>
      <Line worldUnits points={points} color="#4285f4" lineWidth={0.3} rotation={[0, 0, 1]} />
      <Line worldUnits points={points} color="#34a853" lineWidth={0.3} rotation={[0, 0, -1]} />
      <Line worldUnits points={points} color="#ea4335" lineWidth={0.3} rotation={[0, 0, 0]} />
      <Sphere />
    </group>
  );
}

function Line({ worldUnits, points, color, lineWidth, rotation }: any) {
    const ref = useRef<any>();
    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.x = state.clock.getElapsedTime() * 0.2 + (rotation?.[0] || 0);
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.2 + (rotation?.[1] || 0);
            ref.current.rotation.z = state.clock.getElapsedTime() * 0.2 + (rotation?.[2] || 0);
        }
    });

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(points.map((p: any) => new THREE.Vector3(p.x, p.y, 0)));
    return new THREE.TubeGeometry(curve, 64, 0.1, 2, true);
  }, [points]);

  return (
    <mesh ref={ref} geometry={geometry}>
      <meshStandardMaterial color={color} transparent opacity={0.5} roughness={0} metalness={1} emissive={color} emissiveIntensity={2} />
    </mesh>
  );
}

function Sphere() {
    const mesh = useRef<THREE.Mesh>(null);
    useFrame((state) => {
      if(mesh.current) {
        mesh.current.rotation.y = state.clock.getElapsedTime() * 0.5;
        mesh.current.rotation.z = state.clock.getElapsedTime() * 0.2;
      }
    })
  return (
    <Float floatIntensity={2} rotationIntensity={2}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[3, 1]} />
        <meshStandardMaterial color="#fbbc04" wireframe transparent opacity={0.3} emissive="#fbbc04" emissiveIntensity={0.5} />
      </mesh>
    </Float>
  );
}


export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#4285f4" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#ea4335" />
        <Atom />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <fog attach="fog" args={['#0d0d0d', 10, 40]} />
      </Canvas>
    </div>
  );
}
