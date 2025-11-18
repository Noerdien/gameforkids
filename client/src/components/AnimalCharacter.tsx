import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useForestGame, type Animal } from "@/lib/stores/useForestGame";

interface AnimalCharacterProps {
  animal: Animal;
  isCorrect?: boolean;
}

export function AnimalCharacter({ animal, isCorrect = false }: AnimalCharacterProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bounceRef = useRef(0);
  
  useFrame((state) => {
    if (groupRef.current) {
      if (isCorrect) {
        // Jump animation when correct
        bounceRef.current += 0.15;
        groupRef.current.position.y = 0.5 + Math.abs(Math.sin(bounceRef.current)) * 0.8;
        groupRef.current.rotation.y += 0.05;
      } else {
        // Idle animation
        groupRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
        groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      }
    }
  });
  
  return (
    <group ref={groupRef} position={[0, 0.5, -2]}>
      {animal.id === "kucing" && <Cat color={animal.color} />}
      {animal.id === "kelinci" && <Rabbit color={animal.color} />}
      {animal.id === "bebek" && <Duck color={animal.color} />}
      {animal.id === "ayam" && <Chicken color={animal.color} />}
      {animal.id === "ikan" && <Fish color={animal.color} />}
    </group>
  );
}

function Cat({ color }: { color: string }) {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.6, 0.5, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.85, 0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Ears */}
      <mesh position={[-0.15, 1.15, 0]} castShadow>
        <coneGeometry args={[0.12, 0.25, 3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.15, 1.15, 0]} castShadow>
        <coneGeometry args={[0.12, 0.25, 3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.12, 0.9, 0.26]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.12, 0.9, 0.26]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      
      {/* Tail */}
      <mesh position={[0, 0.4, -0.5]} rotation={[0.5, 0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.05, 0.6, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function Rabbit({ color }: { color: string }) {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.65, 0.1]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Long Ears */}
      <mesh position={[-0.1, 1.1, 0]} rotation={[0, 0, -0.3]} castShadow>
        <capsuleGeometry args={[0.08, 0.4, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.1, 1.1, 0]} rotation={[0, 0, 0.3]} castShadow>
        <capsuleGeometry args={[0.08, 0.4, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.08, 0.7, 0.22]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#FF1493" />
      </mesh>
      <mesh position={[0.08, 0.7, 0.22]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#FF1493" />
      </mesh>
      
      {/* Fluffy tail */}
      <mesh position={[0, 0.2, -0.35]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#FFF" />
      </mesh>
    </group>
  );
}

function Duck({ color }: { color: string }) {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.7, 0.1]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Beak */}
      <mesh position={[0, 0.65, 0.3]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.1, 0.15, 8]} />
        <meshStandardMaterial color="#FF8C00" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.08, 0.75, 0.22]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.08, 0.75, 0.22]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      
      {/* Wings */}
      <mesh position={[-0.35, 0.3, 0]} rotation={[0, 0, -0.5]} castShadow>
        <boxGeometry args={[0.15, 0.3, 0.4]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.35, 0.3, 0]} rotation={[0, 0, 0.5]} castShadow>
        <boxGeometry args={[0.15, 0.3, 0.4]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function Chicken({ color }: { color: string }) {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 0.65, 0.1]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Comb (jengger) */}
      <mesh position={[0, 0.85, 0]} castShadow>
        <boxGeometry args={[0.08, 0.2, 0.12]} />
        <meshStandardMaterial color="#FF0000" />
      </mesh>
      
      {/* Beak */}
      <mesh position={[0, 0.6, 0.25]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.08, 0.12, 8]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.08, 0.7, 0.2]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.08, 0.7, 0.2]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      
      {/* Tail feathers */}
      <mesh position={[0, 0.4, -0.3]} rotation={[0.5, 0, 0]} castShadow>
        <boxGeometry args={[0.25, 0.4, 0.05]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>
    </group>
  );
}

function Fish({ color }: { color: string }) {
  return (
    <group rotation={[0, 0, Math.PI / 6]}>
      {/* Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Tail */}
      <mesh position={[-0.4, 0.5, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <coneGeometry args={[0.25, 0.3, 3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Top fin */}
      <mesh position={[0, 0.75, 0]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[0.15, 0.25, 3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Side fins */}
      <mesh position={[0, 0.4, 0.25]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.1, 0.2, 3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.4, -0.25]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.1, 0.2, 3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[0.15, 0.55, 0.22]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.15, 0.55, -0.22]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}
