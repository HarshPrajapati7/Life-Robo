"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { SIMULATIONS, SimulationType } from "@/lib/simulations";
import { getTerrainHeight, getTerrainNormal } from "./PlanetSurface";
import { getRockObstacles } from "@/lib/obstacles";

// ---------------------------------------------------------------------------
// Telemetry & input — exported for HUD
// ---------------------------------------------------------------------------
export const telemetry = {
  x: 0,
  y: 0,
  z: 0,
  rotation: 0,
  speed: 0,
  distanceToTarget: 0,
  targetReached: false,
  hazardWarning: false,
};

export const inputState = {
  forward: false,
  backward: false,
  left: false,
  right: false,
};

// ---------------------------------------------------------------------------
// Per-planet tuning
// ---------------------------------------------------------------------------
const PHYSICS: Record<
  SimulationType,
  {
    maxSpeed: number;
    acceleration: number;
    friction: number;
    turnSpeed: number;
    gravity: number;
    heightSmooth: number;
    tiltSmooth: number;
  }
> = {
  earth: {
    maxSpeed: 14,
    acceleration: 22,
    friction: 12,
    turnSpeed: 2.2,
    gravity: 9.81,
    heightSmooth: 0.25,
    tiltSmooth: 0.12,
  },
  mars: {
    maxSpeed: 12,
    acceleration: 18,
    friction: 8,
    turnSpeed: 2.0,
    gravity: 3.72,
    heightSmooth: 0.22,
    tiltSmooth: 0.10,
  },
  moon: {
    maxSpeed: 10,
    acceleration: 14,
    friction: 5,
    turnSpeed: 1.8,
    gravity: 1.62,
    heightSmooth: 0.18,
    tiltSmooth: 0.08,
  },
};

const ROVER_HALF_HEIGHT = 0.55;

