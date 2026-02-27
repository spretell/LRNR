import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function SpherePoints() {
  const ref = useRef();
  const mouse = useRef(new THREE.Vector2());

  const positions = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    const radius = 1.8;

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }

    return positions;
  }, []);

  useFrame(({ mouse: m }) => {
    mouse.current.x = m.x;
    mouse.current.y = m.y;

    if (ref.current) {
      ref.current.rotation.y += 0.0007;
      ref.current.rotation.x += 0.00035;

      ref.current.rotation.y += mouse.current.x * 0.01;
      ref.current.rotation.x += mouse.current.y * 0.01;
    }
  });

  return (
    <group scale={1.2}>
      <Points ref={ref} positions={positions} stride={3}>
        <PointMaterial
          color="#CFE7FF"
          size={0.02}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function ParticleSphere() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <SpherePoints />
    </Canvas>
  );
}
