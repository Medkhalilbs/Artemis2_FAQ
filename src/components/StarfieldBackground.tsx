import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function RotatingStars() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01;
      ref.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <group ref={ref}>
      <Stars radius={150} depth={100} count={9000} factor={8} saturation={0} fade speed={0.5} />
    </group>
  );
}

const StarfieldBackground = () => {
  return (
    <div className="absolute inset-0 bg-[#020617]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <RotatingStars />
      </Canvas>
    </div>
  );
};

export default StarfieldBackground;