// ---------------------------------------------------------------------------
// Rover component — custom terrain-following physics (no Rapier)
// ---------------------------------------------------------------------------
export default function Rover({
  color = "#00f3ff",
  simulationId = "mars" as SimulationType,
}: {
  color?: string;
  simulationId?: SimulationType;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [, getKeys] = useKeyboardControls();

  // Mutable state kept in a ref — avoids React re-renders every frame
  const phys = useRef({
    yaw: 0,
    speed: 0,
    posX: 0,
    posY: 0,
    posZ: 0,
    verticalVel: 0,
    initialized: false,
    wheelSpin: 0,
  });

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    const sim = SIMULATIONS.find((s) => s.id === simulationId) || SIMULATIONS[0];
    const cfg = PHYSICS[simulationId];
    const p = phys.current;
    const dt = Math.min(delta, 0.05); // clamp to avoid tab-switch explosion

    // ---- First-frame init (spawn on terrain) ----
    if (!p.initialized) {
      p.posX = sim.startPos.x;
      p.posZ = sim.startPos.z;
      p.posY = getTerrainHeight(p.posX, p.posZ, simulationId) + ROVER_HALF_HEIGHT;
      p.initialized = true;
    }

    // ---- Input ----
    const keys = getKeys();
    const fwd = keys.forward || inputState.forward;
    const bwd = keys.backward || inputState.backward;
    const lft = keys.left || inputState.left;
    const rgt = keys.right || inputState.right;

    // ---- Turning ----
    if (lft) p.yaw += cfg.turnSpeed * dt;
    if (rgt) p.yaw -= cfg.turnSpeed * dt;

    // ---- Acceleration / friction ----
    if (fwd) {
      p.speed += cfg.acceleration * dt;
    } else if (bwd) {
      p.speed -= cfg.acceleration * dt;
    } else {
      // friction
      if (Math.abs(p.speed) < cfg.friction * dt) {
        p.speed = 0;
      } else {
        p.speed -= Math.sign(p.speed) * cfg.friction * dt;
      }
    }
    p.speed = THREE.MathUtils.clamp(p.speed, -cfg.maxSpeed * 0.5, cfg.maxSpeed);

    // ---- Position ----
    const newX = p.posX + -Math.sin(p.yaw) * p.speed * dt;
    const newZ = p.posZ + -Math.cos(p.yaw) * p.speed * dt;

    // ---- Rock collision ----
    const ROVER_RADIUS = 1.3;
    const rocks = getRockObstacles();
    let blocked = false;

    for (const rock of rocks) {
      const dx = newX - rock.x;
      const dz = newZ - rock.z;
      const dist = Math.sqrt(dx * dx + dz * dz);
      const minDist = ROVER_RADIUS + rock.radius;

        if (dist < minDist) {
          // Push rover out of rock
          const nx = dx / (dist || 1);
          const nz = dz / (dist || 1);
        p.posX = rock.x + nx * minDist;
        p.posZ = rock.z + nz * minDist;
        // Kill speed on impact
        p.speed *= -0.15; // small bounce-back
        blocked = true;
        break;
      }
    }

    if (!blocked) {
      p.posX = newX;
      p.posZ = newZ;
    }

    // World boundary
    const BOUNDARY = 90;
    p.posX = THREE.MathUtils.clamp(p.posX, -BOUNDARY, BOUNDARY);
    p.posZ = THREE.MathUtils.clamp(p.posZ, -BOUNDARY, BOUNDARY);

    // ---- Terrain height following ----
    const groundY = getTerrainHeight(p.posX, p.posZ, simulationId) + ROVER_HALF_HEIGHT;

    if (p.posY > groundY + 0.05) {
      // airborne — apply gravity
      p.verticalVel -= cfg.gravity * dt;
      p.posY += p.verticalVel * dt;
      if (p.posY <= groundY) {
        p.posY = groundY;
        p.verticalVel = 0;
      }
    } else {
      // on ground — smooth lerp
      p.posY = THREE.MathUtils.lerp(p.posY, groundY, cfg.heightSmooth);
      p.verticalVel = 0;
    }

    // ---- Slope detection: slow down on steep slopes ----
    const normal = getTerrainNormal(p.posX, p.posZ, simulationId);
    const steepness = 1 - normal.y; // 0 = flat, 1 = vertical
    if (steepness > 0.4) {
      // steep slope — bleed speed
      p.speed *= 1 - steepness * 0.5;
    }

    // ---- Tilt to terrain normal ----
    const forwardDir = new THREE.Vector3(-Math.sin(p.yaw), 0, -Math.cos(p.yaw));
    const up = new THREE.Vector3(normal.x, normal.y, normal.z).normalize();
    const right3 = new THREE.Vector3().crossVectors(forwardDir, up).normalize();
    const correctedFwd = new THREE.Vector3().crossVectors(up, right3).normalize().negate();
    const rotMat = new THREE.Matrix4().makeBasis(right3, up, correctedFwd);
    const targetQuat = new THREE.Quaternion().setFromRotationMatrix(rotMat);

    groupRef.current.quaternion.slerp(targetQuat, cfg.tiltSmooth);
    groupRef.current.position.set(p.posX, p.posY, p.posZ);

    // ---- Wheel spin ----
    p.wheelSpin += p.speed * dt * 3;

    // ---- Telemetry ----
    telemetry.x = p.posX;
    telemetry.y = p.posY;
    telemetry.z = p.posZ;
    telemetry.rotation = p.yaw;
    telemetry.speed = Math.abs(p.speed) * 3.6;
  });

  return (
    <group ref={groupRef}>
      {/* Chassis */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.6, 0.4, 2.2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Top panel detail */}
      <mesh position={[0, 0.21, 0.1]} castShadow>
        <boxGeometry args={[1.2, 0.05, 1.4]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Side armor panels */}
      <mesh position={[-0.82, 0.05, 0]} castShadow>
        <boxGeometry args={[0.04, 0.3, 1.8]} />
        <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.5} />
      </mesh>
      <mesh position={[0.82, 0.05, 0]} castShadow>
        <boxGeometry args={[0.04, 0.3, 1.8]} />
        <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.5} />
      </mesh>

      {/* Glow shell */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.65, 0.35, 2.15]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          transparent
          opacity={0.08}
        />
      </mesh>

      {/* Front bumper */}
      <mesh position={[0, -0.05, -1.15]} castShadow>
        <boxGeometry args={[1.4, 0.2, 0.1]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Headlights */}
      <mesh position={[-0.5, 0.05, -1.15]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
      </mesh>
      <mesh position={[0.5, 0.05, -1.15]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
      </mesh>
      <spotLight
        position={[-0.5, 0.05, -1.2]}
        target-position={[-0.5, -0.5, -6]}
        angle={0.5}
        penumbra={0.8}
        intensity={8}
        distance={25}
        color="#eeeeff"
        castShadow={false}
      />
      <spotLight
        position={[0.5, 0.05, -1.2]}
        target-position={[0.5, -0.5, -6]}
        angle={0.5}
        penumbra={0.8}
        intensity={8}
        distance={25}
        color="#eeeeff"
        castShadow={false}
      />

      {/* Tail lights */}
      <mesh position={[-0.55, 0.05, 1.12]}>
        <boxGeometry args={[0.2, 0.1, 0.04]} />
        <meshStandardMaterial color="#ff2222" emissive="#ff0000" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.55, 0.05, 1.12]}>
        <boxGeometry args={[0.2, 0.1, 0.04]} />
        <meshStandardMaterial color="#ff2222" emissive="#ff0000" emissiveIntensity={2} />
      </mesh>

      {/* Wheels with suspension */}
      <WheelVisual position={[-1.0, -0.1, -1.0]} spinRef={phys} />
      <WheelVisual position={[1.0, -0.1, -1.0]} spinRef={phys} />
      <WheelVisual position={[-1.0, -0.1, 1.0]} spinRef={phys} />
      <WheelVisual position={[1.0, -0.1, 1.0]} spinRef={phys} />

      {/* Sensor Mast */}
      <group position={[0, 0.2, -0.6]}>
        <mesh castShadow>
          <boxGeometry args={[0.15, 0.9, 0.15]} />
          <meshStandardMaterial color="#475569" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Antenna dish */}
        <mesh position={[0.2, 0.5, 0]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.0, 0.25, 0.1, 16]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Camera head */}
        <mesh position={[0, 0.5, -0.1]}>
          <boxGeometry args={[0.5, 0.25, 0.25]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
        </mesh>
        {/* Camera lens */}
        <mesh position={[0, 0.5, -0.24]}>
          <cylinderGeometry args={[0.06, 0.06, 0.02, 16]} />
          <meshStandardMaterial color="#000" emissive={color} emissiveIntensity={0.5} />
        </mesh>
      </group>

      {/* Solar panel frame (on top) */}
      <group position={[0, 0.26, 0.4]}>
        <mesh castShadow>
          <boxGeometry args={[1.0, 0.02, 0.7]} />
          <meshStandardMaterial color="#1e3a5f" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Panel grid lines */}
        <mesh position={[0, 0.015, 0]}>
          <boxGeometry args={[1.02, 0.005, 0.72]} />
          <meshStandardMaterial color="#2563eb" emissive="#1d4ed8" emissiveIntensity={0.3} transparent opacity={0.6} />
        </mesh>
      </group>

      {/* Dust particle trail */}
      <DustTrail speedRef={phys} simulationId={simulationId} />
    </group>
  );
}

