"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useLayoutEffect } from "react";
import * as THREE from "three";
import { useGLTF, useAnimations, ContactShadows, Grid, Environment } from "@react-three/drei";

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

export function RobotModel({ gesture }: { gesture: string }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/robot_animated.glb");
  const { actions } = useAnimations(animations, group);

  useLayoutEffect(() => {
    scene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        const mat = obj.material as THREE.MeshStandardMaterial;
        mat.metalness = 0.9;
        mat.roughness = 0.15;
        mat.envMapIntensity = 2.0;

        if (mat.name.includes("Main") || mat.name.includes("Body") || mat.name.includes("Head") || mat.name.includes("Arms")) {
          mat.color.set("#ff5400");
          mat.metalness = 0.7;
          mat.roughness = 0.2;
        } else if (mat.name.includes("Grey") || mat.name.includes("Black") || mat.name.includes("Joints")) {
          mat.color.set("#0a0a0a");
          mat.roughness = 0.5;
          mat.metalness = 0.8;
        } else if (mat.name.includes("Yellow") || mat.name.includes("Red") || mat.name.includes("Glow")) {
          mat.color.set("#ffaa00");
          mat.emissive = new THREE.Color("#ffaa00");
          mat.emissiveIntensity = 2.0;
        }
        mat.needsUpdate = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    Object.values(actions).forEach((action) => action?.fadeOut(0.5));
    const animationName = gesture === "Hi" ? "Wave" : gesture;
    const action = actions[animationName] || actions["Idle"];
    if (action) {
      action.reset().fadeIn(0.5).play();
    }
  }, [gesture, actions]);

  return (
    <group ref={group} dispose={null} scale={1.5}>
      <primitive object={scene} />
    </group>
  );
}



export default function HumanoidScene({ gesture = "Idle" }: { gesture?: string }) {
  return (
    <>
      <SceneReadyTracker />
      
      {/* Lighting similar to studio/lab */}
      <Environment preset="city" />
      <ambientLight intensity={1.5} />
      <spotLight position={[10, 10, 10]} intensity={1.0} castShadow />
      <pointLight position={[-10, 5, -10]} intensity={0.5} color="#00f3ff" />

      <group position={[0, -1, 0]}>
         <RobotModel gesture={gesture} />
         
         <Grid
            infiniteGrid
            fadeDistance={50}
            fadeStrength={5}
            cellSize={1}
            sectionSize={5}
            sectionThickness={1.5}
            sectionColor="#ff5400"
            cellColor="#444"
            position={[0, 0.01, 0]}
         />
         <ContactShadows opacity={0.6} scale={10} blur={2} far={1} />
      </group>
    </>
  );
}
