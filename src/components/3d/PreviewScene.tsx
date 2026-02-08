import { Canvas } from "@react-three/fiber";
import { Suspense, useMemo } from "react";
import { Environment, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import { SimulationType } from "@/lib/simulations";
import { RobotModel } from "./HumanoidScene";
import { RoverModel } from "./Rover";

function MiniScene({ simId }: { simId: SimulationType }) {
  // Use a fixed camera angle for the preview
  const cameraPos = useMemo(() => {
    if (simId === 'humanoid') return [0, 5, 10] as [number, number, number];
    return [3, 2.5, 6] as [number, number, number];
  }, [simId]);
  
  const simulationColor = useMemo(() => {
    switch(simId) {
      case 'mars': return '#d14e00'; // Deep Orange
      case 'earth': return '#10b981'; // Emerald Green
      case 'moon': return '#64748b'; // Slate Blue-Grey
      case 'humanoid': return '#111111'; // Pink
      default: return '#00f3ff';
    }
  }, [simId]);

  const target = useMemo(() => {
    if (simId === 'humanoid') return [0, 4, 0] as [number, number, number];
    return [0, 0, 0] as [number, number, number];
  }, [simId]);

  return (
    <>
      <PerspectiveCamera makeDefault position={cameraPos} fov={40} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate autoRotateSpeed={0.5} target={target} />
      
      <color attach="background" args={[simulationColor]} />
      <fog attach="fog" args={[simulationColor, 10, 50]} />

      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 5]} intensity={2.0} castShadow />
      <spotLight position={[-5, 5, 10]} intensity={1.5} color="#fff" />
      
      {simId === 'humanoid' ? (
        <group position={[0, 0, 0]}>
           <RobotModel gesture="Idle" />
           <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.05, 0]}>
              <circleGeometry args={[2, 32]} />
              <meshBasicMaterial color="#000" opacity={0.3} transparent />
           </mesh>
        </group>
      ) : (
        <group position={[0, -0.8, 0]}>
            <RoverModel color="#ffffff" />
            <mesh rotation={[-Math.PI/2, 0, 0]} position={[0, 0.05, 0]}>
              <circleGeometry args={[2.5, 32]} />
              <meshBasicMaterial color="#000" opacity={0.4} transparent />
           </mesh>
        </group>
      )}

      <Environment preset="city" />
    </>
  );
}

export default function PreviewScene({ simId }: { simId: SimulationType }) {
  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas shadows dpr={[1, 2]} gl={{ preserveDrawingBuffer: true, antialias: true }} style={{ pointerEvents: 'none', touchAction: 'auto' }}>
        <Suspense fallback={null}>
            <MiniScene simId={simId} />
        </Suspense>
      </Canvas>
    </div>
  );
}