// ---------------------------------------------------------------------------
// Dust particle trail — kicks up when moving
// ---------------------------------------------------------------------------
const DUST_COUNT = 60;

function DustTrail({
  speedRef,
  simulationId,
}: {
  speedRef: React.MutableRefObject<{ speed: number }>;
  simulationId: SimulationType;
}) {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, velocities, lifetimes, sizes } = useMemo(() => {
    const positions = new Float32Array(DUST_COUNT * 3);
    const sizes = new Float32Array(DUST_COUNT);
    const velocities: THREE.Vector3[] = [];
    const lifetimes: number[] = [];
    for (let i = 0; i < DUST_COUNT; i++) {
      positions[i * 3] = 0;
      positions[i * 3 + 1] = -100; // hidden below ground
      positions[i * 3 + 2] = 0;
      sizes[i] = 0;
      velocities.push(new THREE.Vector3());
      lifetimes.push(0);
    }
    return { positions, velocities, lifetimes, sizes };
  }, []);

  const nextIdx = useRef(0);

  const dustColor = useMemo(() => {
    if (simulationId === "mars") return new THREE.Color("#c4622a");
    if (simulationId === "moon") return new THREE.Color("#888888");
    return new THREE.Color("#8B7355");
  }, [simulationId]);

  useFrame((_state, delta) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const sizeAttr = geo.attributes.size as THREE.BufferAttribute;
    const dt = Math.min(delta, 0.05);
    const speed = Math.abs(speedRef.current.speed);

    // Spawn particles when moving
    if (speed > 1) {
      const spawnRate = Math.min(speed * 0.8, 6);
      const count = Math.floor(spawnRate);
      for (let s = 0; s < count; s++) {
        const i = nextIdx.current;
        nextIdx.current = (nextIdx.current + 1) % DUST_COUNT;

        // Spawn at rear of rover (local Z+1.2 = behind)
        posAttr.setXYZ(i, (Math.random() - 0.5) * 1.2, -0.3, 1.2);
        velocities[i].set(
          (Math.random() - 0.5) * 2,
          Math.random() * 1.5 + 0.5,
          Math.random() * 1.5 + 0.5
        );
        lifetimes[i] = 1.0;
        sizeAttr.setX(i, Math.random() * 0.4 + 0.2);
      }
    }

    // Update particles
    for (let i = 0; i < DUST_COUNT; i++) {
      if (lifetimes[i] <= 0) continue;

      lifetimes[i] -= dt * 1.2;
      const x = posAttr.getX(i) + velocities[i].x * dt;
      const y = posAttr.getY(i) + velocities[i].y * dt;
      const z = posAttr.getZ(i) + velocities[i].z * dt;
      velocities[i].y -= 1.5 * dt; // gravity on dust

      posAttr.setXYZ(i, x, y, z);
      sizeAttr.setX(i, sizeAttr.getX(i) * (1 - dt * 0.5)); // shrink

      if (lifetimes[i] <= 0) {
        posAttr.setXYZ(i, 0, -100, 0);
        sizeAttr.setX(i, 0);
      }
    }

    posAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={dustColor}
        size={0.3}
        sizeAttenuation
        transparent
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Wheel visual — animated spin + suspension bob
// ---------------------------------------------------------------------------
function WheelVisual({
  position,
  spinRef,
}: {
  position: [number, number, number];
  spinRef: React.MutableRefObject<{ wheelSpin: number; speed: number }>;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) meshRef.current.rotation.x = spinRef.current.wheelSpin;
    // Subtle suspension bounce based on speed + time
    if (groupRef.current) {
      const bob = Math.sin(state.clock.elapsedTime * 12 + position[0] * 3 + position[2] * 5)
        * Math.min(Math.abs(spinRef.current.speed) * 0.004, 0.03);
      groupRef.current.position.y = position[1] + bob;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Suspension strut */}
      <mesh position={[position[0] > 0 ? -0.15 : 0.15, 0.15, 0]}>
        <boxGeometry args={[0.06, 0.25, 0.06]} />
        <meshStandardMaterial color="#475569" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Wheel */}
      <mesh ref={meshRef} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.4, 32]} />
        <meshStandardMaterial color="#020617" roughness={0.9} metalness={0.15} />
        {/* Hub cap */}
        <mesh position={[0, 0.23, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 6]} />
          <meshStandardMaterial color="#1e293b" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Tire tread ring */}
        <mesh>
          <torusGeometry args={[0.4, 0.03, 8, 32]} />
          <meshStandardMaterial color="#111" roughness={1} />
        </mesh>
      </mesh>
    </group>
  );
}
