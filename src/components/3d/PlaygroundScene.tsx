"use client";

import { Canvas } from "@react-three/fiber";
import { 
  KeyboardControls, 
  Stars, 
  Grid, 
  PerspectiveCamera, 
  Environment,
  OrbitControls,
  ContactShadows
} from "@react-three/drei";
import Rover, { telemetry } from "./Rover";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "w", "W"] },
  { name: "backward", keys: ["ArrowDown", "s", "S"] },
  { name: "left", keys: ["ArrowLeft", "a", "A"] },
  { name: "right", keys: ["ArrowRight", "d", "D"] },
];

function Scene() {
  const controlsRef = useRef<any>(null);

  useFrame((state) => {
    if (controlsRef.current) {
      const targetX = telemetry.x;
      const targetZ = telemetry.z;
      
      const dx = targetX - controlsRef.current.target.x;
      const dz = targetZ - controlsRef.current.target.z;

      state.camera.position.x += dx;
      state.camera.position.z += dz;

      controlsRef.current.target.set(targetX, 0.5, targetZ);
      controlsRef.current.update();
    }
  });

  return (
    <>
      <color attach="background" args={["#02040a"]} />
      
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
      <directionalLight position={[-10, 20, 10]} intensity={1.5} castShadow />
      
      {/* Light Grid Lines only */}
      <Grid 
        infiniteGrid 
        fadeDistance={100} 
        fadeStrength={5} 
        cellSize={1} 
        sectionSize={10} 
        sectionThickness={1.5} 
        sectionColor="#ffffff" 
        cellColor="#ffffff"
      />
      
      {/* Visual Boundary Indicators */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
         <ringGeometry args={[49.5, 50, 64]} />
         <meshBasicMaterial color="#ef4444" transparent opacity={0.5} />
      </mesh>
      
      <Rover />
      
      <Environment preset="apartment" />
      <ContactShadows resolution={1024} scale={20} blur={2} opacity={0.4} far={10} color="#000000" />
      
      <OrbitControls 
        ref={controlsRef}
        makeDefault 
        minDistance={8} 
        maxDistance={40} 
        maxPolarAngle={Math.PI / 2.1} 
        enablePan={false}
      />
    </>
  );
}

export default function PlaygroundScene() {
  return (
    <div className="w-full h-full">
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows gl={{ antialias: true }}>
          <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={50} />
          <Scene />
        </Canvas>
      </KeyboardControls>
    </div>
  );
}
