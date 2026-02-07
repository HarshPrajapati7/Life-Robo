"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  KeyboardControls,
  Grid,
  PerspectiveCamera,
  Environment,
  OrbitControls,
  ContactShadows,
  Text,
  Stars,
  Sparkles,
  PerformanceMonitor,
} from "@react-three/drei";
import PlanetSurface from "./PlanetSurface";
import Rover, { telemetry } from "./Rover";
import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState } from "react";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "w", "W"] },
  { name: "backward", keys: ["ArrowDown", "s", "S"] },
  { name: "left", keys: ["ArrowLeft", "a", "A"] },
  { name: "right", keys: ["ArrowRight", "d", "D"] },
];

import { SIMULATIONS, SimulationType } from "@/lib/simulations";
import { Suspense } from "react";

import { getTerrainHeight } from "./PlanetSurface";
import { generateRocks } from "@/lib/obstacles";

// ---------------------------------------------------------------------------
// Animated Target Beacon — pulsing rings, rotating hologram
// ---------------------------------------------------------------------------
function TargetBeacon({ position, color, label, simulationId }: { position: { x: number, z: number }, color: string, label: string, simulationId: SimulationType }) {
  const h = getTerrainHeight(position.x, position.z, simulationId);
  const lightRef = useRef<THREE.PointLight>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  const textRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (lightRef.current) {
      lightRef.current.intensity = 8 + Math.sin(t * 4) * 3;
    }
    // Pulsing expanding rings
    if (ring1Ref.current) {
      const s = 1 + Math.sin(t * 2) * 0.3;
      ring1Ref.current.scale.set(s, s, 1);
      ring1Ref.current.rotation.z = t * 0.5;
    }
    if (ring2Ref.current) {
      const s = 1 + Math.sin(t * 2 + 2) * 0.3;
      ring2Ref.current.scale.set(s, s, 1);
      ring2Ref.current.rotation.z = -t * 0.3;
    }
    if (ring3Ref.current) {
      const s = 1 + Math.sin(t * 1.5 + 4) * 0.4;
      ring3Ref.current.scale.set(s, s, 1);
    }
    // Beam pulse
    if (beamRef.current) {
      (beamRef.current.material as THREE.MeshBasicMaterial).opacity = 0.2 + Math.sin(t * 3) * 0.15;
    }
    // Floating text
    if (textRef.current) {
      textRef.current.position.y = 9 + Math.sin(t * 1.5) * 0.3;
      textRef.current.rotation.y = t * 0.4;
    }
  });

  return (
    <group position={[position.x, h, position.z]}>
      {/* Vertical beam */}
      <mesh ref={beamRef} position={[0, 5, 0]}>
        <cylinderGeometry args={[0.08, 0.02, 10, 8]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>

      {/* Pulsing ground rings */}
      <mesh ref={ring1Ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.15, 0]}>
        <ringGeometry args={[3, 3.15, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.7} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.12, 0]}>
        <ringGeometry args={[4.5, 4.6, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[6, 6.08, 48]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>

      {/* Inner glow disc */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
        <circleGeometry args={[3, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.08} side={THREE.DoubleSide} />
      </mesh>

      {/* Floating label */}
      <group ref={textRef} position={[0, 9, 0]}>
        <Text fontSize={0.8} color={color} anchorX="center" anchorY="middle" outlineWidth={0.04} outlineColor="#000000">
          {label}
        </Text>
        <Text position={[0, -0.9, 0]} fontSize={0.4} color={color} anchorX="center" anchorY="middle" outlineWidth={0.02} outlineColor="#000000">
          ▼ LAND HERE ▼
        </Text>
      </group>
      
      <pointLight ref={lightRef} intensity={8} distance={25} color={color} position={[0, 2, 0]} />

      {/* Sparkles around target */}
      <Sparkles count={30} scale={8} size={2} speed={0.5} color={color} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Scattered terrain rocks (collision-enabled via shared obstacle registry)
// ---------------------------------------------------------------------------
function TerrainRocks({ simulationId, count = 45 }: { simulationId: SimulationType, count?: number }) {
  const visuals = useMemo(() => {
    const { visuals } = generateRocks(simulationId, count);
    return visuals;
  }, [simulationId, count]);

  return (
    <group>
      {visuals.map((r, i) => (
        <mesh key={i} position={r.pos} rotation={[0, r.rot, 0]} scale={r.scale} castShadow receiveShadow>
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={r.color} roughness={0.95} metalness={0.05} flatShading />
        </mesh>
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Atmosphere effects per planet
// ---------------------------------------------------------------------------
function AtmosphereEffects({ simulationId }: { simulationId: SimulationType }) {
  if (simulationId === 'moon') {
    return (
      <>
        <Stars radius={120} depth={60} count={4000} factor={4} saturation={0} fade speed={0.5} />
        {/* Sparkly moon dust near ground */}
        <Sparkles count={80} scale={60} size={1.5} speed={0.2} color="#aabbcc" noise={2} />
      </>
    );
  }
  if (simulationId === 'mars') {
    return (
      <>
        {/* Floating mars dust */}
        <Sparkles count={100} scale={80} size={2} speed={0.8} color="#d4774a" noise={3} />
        {/* Distant dust haze */}
        <Sparkles count={40} scale={120} size={4} speed={0.3} color="#ff6a33" noise={5} opacity={0.3} />
      </>
    );
  }
  // Earth
  return (
    <>
      {/* Pollen / floating particles */}
      <Sparkles count={60} scale={60} size={1} speed={0.4} color="#a3e635" noise={2} opacity={0.5} />
      {/* Birds-eye sparkle (sun reflections) */}
      <Sparkles count={20} scale={80} size={2} speed={0.1} color="#fef08a" noise={4} opacity={0.3} />
    </>
  );
}


function Sun({ position, color, simulationId }: { position: [number, number, number], color: string, simulationId: SimulationType }) {
  if (simulationId === 'moon') return null; 

  return (
    <group position={position}>
       {/* Core Sun */}
       <mesh>
         <sphereGeometry args={[8, 32, 32]} />
         <meshBasicMaterial color={color} toneMapped={false} />
       </mesh>
       
       {/* Glow Halo */}
       <mesh scale={[1.5, 1.5, 1.5]}>
         <sphereGeometry args={[8, 32, 32]} />
         <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.BackSide} toneMapped={false} />
       </mesh>

       <pointLight intensity={2} distance={200} decay={1} color={color} />
    </group>
  );
}

// TPP camera constants
const CAM_DISTANCE = 14;   // how far behind the rover
const CAM_HEIGHT   = 6;    // how high above the rover
const CAM_LOOK_Y   = 1.5;  // look-at height offset above rover
const CAM_SMOOTH   = 0.045; // position lerp (lower = more cinematic lag)
const CAM_ROT_SMOOTH = 0.035; // rotation/yaw lerp
const SPEED_THRESHOLD = 0.5; // speed below this = "stopped" (allows orbit)
const SNAP_BACK_SPEED = 0.04; // how fast cam snaps back to TPP when moving again

function Scene({ simulationId, setDpr }: { simulationId: SimulationType, setDpr: (dpr: number) => void }) {
  const sim = useMemo(() => SIMULATIONS.find(s => s.id === simulationId) || SIMULATIONS[0], [simulationId]);
  const camYaw = useRef(0); // smoothed yaw tracker
  const controlsRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const autoBlend = useRef(1); // 1 = full auto TPP, 0 = full orbit

  const sunPosition = useMemo(() => {
     if (simulationId === 'earth') return [60, 40, 40] as [number, number, number];
     if (simulationId === 'mars') return [-40, 30, 40] as [number, number, number];
     return [50, 40, -20] as [number, number, number]; // Moon light source
  }, [simulationId]);

  useFrame((state) => {
    // Update distance to target in telemetry
    const dist = Math.sqrt((telemetry.x - sim.targetPos.x) ** 2 + (telemetry.z - sim.targetPos.z) ** 2);
    telemetry.distanceToTarget = dist;
    telemetry.targetReached = dist < 5;

    const isMoving = telemetry.speed > SPEED_THRESHOLD;

    // Blend factor: ramp up to 1 when moving, ramp down to 0 when stopped
    if (isMoving) {
      autoBlend.current = Math.min(1, autoBlend.current + SNAP_BACK_SPEED);
    } else {
      autoBlend.current = Math.max(0, autoBlend.current - SNAP_BACK_SPEED);
    }

    const blend = autoBlend.current;

    // Enable/disable OrbitControls based on blend
    if (controlsRef.current) {
      controlsRef.current.enabled = blend < 0.5;
    }

    // --- TPP Camera (only active when blend > 0) ---
    if (blend > 0.001) {
      // Smoothly follow rover yaw (handles wrap-around)
      let yawDiff = telemetry.rotation - camYaw.current;
      while (yawDiff > Math.PI) yawDiff -= Math.PI * 2;
      while (yawDiff < -Math.PI) yawDiff += Math.PI * 2;
      camYaw.current += yawDiff * CAM_ROT_SMOOTH;

      // Desired camera position: behind the rover
      const idealX = telemetry.x + Math.sin(camYaw.current) * CAM_DISTANCE;
      const idealY = telemetry.y + CAM_HEIGHT;
      const idealZ = telemetry.z + Math.cos(camYaw.current) * CAM_DISTANCE;

      // Lerp camera position toward ideal, scaled by blend
      const lerpAmt = CAM_SMOOTH * blend;
      state.camera.position.x += (idealX - state.camera.position.x) * lerpAmt;
      state.camera.position.y += (idealY - state.camera.position.y) * lerpAmt;
      state.camera.position.z += (idealZ - state.camera.position.z) * lerpAmt;

      // Look at rover
      const lookX = telemetry.x;
      const lookY = telemetry.y + CAM_LOOK_Y;
      const lookZ = telemetry.z;
      state.camera.lookAt(lookX, lookY, lookZ);
    }

    // Keep OrbitControls target on rover so orbiting is centered on it
    if (controlsRef.current) {
      controlsRef.current.target.set(telemetry.x, telemetry.y + CAM_LOOK_Y, telemetry.z);
      controlsRef.current.update();
    }
  });

  return (
    <>
      <PerformanceMonitor onIncline={() => setDpr(2)} onDecline={() => setDpr(1)} />
      
      <color attach="background" args={[
        simulationId === 'earth' ? "#a5f3fc" : 
        simulationId === 'mars' ? "#cf502b" : // Brighter dusty Mars day
        simulationId === 'moon' ? "#050505" : 
        "#02040a"
      ]} />
      
      {simulationId === 'earth' && <fog attach="fog" args={["#a5f3fc", 80, 250]} />}
      {simulationId === 'mars' && <fog attach="fog" args={["#cf502b", 60, 200]} />}
      {simulationId === 'moon' && <fog attach="fog" args={["#0a0a12", 50, 200]} />}

      <ambientLight intensity={simulationId === 'moon' ? 1.2 : 1.8} />
      
      {/* Hemisphere light for natural sky/ground bounce */}
      <hemisphereLight
        args={[
          simulationId === 'mars' ? "#ffd4a0" : simulationId === 'moon' ? "#334" : "#87ceeb",
          simulationId === 'mars' ? "#5a2200" : simulationId === 'moon' ? "#111" : "#2d5a1e",
          simulationId === 'moon' ? 0.8 : 1.2
        ]}
      />

      {/* Main Key Light - Strong shadows */}
      <directionalLight 
        position={sunPosition} 
        intensity={simulationId === 'moon' ? 8 : 6} 
        color={simulationId === 'mars' ? "#ffeebb" : "#ffffff"}
        castShadow 
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      >
        <orthographicCamera attach="shadow-camera" args={[-60, 60, 60, -60]} near={1} far={300} />
      </directionalLight>

      {/* Fill Light for Depth */}
      <directionalLight 
        position={[-30, 25, -30]} 
        intensity={simulationId === 'moon' ? 2.5 : 3.0} 
        color={simulationId === 'mars' ? "#ff8c00" : simulationId === 'moon' ? "#6688aa" : "#a5f3fc"} 
      />

      {/* Back-rim light so rover silhouette pops */}
      <directionalLight 
        position={[20, 15, -40]} 
        intensity={1.5} 
        color={simulationId === 'mars' ? "#ffcc66" : "#ffffff"} 
      />

      <Sun position={sunPosition} color={simulationId === 'mars' ? '#ffaa00' : '#ffffff'} simulationId={simulationId} />

      <PlanetSurface type={simulationId} />

      <TerrainRocks simulationId={simulationId} count={45} />

      <AtmosphereEffects simulationId={simulationId} />

      <TargetBeacon 
        position={sim.targetPos} 
        color={sim.color} 
        label="TARGET AREA"
        simulationId={simulationId}
      />

      {/* Grid moved lower to not obstruct peaks */}
      <Grid 
        infiniteGrid 
        fadeDistance={80} 
        fadeStrength={15} 
        cellSize={20} 
        sectionSize={100} 
        sectionThickness={1} 
        sectionColor={sim.color} 
        cellColor={sim.color}
        position={[0, -10.1, 0]}
      />

      <Rover color={sim.color} simulationId={simulationId} />
      
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <Environment preset={sim.environment as any} background={false} />
      
      {/* Optimized Contact Shadows: Lower resolution, baked feeling */}
      <ContactShadows resolution={512} scale={40} blur={2} opacity={0.5} far={4} color="#000000" />
      
      <OrbitControls 
        ref={controlsRef}
        makeDefault 
        minDistance={5} 
        maxDistance={50} 
        maxPolarAngle={Math.PI / 2.1} 
        enablePan={false}
        enableDamping
        dampingFactor={0.1}
      />
    </>
  );
}

function SceneReadyTracker() {
  const rendered = useRef(false);
  useFrame(() => {
    if (!rendered.current) {
      rendered.current = true;
      window.dispatchEvent(new CustomEvent("3d-ready"));
    }
  });
  return null;
}

export default function PlaygroundScene({ simulationId = 'mars' }: { simulationId?: SimulationType }) {
  const [dpr, setDpr] = useState(1.5);
  
  // Custom gravity no longer needed — handled in Rover.tsx per-planet

  return (
    <div className="w-full h-full">
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows dpr={dpr} gl={{ antialias: true, powerPreference: "high-performance" }}>
          <SceneReadyTracker />
          <PerspectiveCamera makeDefault position={[10, 10, 10]} fov={50} />
          
          <Suspense fallback={null}>
             <Scene simulationId={simulationId} setDpr={setDpr} />
          </Suspense>
        </Canvas>
      </KeyboardControls>
    </div>
  );
}
