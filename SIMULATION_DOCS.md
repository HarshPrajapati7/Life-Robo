# Life-Robo Simulation Architecture

## Overview
The simulation in `Life-Robo` is a **Kinematic Simulation** built directly with **React Three Fiber (Three.js)**. 

> **Note:** We are currently **NOT** using the Rapier physics engine for the rover. We are using a custom lightweight physics implementation directly in JavaScript. This was chosen for tighter control over the specific "Mars Rover" style suspension without the overhead of a full rigid-body engine.

---

## 1. Coordinate Systems

### Three.js (Visuals)
*   **Y-Up**: The Y-axis points VERTICALLY UP (Gravity acts along -Y).
*   **Z-Forward**: The Z-axis is "depth".
*   **Plane Geometry**: By default, a `PlaneGeometry` lies on the XY plane. 
    *   To make it a "ground", we rotate it `-90 degrees` on the X-axis.
    *   **Result**: 
        *   Plane `Local X` = World `X`
        *   Plane `Local Y` = World `-Z` (This is the tricky part!)
        *   Plane `Local Z` (Normal) = World `Y` (Up)

### Physics (Simulation)
*   Our custom physics uses **World Space** coordinates `(x, y, z)` directly.
*   **x, z**: Horizontal position on the map.
*   **y**: Vertical height (Altitude).

### Synchronization
To ensure the physics (invisible math) matches the visuals (rendered mesh):
*   **In JS (`Rover.tsx`)**: We use `x` and `z` directly.
*   **In Shader (`PlanetSurface.tsx`)**: We mistake `Local Y` for `World Z` carefully: `vec2 worldPos = vec2(position.x, -position.y);`. This inversion aligns the texture/terrain generation with the physics world.

---

## 2. Process Flow

### Step A: Scene Generation (`PlanetSurface.tsx`)
1.  **Geometry**: We create a high-resolution grid (`PlaneGeometry 200x200`).
2.  **Vertex Shader**: 
    *   For every vertex, we calculate its **World Position** `(x, z)`.
    *   We pass this position to the `getSineTerrain(x, z)` function (GLSL).
    *   The function returns the precise height `h`.
    *   We displace the vertex UP by `h`.
    *   This creates the visual hills, craters, and dunes.

### Step B: Simulation Loop (`Rover.tsx`)
This runs **60 times per second** (via `useFrame`).

1.  **Input Handling**:
    *   We read keyboard state (WASD/Arrows) and on-screen controls.
    *   Target velocity is set based on input.

2.  **Terrain Sampling (height detection)**:
    *   The rover needs to know "how high is the ground *right here*?"
    *   It calls `getTerrainHeight(roverX, roverZ)` (JS).
    *   This function runs the **exact same math formula** as the Vertex Shader.
    *   It also uses **Bilinear Interpolation** to calculate the height *between* grid points, ensuring the wheel sits on the flat triangle face, not just the vertices.

3.  **Suspension & Tilt**:
    *   We sample the terrain height at **4 corners** (FL, FR, BL, BR) relative to the rover's position and rotation.
    *   We calculate the average normal to determine **Pitch** (nose up/down) and **Roll** (tilt left/right).
    *   The rover mesh is rotated to match this surface normal.
    *   The wheels are virtually smoothed to stick to the ground.

4.  **Movement Integration**:
    *   Velocity is applied to position: `pos += velocity * delta`.
    *   Gravity pulls the rover down constantly.
    *   If `pos.y` < `terrainHeight`, the rover is "pushed" up (Collision/Support).

### Step C: Rendering (`PlaygroundScene.tsx`)
1.  **Canvas**: Three.js renders the updated scene.
2.  **Telemetry**: The rover updates the global `telemetry` object.
3.  **React State**: The UI reads `telemetry` via `requestAnimationFrame` to update the HUD numbers (Alt, Speed, Dist) without triggering heavy React re-renders.

---

## Summary
The "Simulation" is effectively two identical math functions running in parallel:
1.  **GPU (Shader):** "Draw the ground at height `sin(x)`"
2.  **CPU (Physics):** "Place the rover at height `sin(x)`"

As long as the math formulas (`sin(x)`) and coordinates (`x, z`) match perfectly, the rover appears to drive physically on the terrain.
