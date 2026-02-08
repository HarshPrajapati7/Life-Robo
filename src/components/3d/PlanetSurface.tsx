import { useMemo, useRef, useEffect } from "react";
import * as THREE from "three";
import { SimulationType } from "@/lib/simulations";

// ---------------------------------------------------------------------------
// TERRAIN MATH  (CPU-side — called by Rover for height lookups)
// ---------------------------------------------------------------------------
function getMathHeight(x: number, z: number, type: SimulationType): number {
  let h = 0.0;

  if (type === "mars") {
    // Large rolling dunes
    h += Math.sin(x * 0.03 + z * 0.01) * 3.5;
    h += Math.cos(x * 0.02 - z * 0.04) * 2.5;
    // Medium rocky ridges
    h += Math.sin(x * 0.08 + z * 0.06) * 1.2;
    h += Math.cos(x * 0.12 - z * 0.09) * 0.7;
    // Fine rock detail
    h += Math.sin(x * 0.2 + z * 0.15) * 0.25;
    h += Math.cos(x * 0.3 - z * 0.25) * 0.15;
    // Long canyon groove
    const canyon = Math.abs(Math.sin(x * 0.015 + 0.5) * 30 - z);
    if (canyon < 8) {
      h -= (1 - canyon / 8) * 3.0;
    }
  } else if (type === "moon") {
    // Gentle undulations
    h += Math.sin(x * 0.05) * Math.cos(z * 0.05) * 1.5;
    h += Math.sin(x * 0.15 + z * 0.05) * 0.5;
    // Fine lunar surface bumps
    h += Math.sin(x * 0.25 + z * 0.3) * 0.15;

    // Multiple craters
    const craters: [number, number, number, number][] = [
      [0, 0, 20, 4.0],       // center crater
      [-30, 20, 12, 3.0],    // side crater
      [25, -25, 10, 2.5],    // far crater
      [-15, -35, 8, 2.0],    // small crater
      [35, 30, 6, 1.5],      // tiny crater
    ];
    for (const [cx, cz, radius, depth] of craters) {
      const dist = Math.sqrt((x - cx) ** 2 + (z - cz) ** 2);
      if (dist < radius) {
        const t = Math.min(Math.max(dist / radius, 0), 1);
        const smooth = t * t * (3 - 2 * t);
        h -= (1.0 - smooth) * depth;
        // crater rim (raised lip)
        if (t > 0.7 && t < 1.0) {
          h += (1 - Math.abs(t - 0.85) / 0.15) * depth * 0.15;
        }
      }
    }
  } else {
    // earth — gentle rolling hills
    h += Math.sin(x * 0.02) * 2.0;
    h += Math.cos(z * 0.03) * 2.0;
    // Soft bumps
    h += Math.sin(x * 0.06 + z * 0.04) * 0.8;
    h += Math.cos(x * 0.08 - z * 0.07) * 0.5;
    // Gentle valley
    const valleyDist = Math.abs(z - Math.sin(x * 0.02) * 15);
    if (valleyDist < 10) {
      h -= (1 - valleyDist / 10) * 1.5;
    }
  }
  return h;
}

// ---------------------------------------------------------------------------
// Public height query (includes hazards — used by Rover)
// ---------------------------------------------------------------------------
export function getTerrainHeight(x: number, z: number, type: SimulationType): number {
  let h = getMathHeight(x, z, type);

  // Mars crater hazard
  if (type === "mars") {
    const hazardX = 10;
    const hazardZ = 10;
    const d = Math.sqrt((x - hazardX) ** 2 + (z - hazardZ) ** 2);
    if (d < 15) {
      const norm = d / 15;
      const fade = 1 - norm * norm;
      h -= Math.max(0, fade) * 12.0;
    }
  }
  return h;
}

// ---------------------------------------------------------------------------
// Terrain normal via central-difference (used by Rover for tilt)
// ---------------------------------------------------------------------------
const NORMAL_EPSILON = 0.5;

