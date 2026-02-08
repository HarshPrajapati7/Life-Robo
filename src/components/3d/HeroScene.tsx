"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useLayoutEffect, useState, Suspense } from "react";
import * as THREE from "three";
import { Stage, useGLTF, useAnimations, ContactShadows, Stars, useScroll, ScrollControls } from "@react-three/drei";

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

function RobotModel({ gesture }: { gesture: string }) {
  const group = useRef<any>();
  const { scene, animations } = useGLTF("/robot_animated.glb");
  const { actions } = useAnimations(animations, group);
  const scroll = useScroll();
  const { viewport } = useThree();

  // Responsive scaling factor
  const scale = Math.min(viewport.width / 4, 1.2);

  useFrame((state, delta) => {
    if (group.current) {
      // Smoother rotation based on scroll with lerping
      const targetRotation = scroll.offset * Math.PI * 0.5;
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        targetRotation,
        0.1
      );
    }
  });

  useLayoutEffect(() => {
    scene.traverse((obj: any) => {
      if (obj.isMesh) {
        const mat = obj.material;
        // Global PBR enhancements for realism
        mat.metalness = 0.9;
        mat.roughness = 0.15;
        mat.envMapIntensity = 2.0;

        // Specific part tuning based on material names for the Orange/Black theme
        if (mat.name.includes("Main") || mat.name.includes("Body") || mat.name.includes("Head") || mat.name.includes("Arms")) {
          mat.color.set("#ff5400"); // Vibrant Industrial Orange
          mat.metalness = 0.7;
          mat.roughness = 0.2;
        } else if (mat.name.includes("Grey") || mat.name.includes("Black") || mat.name.includes("Joints")) {
          mat.color.set("#0a0a0a"); // Deep Black
          mat.roughness = 0.5;
          mat.metalness = 0.8;
        } else if (mat.name.includes("Yellow") || mat.name.includes("Red") || mat.name.includes("Glow")) {
          // Emissive Accents
          mat.color.set("#ffaa00");
          mat.emissive = new THREE.Color("#ffaa00");
          mat.emissiveIntensity = 2.0;
        }

        mat.needsUpdate = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    // Stop all current animations with crossfade
    Object.values(actions).forEach((action) => action?.fadeOut(0.5));

    // Play the selected gesture (map Hi to Wave)
    const animationName = gesture === "Hi" ? "Wave" : gesture;
    const action = actions[animationName] || actions["Idle"];

    if (action) {
      action.reset().fadeIn(0.5).play();
    }
  }, [gesture, actions]);


  return (
    <group ref={group} dispose={null} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

export default function HeroScene() {
  const [gesture, setGesture] = useState("Hi");
  const gestures = ["Idle", "Hi", "Dance", "ThumbsUp", "Punch", "Running", "Jump"];

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px]">


      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none w-full px-4 overflow-x-auto no-scrollbar">

        <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 pointer-events-auto pb-2">
          {gestures.map((g) => (
            <button
              key={g}
              onClick={() => setGesture(g)}
              className={`flex-shrink-0 px-3 py-1 text-[10px] md:text-xs font-tech uppercase tracking-widest transition-all duration-300 border ${gesture === g
                ? "bg-cyber-cyan text-black border-cyber-cyan shadow-[0_0_15px_rgba(0,255,242,0.4)]"
                : "bg-black/40 text-cyber-cyan border-cyber-cyan/30 hover:bg-cyber-cyan/10"
                }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <Canvas shadows dpr={[1, 2]} camera={{ fov: 45, position: [0, 0, 10] }} className="rounded-2xl overflow-hidden bg-black/40 border border-white/5 shadow-2xl">
        <SceneReadyTracker />
        <Suspense fallback={null}>
          <ScrollControls pages={0} damping={0.2}>
            <Stage environment="studio" intensity={1} adjustCamera preset="rembrandt">
              <RobotModel gesture={gesture} />
            </Stage>
            <ContactShadows opacity={0.4} scale={10} blur={2.4} far={0.8} />
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          </ScrollControls>
        </Suspense>
        <fog attach="fog" args={["#0d0d0d", 10, 40]} />
      </Canvas>
    </div>
  );
}
