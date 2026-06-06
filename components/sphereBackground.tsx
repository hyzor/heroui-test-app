"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Configurable sphere starting position
const SPHERE_INITIAL_Y = 0.25;

function Sphere() {
  const wireframeRef = useRef<THREE.Mesh>(null);
  const targetY = useRef(SPHERE_INITIAL_Y);
  const scrollOffsetRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollOffsetRef.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useFrame((state, delta) => {
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y += delta * 0.1;
      wireframeRef.current.rotation.x += delta * 0.05;

      // Smooth parallax movement
      const parallaxY = SPHERE_INITIAL_Y - scrollOffsetRef.current * 0.0003;
      targetY.current = parallaxY;
      wireframeRef.current.position.y +=
        (targetY.current - wireframeRef.current.position.y) * 0.1;
    }
  });

  return (
    <>
      {/* Wireframe sphere only - removed solid mesh and particles for performance */}
      <mesh
        ref={wireframeRef}
        renderOrder={1}
        position={[0, SPHERE_INITIAL_Y, 0]}
      >
        <sphereGeometry args={[2.5, 32, 32]} />
        <meshBasicMaterial
          color={0x0080ff}
          transparent
          opacity={0.3}
          wireframe
          depthWrite={false}
          depthTest={true}
        />
      </mesh>

      {/* Ambient light */}
      <ambientLight intensity={0.5} />

      {/* Single point light for glow effect */}
      <pointLight position={[10, 10, 10]} intensity={0.5} color={0x00ffff} />
    </>
  );
}

function DprManager() {
  const gl = useThree((state) => state.gl);

  useEffect(() => {
    const updateDpr = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelCount = width * height;

      let dpr: number;
      if (pixelCount > 2560 * 1440) {
        dpr = 1;
      } else if (pixelCount > 1920 * 1080) {
        dpr = Math.min(window.devicePixelRatio, 1.5);
      } else {
        dpr = Math.min(window.devicePixelRatio, 2);
      }

      gl.setPixelRatio(dpr);
    };

    updateDpr();
    window.addEventListener("resize", updateDpr);
    return () => window.removeEventListener("resize", updateDpr);
  }, [gl]);

  return null;
}

export default function SphereBackground() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{
          alpha: true,
          powerPreference: "high-performance",
          depth: true,
        }}
      >
        <DprManager />
        <Sphere />
      </Canvas>
    </div>
  );
}
