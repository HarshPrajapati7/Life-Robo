"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo, useLayoutEffect, useEffect } from "react";
import { Environment, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import * as THREE from "three";

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

function HeroModel({ onJump }: { onJump?: () => void }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/robot_animated.glb");

  // Clone so it doesn't conflict with other instances using the same GLB
  const clonedScene = useMemo(() => SkeletonUtils.clone(scene), [scene]);

  const onJumpRef = useRef(onJump);
  useEffect(() => {
    onJumpRef.current = onJump;
  }, [onJump]);

  // Style materials
  useLayoutEffect(() => {
    clonedScene.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        const mat = obj.material as THREE.MeshStandardMaterial;
        mat.metalness = 0.85;
        mat.roughness = 0.2;
        mat.envMapIntensity = 1.8;
        mat.needsUpdate = true;
      }
    });
  }, [clonedScene]);

  // Create mixer on the cloned scene and bind animations
  const mixer = useMemo(() => new THREE.AnimationMixer(clonedScene), [clonedScene]);
  const animActions = useMemo(() => {
    const map: Record<string, THREE.AnimationAction> = {};
    animations.forEach((clip) => {
      map[clip.name] = mixer.clipAction(clip);
    });
    return map;
  }, [mixer, animations]);

  // Available gesture names (from playground)
  const gestureNames = useMemo(() => {
    const preferred = ["Wave", "Dance", "ThumbsUp", "Punch", "Jump"];
    return preferred.filter((name) => animActions[name]);
  }, [animActions]);

  // Loop random animations with 1s delay between
  useEffect(() => {
    if (gestureNames.length === 0) return;

    let timeoutId: ReturnType<typeof setTimeout>;
    let currentAction: THREE.AnimationAction | null = null;

    const playRandom = () => {
      const name = gestureNames[Math.floor(Math.random() * gestureNames.length)];
      const action = animActions[name];
      if (!action) return;

      if (currentAction && currentAction !== action) {
        currentAction.fadeOut(0.3);
      }

      currentAction = action;
      action.setLoop(THREE.LoopOnce, 1);
      action.clampWhenFinished = true;
      action.reset().fadeIn(0.3).play();

      // Trigger jump callback for logo interaction
      if (name.toLowerCase() === "jump") {
        setTimeout(() => onJumpRef.current?.(), 200);
      }
    };

    const onFinished = () => {
      timeoutId = setTimeout(playRandom, 1500);
    };

    mixer.addEventListener("finished", onFinished);
    playRandom();

    return () => {
      mixer.removeEventListener("finished", onFinished);
      clearTimeout(timeoutId);
      mixer.stopAllAction();
    };
  }, [mixer, animActions, gestureNames]);

  // Drive the mixer
  useFrame((_, delta) => {
    mixer.update(delta);
  });

  // Gentle float
  useFrame((state) => {
    if (group.current) {
      group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.15;
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
  });

  return (
    <group ref={group} dispose={null} scale={1.5}>
      <primitive object={clonedScene} />
    </group>
  );
}

export default function HeroRobot({ onJump }: { onJump?: () => void }) {
  return (
    <div className="w-full h-full">
      <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}>
        <Suspense fallback={null}>
          <SceneReadyTracker />

          {/* Camera from playground humanoid: pos [0,5,10] target [0,4,0] */}
          <PerspectiveCamera makeDefault position={[0, 4, 15]} fov={35} />

          <ambientLight intensity={1.5} />
          <directionalLight position={[5, 10, 5]} intensity={2.0} castShadow />
          <spotLight position={[10, 10, 10]} intensity={1.0} castShadow />
          <pointLight position={[-10, 5, -10]} intensity={0.5} color="#00f0ff" />

          {/* Model at y:-1 matching playground */}
          <group position={[0, 0.5, 0]}>
            <HeroModel onJump={onJump} />
          </group>

          <Environment preset="city" background={false} />
        </Suspense>
      </Canvas>
    </div>
  );
}
