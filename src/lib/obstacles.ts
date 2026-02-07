import { SimulationType } from "./simulations";
import { getTerrainHeight } from "@/components/3d/PlanetSurface";

// ---------------------------------------------------------------------------
// Shared obstacle registry — populated by PlaygroundScene, read by Rover
// ---------------------------------------------------------------------------

export interface RockObstacle {
  x: number;
  z: number;
  radius: number; // collision radius (based on scale)
}

// Module-level store — same instance across all imports
let _rocks: RockObstacle[] = [];
let _generatedFor: string = "";

/** Deterministic seeded RNG */
function makeRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/**
 * Generate rock obstacle data for a given simulation.
 * Returns both visual data (for rendering) and collision data.
 * Uses deterministic seeded RNG so Rover and Scene agree on positions.
 */
export function generateRocks(simulationId: SimulationType, count = 45) {
  const key = `${simulationId}_${count}`;
  if (_generatedFor === key) return { rocks: _rocks, visuals: _cachedVisuals };

  const rand = makeRng(42 + simulationId.charCodeAt(0));
  const rocks: RockObstacle[] = [];
  const visuals: {
    pos: [number, number, number];
    scale: [number, number, number];
    rot: number;
    color: string;
  }[] = [];

  for (let i = 0; i < count; i++) {
    const x = (rand() - 0.5) * 160;
    const z = (rand() - 0.5) * 160;
    const h = getTerrainHeight(x, z, simulationId);
    const s = rand() * 1.2 + 0.3;
    const baseColor =
      simulationId === "mars"
        ? "#7a3b1e"
        : simulationId === "moon"
          ? "#555"
          : "#5a6340";

    const scaleX = s * (0.8 + rand() * 0.4);
    const scaleY = s * (0.5 + rand() * 0.6);
    const scaleZ = s * (0.8 + rand() * 0.4);

    visuals.push({
      pos: [x, h + s * 0.3, z],
      scale: [scaleX, scaleY, scaleZ],
      rot: rand() * Math.PI * 2,
      color: baseColor,
    });

    // Collision radius = average of XZ scale (the footprint)
    const collisionRadius = ((scaleX + scaleZ) / 2) * 0.8 + 0.3; // slight padding
    rocks.push({ x, z, radius: collisionRadius });
  }

  _rocks = rocks;
  _cachedVisuals = visuals;
  _generatedFor = key;

  return { rocks, visuals };
}

let _cachedVisuals: {
  pos: [number, number, number];
  scale: [number, number, number];
  rot: number;
  color: string;
}[] = [];

/** Get current rock obstacles (call after generateRocks) */
export function getRockObstacles(): RockObstacle[] {
  return _rocks;
}