export function getTerrainNormal(
  x: number,
  z: number,
  type: SimulationType
): { x: number; y: number; z: number } {
  const hL = getTerrainHeight(x - NORMAL_EPSILON, z, type);
  const hR = getTerrainHeight(x + NORMAL_EPSILON, z, type);
  const hD = getTerrainHeight(x, z - NORMAL_EPSILON, type);
  const hU = getTerrainHeight(x, z + NORMAL_EPSILON, type);

  // cross product of tangent vectors gives normal
  const nx = (hL - hR) / (2 * NORMAL_EPSILON);
  const nz = (hD - hU) / (2 * NORMAL_EPSILON);
  const ny = 1.0;

  const len = Math.sqrt(nx * nx + ny * ny + nz * nz);
  return { x: nx / len, y: ny / len, z: nz / len };
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const PLANET_SIZE = 200;
const PLANET_SEGMENTS = 128;

// ---------------------------------------------------------------------------
// PlanetSurface — visual-only mesh (no Rapier)
// ---------------------------------------------------------------------------
export default function PlanetSurface({ type }: { type: SimulationType }) {
  const meshRef = useRef<THREE.Mesh>(null);

  // 1. Generate height array once
  const { heights } = useMemo(() => {
    const n = PLANET_SEGMENTS + 1;
    const heights = new Float32Array(n * n);

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const x = (i / PLANET_SEGMENTS) * PLANET_SIZE - PLANET_SIZE / 2;
        const z = (j / PLANET_SEGMENTS) * PLANET_SIZE - PLANET_SIZE / 2;

        let h = getMathHeight(x, z, type);

        // Mars hazard baked into geometry
        if (type === "mars") {
          const hazardX = 10;
          const hazardZ = 10;
          const d = Math.sqrt((x - hazardX) ** 2 + (z - hazardZ) ** 2);
          if (d < 15) {
            const norm = d / 15;
            const fade = 1 - norm * norm;
            h -= Math.max(0, fade) * 12.0;
          }
        }

        heights[i * n + j] = h;
      }
    }

    return { heights };
  }, [type]);

  // 2. Displace PlaneGeometry vertices
  useEffect(() => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const pos = geo.attributes.position;
    const n = PLANET_SEGMENTS + 1;

    for (let k = 0; k < pos.count; k++) {
      const ix = k % n;
      const iy = Math.floor(k / n);
      pos.setZ(k, heights[ix * n + iy]);
    }
    pos.needsUpdate = true;
    geo.computeVertexNormals();
  }, [heights]);

  // 3. Shader material
  const materialArgs = useMemo(() => {
    const isMars = type === "mars";
    const isEarth = type === "earth";

    return {
      uniforms: {
        uColor: {
          value: new THREE.Color(
            isMars ? "#ad5126" : isEarth ? "#22c55e" : "#888888"
          ),
        },
        uAccentColor: {
          value: new THREE.Color(
            isMars ? "#59220e" : isEarth ? "#14532d" : "#111111"
          ),
        },
        uType: { value: isMars ? 1.0 : isEarth ? 0.0 : 2.0 },
        uHazardPos: { value: new THREE.Vector2(10, 10) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vHeight;
        varying vec3 vWorldPosition;

        void main() {
          vUv = uv;
          vHeight = position.z;
          vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying float vHeight;
        varying vec3 vWorldPosition;
        uniform vec3 uColor;
        uniform vec3 uAccentColor;
        uniform float uType;
        uniform vec2 uHazardPos;

        void main() {
          vec3 dx = dFdx(vWorldPosition);
          vec3 dy = dFdy(vWorldPosition);
          vec3 normal = normalize(cross(dx, dy));

          vec3 sunDir = normalize(vec3(0.5, 1.0, 0.5));
          if (uType > 0.9 && uType < 1.1) sunDir = normalize(vec3(-0.5, 0.5, -0.5));

          float diff = max(dot(normal, sunDir), 0.0);

          float mixFactor = smoothstep(-2.0, 5.0, vHeight);
          vec3 baseColor = mix(uAccentColor, uColor, mixFactor);

          float slope = 1.0 - normal.y;
          baseColor *= (1.0 - slope * 0.5);

          if (uType > 0.9 && uType < 1.1) {
            vec2 p = vWorldPosition.xz;
            float d = distance(p, uHazardPos);
            if (d < 15.0) baseColor *= 0.5;
          }

          vec3 finalColor = baseColor * (diff * 0.9 + 0.4);

          float dist = length(vWorldPosition.xz);
          float alpha = 1.0 - smoothstep(70.0, 95.0, dist);

          gl_FragColor = vec4(finalColor, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    };
  }, [type]);

  return (
    <group>
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry
          args={[PLANET_SIZE, PLANET_SIZE, PLANET_SEGMENTS, PLANET_SEGMENTS]}
        />
        <shaderMaterial {...materialArgs} />
      </mesh>
    </group>
  );
}
