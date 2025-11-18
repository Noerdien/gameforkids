import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ForestEnvironment() {
  return (
    <>
      <Ground />
      <Trees />
      <Flowers />
      <Sky />
    </>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#7EC850" />
    </mesh>
  );
}

function Sky() {
  return (
    <mesh position={[0, 10, -15]}>
      <sphereGeometry args={[30, 32, 32]} />
      <meshBasicMaterial color="#87CEEB" side={THREE.BackSide} />
    </mesh>
  );
}

function Trees() {
  const treePositions = useMemo(() => {
    const positions = [];
    
    // Left side trees
    positions.push(
      { pos: [-8, 0, -5], scale: 1.2 },
      { pos: [-10, 0, 0], scale: 1.0 },
      { pos: [-9, 0, 5], scale: 1.3 },
    );
    
    // Right side trees
    positions.push(
      { pos: [8, 0, -5], scale: 1.1 },
      { pos: [10, 0, 0], scale: 1.4 },
      { pos: [9, 0, 5], scale: 1.0 },
    );
    
    // Back trees
    positions.push(
      { pos: [-3, 0, -8], scale: 0.9 },
      { pos: [0, 0, -9], scale: 1.1 },
      { pos: [3, 0, -8], scale: 1.0 },
    );
    
    return positions;
  }, []);
  
  return (
    <>
      {treePositions.map((tree, i) => (
        <Tree key={i} position={tree.pos} scale={tree.scale} />
      ))}
    </>
  );
}

function Tree({ position, scale }: { position: number[]; scale: number }) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });
  
  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 1, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 2, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Leaves - 3 layers */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <coneGeometry args={[1.5, 2, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0, 3.5, 0]} castShadow>
        <coneGeometry args={[1.2, 1.5, 8]} />
        <meshStandardMaterial color="#32CD32" />
      </mesh>
      <mesh position={[0, 4.3, 0]} castShadow>
        <coneGeometry args={[0.8, 1, 8]} />
        <meshStandardMaterial color="#90EE90" />
      </mesh>
    </group>
  );
}

function Flowers() {
  const flowerPositions = useMemo(() => {
    const positions = [];
    const colors = ["#FF69B4", "#FFD700", "#FF6347", "#9370DB", "#FF1493"];
    
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const radius = 6 + Math.random() * 3;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      positions.push({ pos: [x, 0.1, z], color, rotation: Math.random() * Math.PI });
    }
    
    return positions;
  }, []);
  
  return (
    <>
      {flowerPositions.map((flower, i) => (
        <Flower key={i} position={flower.pos} color={flower.color} rotation={flower.rotation} />
      ))}
    </>
  );
}

function Flower({ position, color, rotation }: { position: number[]; color: string; rotation: number }) {
  const ref = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = 0.1 + Math.sin(state.clock.elapsedTime * 2 + rotation) * 0.05;
    }
  });
  
  return (
    <group ref={ref} position={[position[0], position[1], position[2]]} rotation={[0, rotation, 0]}>
      {/* Stem */}
      <mesh position={[0, 0.15, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 4]} />
        <meshStandardMaterial color="#2d5016" />
      </mesh>
      
      {/* Petals */}
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 5) * Math.PI * 2) * 0.1,
            0.3,
            Math.sin((i / 5) * Math.PI * 2) * 0.1,
          ]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial color={color} />
        </mesh>
      ))}
      
      {/* Center */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  );
}
