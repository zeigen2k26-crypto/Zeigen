"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeuralBrainSphere() {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  const ringRef = useRef<THREE.Group>(null!);

  // Generate brain-like neural network point cloud
  const { positions, colors, linePositions } = useMemo(() => {
    const numPoints = 600;
    const pos = new Float32Array(numPoints * 3);
    const cols = new Float32Array(numPoints * 3);
    const rawCoords: THREE.Vector3[] = [];

    const color1 = new THREE.Color("#60A5FA"); // Glow Blue
    const color2 = new THREE.Color("#C084FC"); // Accent Purple

    for (let i = 0; i < numPoints; i++) {
      // Generate double ellipsoid hemisphere (Brain lobe structure)
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      
      const r = 2.2 + (Math.sin(theta * 4) * Math.cos(phi * 4) * 0.4);
      
      // Separate into left & right brain hemispheres
      const sideShift = i % 2 === 0 ? 0.35 : -0.35;
      const x = r * Math.sin(phi) * Math.cos(theta) + sideShift;
      const y = r * Math.sin(phi) * Math.sin(theta) * 0.85;
      const z = r * Math.cos(phi) * 0.9;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      const vec = new THREE.Vector3(x, y, z);
      rawCoords.push(vec);

      // Color gradient
      const mixedColor = color1.clone().lerp(color2, Math.random());
      cols[i * 3] = mixedColor.r;
      cols[i * 3 + 1] = mixedColor.g;
      cols[i * 3 + 2] = mixedColor.b;
    }

    // Connect close neurons with synapse lines
    const lineCoords: number[] = [];
    for (let i = 0; i < numPoints; i++) {
      let connections = 0;
      for (let j = i + 1; j < numPoints; j++) {
        const dist = rawCoords[i].distanceTo(rawCoords[j]);
        if (dist < 0.95 && connections < 3) {
          lineCoords.push(rawCoords[i].x, rawCoords[i].y, rawCoords[i].z);
          lineCoords.push(rawCoords[j].x, rawCoords[j].y, rawCoords[j].z);
          connections++;
        }
      }
    }

    return {
      positions: pos,
      colors: cols,
      linePositions: new Float32Array(lineCoords),
    };
  }, []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (pointsRef.current) {
      pointsRef.current.rotation.y = time * 0.18;
      pointsRef.current.rotation.x = Math.sin(time * 0.1) * 0.15;
    }
    if (linesRef.current) {
      linesRef.current.rotation.y = time * 0.18;
      linesRef.current.rotation.x = Math.sin(time * 0.1) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = time * 0.25;
      ringRef.current.rotation.x = Math.PI / 2.5 + Math.sin(time * 0.2) * 0.1;
    }
  });

  return (
    <group scale={[1.15, 1.15, 1.15]}>
      {/* Neural Synapses Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[colors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          vertexColors
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Connecting Synaptic Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#3B82F6"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Futuristic Orbiting Glowing Ring */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[3.2, 0.015, 16, 100]} />
          <meshBasicMaterial color="#7C3AED" transparent opacity={0.6} />
        </mesh>
        <mesh rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[3.6, 0.01, 16, 100]} />
          <meshBasicMaterial color="#60A5FA" transparent opacity={0.4} />
        </mesh>
      </group>
    </group>
  );
}

export default function BrainModel() {
  return (
    <div className="w-full h-[450px] md:h-[550px] relative flex items-center justify-center pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <NeuralBrainSphere />
      </Canvas>
      {/* Neon glowing center aura */}
      <div className="absolute w-72 h-72 rounded-full bg-gradient-to-tr from-purple-600/30 via-blue-500/20 to-cyan-400/20 blur-[90px] pointer-events-none -z-10" />
    </div>
  );
}
