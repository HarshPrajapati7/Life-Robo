"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import * as THREE from "three";

// Exported for HUD and logic
export const telemetry = {
    x: 0,
    z: 0,
    rotation: 0,
    speed: 0
};

// Support for mobile buttons/external inputs
export const inputState = {
    forward: false,
    backward: false,
    left: false,
    right: false
};

const BOUNDARY = 50; // Boundary radius

export default function Rover() {
  const meshRef = useRef<THREE.Group>(null);
  const velocity = useRef(new THREE.Vector3());
  const rotation = useRef(0);

  const [, getKeys] = useKeyboardControls();

  useFrame((state, delta) => {
    if (!meshRef.current) return;

    const keys = getKeys();
    
    // Merge keyboard and virtual input state
    const forward = keys.forward || inputState.forward;
    const backward = keys.backward || inputState.backward;
    const left = keys.left || inputState.left;
    const right = keys.right || inputState.right;

    // Movement logic
    const moveSpeed = 15 * delta; // Slightly faster for light theme feel
    const rotateSpeed = 3 * delta;

    if (forward) {
      velocity.current.z = THREE.MathUtils.lerp(velocity.current.z, -moveSpeed, 0.1);
    } else if (backward) {
      velocity.current.z = THREE.MathUtils.lerp(velocity.current.z, moveSpeed, 0.1);
    } else {
      velocity.current.z = THREE.MathUtils.lerp(velocity.current.z, 0, 0.1);
    }

    if (left) {
      rotation.current += rotateSpeed;
    } else if (right) {
      rotation.current -= rotateSpeed;
    }

    meshRef.current.rotation.y = rotation.current;

    const direction = new THREE.Vector3(0, 0, 1).applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation.current);
    const nextPos = meshRef.current.position.clone().addScaledVector(direction, -velocity.current.z);

    // Boundary Restriction (Circular)
    const distanceFromCenter = Math.sqrt(nextPos.x ** 2 + nextPos.z ** 2);
    if (distanceFromCenter < BOUNDARY) {
        meshRef.current.position.copy(nextPos);
    } else {
        // Just stop at the edge
        velocity.current.z = 0;
    }

    // Update Telemetry Data
    telemetry.x = meshRef.current.position.x;
    telemetry.z = meshRef.current.position.z;
    telemetry.rotation = rotation.current;
    telemetry.speed = Math.abs(velocity.current.z) * 100;
  });

  return (
    <group ref={meshRef}>
      {/* Chassis - Updated for light theme contrast */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[1.5, 0.5, 2]} />
        <meshStandardMaterial color="#1e293b" metalness={0.2} roughness={0.8} />
      </mesh>

      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.55, 0.45, 1.95]} />
        <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={1} transparent opacity={0.1} />
      </mesh>

      <Wheel position={[-0.9, 0.4, 0.7]} velocityRef={velocity} />
      <Wheel position={[0.9, 0.4, 0.7]} velocityRef={velocity} />
      <Wheel position={[-0.9, 0.4, -0.7]} velocityRef={velocity} />
      <Wheel position={[0.9, 0.4, -0.7]} velocityRef={velocity} />

      <group position={[0, 0.75, 0.6]}>
        <mesh castShadow>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
          <meshStandardMaterial color="#64748b" />
        </mesh>
        <mesh position={[0, 0.3, 0.1]}>
          <boxGeometry args={[0.5, 0.25, 0.25]} />
          <meshStandardMaterial color="#00f3ff" emissive="#00f3ff" emissiveIntensity={2} />
        </mesh>
      </group>
    </group>
  );
}

function Wheel({ position, velocityRef }: { position: [number, number, number], velocityRef: React.MutableRefObject<THREE.Vector3> }) {
    const ref = useRef<THREE.Mesh>(null);
    useFrame(() => {
        if(ref.current) {
            ref.current.rotation.x += velocityRef.current.z * 5;
        }
    });
    return (
        <mesh ref={ref} position={position} rotation={[0, 0, Math.PI / 2]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.3, 24]} />
            <meshStandardMaterial color="#0f172a" roughness={0.9} />
            <mesh position={[0, 0.16, 0]}>
                <cylinderGeometry args={[0.2, 0.2, 0.02, 6]} />
                <meshStandardMaterial color="#334155" />
            </mesh>
        </mesh>
    );
}
