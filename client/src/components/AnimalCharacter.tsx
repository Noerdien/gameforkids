import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useForestGame, type Animal } from "@/lib/stores/useForestGame";

interface AnimalCharacterProps {
  animal: Animal;
  isCorrect?: boolean;
}

const SCALE = 1.8; // Scale multiplier for all animals to be bigger for kids

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
      {animal.id === "anjing" && <Dog color={animal.color} />}
      {animal.id === "sapi" && <Cow color={animal.color} />}
      {animal.id === "singa" && <Lion color={animal.color} />}
      {animal.id === "harimau" && <Tiger color={animal.color} />}
      {animal.id === "gajah" && <Elephant color={animal.color} />}
      {animal.id === "beruang" && <Bear color={animal.color} />}
      {animal.id === "monyet" && <Monkey color={animal.color} />}
      {animal.id === "kuda" && <Horse color={animal.color} />}
      {animal.id === "rusa" && <Deer color={animal.color} />}
      {animal.id === "domba" && <Sheep color={animal.color} />}
      {animal.id === "kambing" && <Goat color={animal.color} />}
      {animal.id === "burung" && <Bird color={animal.color} />}
      {animal.id === "elang" && <Eagle color={animal.color} />}
      {animal.id === "penguin" && <Penguin color={animal.color} />}
      {animal.id === "capung" && <Dragonfly color={animal.color} />}
      {animal.id === "ular" && <Snake color={animal.color} />}
      {animal.id === "buaya" && <Crocodile color={animal.color} />}
      {animal.id === "kadal" && <Lizard color={animal.color} />}
      {animal.id === "paus" && <Whale color={animal.color} />}
      {animal.id === "lumba" && <Dolphin color={animal.color} />}
      {animal.id === "penyu" && <Turtle color={animal.color} />}
      {animal.id === "kepiting" && <Crab color={animal.color} />}
      {animal.id === "pohon" && <Tree color={animal.color} />}
      {animal.id === "bunga" && <Flower color={animal.color} />}
      {animal.id === "rumput" && <Grass color={animal.color} />}
      {animal.id === "kaktus" && <Cactus color={animal.color} />}
      {animal.id === "kelapa" && <CoconutTree color={animal.color} />}
      {animal.id === "bunga_matahari" && <Sunflower color={animal.color} />}
      {animal.id === "bunga_ros" && <Rose color={animal.color} />}
      {animal.id === "pohon_palm" && <PalmTree color={animal.color} />}
      {animal.id === "jamur" && <Mushroom color={animal.color} />}
      {animal.id === "daun" && <Leaf color={animal.color} />}
      {animal.id === "padi" && <Rice color={animal.color} />}
      {animal.id === "bayam" && <Spinach color={animal.color} />}
      {animal.id === "cabai" && <Chili color={animal.color} />}
      {animal.id === "jagung" && <Corn color={animal.color} />}
      {animal.id === "nanas" && <Pineapple color={animal.color} />}
    </group>
  );
}

function Cat({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.6, 0.5, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.85, 0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.15, 1.15, 0]} castShadow>
        <coneGeometry args={[0.12, 0.25, 3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.15, 1.15, 0]} castShadow>
        <coneGeometry args={[0.12, 0.25, 3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.12, 0.9, 0.26]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.12, 0.9, 0.26]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0, 0.4, -0.5]} rotation={[0.5, 0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.05, 0.6, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function Rabbit({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.25, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.65, 0.1]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.1, 1.1, 0]} rotation={[0, 0, -0.3]} castShadow>
        <capsuleGeometry args={[0.08, 0.4, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.1, 1.1, 0]} rotation={[0, 0, 0.3]} castShadow>
        <capsuleGeometry args={[0.08, 0.4, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.08, 0.7, 0.22]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#FF1493" />
      </mesh>
      <mesh position={[0.08, 0.7, 0.22]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#FF1493" />
      </mesh>
      <mesh position={[0, 0.2, -0.35]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#FFF" />
      </mesh>
    </group>
  );
}

function Duck({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.7, 0.1]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.65, 0.3]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.1, 0.15, 8]} />
        <meshStandardMaterial color="#FF8C00" />
      </mesh>
      <mesh position={[-0.08, 0.75, 0.22]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.08, 0.75, 0.22]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
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
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.65, 0.1]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.85, 0]} castShadow>
        <boxGeometry args={[0.08, 0.2, 0.12]} />
        <meshStandardMaterial color="#FF0000" />
      </mesh>
      <mesh position={[0, 0.6, 0.25]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.08, 0.12, 8]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      <mesh position={[-0.08, 0.7, 0.2]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.08, 0.7, 0.2]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0, 0.4, -0.3]} rotation={[0.5, 0, 0]} castShadow>
        <boxGeometry args={[0.25, 0.4, 0.05]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>
    </group>
  );
}

function Fish({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group rotation={[0, 0, Math.PI / 6]} scale={[s, s, s]}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.4, 0.5, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <coneGeometry args={[0.25, 0.3, 3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.75, 0]} rotation={[0, 0, 0]} castShadow>
        <coneGeometry args={[0.15, 0.25, 3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.4, 0.25]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.1, 0.2, 3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.4, -0.25]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <coneGeometry args={[0.1, 0.2, 3]} />
        <meshStandardMaterial color={color} />
      </mesh>
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

function Dog({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.5, 0.6, 0.9]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.9, 0.15]} castShadow>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.15, 1.15, 0.1]} castShadow>
        <boxGeometry args={[0.1, 0.35, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.15, 1.15, 0.1]} castShadow>
        <boxGeometry args={[0.1, 0.35, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.1, 0.95, 0.3]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.1, 0.95, 0.3]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0, 0.75, 0.35]} castShadow>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}

function Cow({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.8, 0.6, 1.2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.95, 0.4]} castShadow>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.2, 1.25, 0.3]} castShadow>
        <boxGeometry args={[0.15, 0.3, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.2, 1.25, 0.3]} castShadow>
        <boxGeometry args={[0.15, 0.3, 0.1]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.12, 1.08, 0.5]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.12, 1.08, 0.5]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}

function Lion({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.8, 0.1]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.8, 0]} castShadow>
        <cylinderGeometry args={[0.45, 0.45, 0.1, 32]} />
        <meshStandardMaterial color="#F4A460" />
      </mesh>
      <mesh position={[-0.12, 0.95, 0.28]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.12, 0.95, 0.28]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}

function Tiger({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.6, 0.5, 1.0]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.8, 0.3]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.12, 0.9, 0.45]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.12, 0.9, 0.45]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0, 0.4, -0.45]} rotation={[0.5, 0, 0]} castShadow>
        <boxGeometry args={[0.2, 0.5, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function Elephant({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 1.0, 0.25]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.5, 0.45]} rotation={[0.3, 0, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.08, 0.6, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.15, 1.1, 0.45]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.15, 1.1, 0.45]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}

function Bear({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.85, 0.1]} castShadow>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.18, 1.05, 0.05]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.18, 1.05, 0.05]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.1, 0.95, 0.25]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.1, 0.95, 0.25]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}

function Monkey({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.82, 0.05]} castShadow>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.12, 0.95, 0.22]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.12, 0.95, 0.22]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0, 0.85, 0.28]} castShadow>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#FFB6C1" />
      </mesh>
    </group>
  );
}

function Horse({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.7, 0.55, 1.2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.9, 0.45]} castShadow>
        <boxGeometry args={[0.5, 0.45, 0.4]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.12, 1.05, 0.55]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.12, 1.05, 0.55]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0, 1.15, 0.4]} castShadow>
        <boxGeometry args={[0.1, 0.3, 0.08]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}

function Deer({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.5, 0.5, 0.9]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.8, 0.2]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.12, 1.1, 0.15]}>
        <boxGeometry args={[0.06, 0.4, 0.04]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.12, 1.1, 0.15]}>
        <boxGeometry args={[0.06, 0.4, 0.04]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.1, 0.9, 0.32]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.1, 0.9, 0.32]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}

function Sheep({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.75, 0.2]} castShadow>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.1, 0.88, 0.3]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.1, 0.88, 0.3]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}

function Goat({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.45, 0.5, 0.7]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.75, 0.2]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.1, 0.95, 0.15]} castShadow>
        <boxGeometry args={[0.08, 0.25, 0.06]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.1, 0.95, 0.15]} castShadow>
        <boxGeometry args={[0.08, 0.25, 0.06]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.08, 0.82, 0.28]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.08, 0.82, 0.28]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}

function Bird({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.7, 0.1]} castShadow>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.25, 0.4, 0]} rotation={[0, 0, -0.4]} castShadow>
        <boxGeometry args={[0.1, 0.35, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.25, 0.4, 0]} rotation={[0, 0, 0.4]} castShadow>
        <boxGeometry args={[0.1, 0.35, 0.3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.08, 0.75, 0.18]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.08, 0.75, 0.18]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}

function Eagle({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.45, 0]} castShadow>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.75, 0.15]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.3, 0.45, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.12, 0.45, 0.35]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.3, 0.45, 0]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.12, 0.45, 0.35]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.08, 0.78, 0.2]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
      <mesh position={[0.08, 0.78, 0.2]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  );
}

function Penguin({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.8, 0.1]} castShadow>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.8, 0.1]} castShadow>
        <sphereGeometry args={[0.24, 16, 16]} />
        <meshStandardMaterial color="#FFF" />
      </mesh>
      <mesh position={[-0.1, 0.95, 0.25]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.1, 0.95, 0.25]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}

function Dragonfly({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.3, 0.55, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.08, 0.5, 0.25]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.3, 0.55, 0]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.08, 0.5, 0.25]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.2, 0.4, 0]} rotation={[0, 0, -0.5]} castShadow>
        <boxGeometry args={[0.06, 0.35, 0.2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.2, 0.4, 0]} rotation={[0, 0, 0.5]} castShadow>
        <boxGeometry args={[0.06, 0.35, 0.2]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.75, 0]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}

function Snake({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.3, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.12, 0.12, 1.2, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.3, 0.6, 0]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.35, 0.65, 0.1]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.35, 0.65, -0.1]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}

function Crocodile({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.5, 0.35, 1.4]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.5, 0.65]} castShadow>
        <boxGeometry args={[0.4, 0.3, 0.5]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.15, 0.6, 0.8]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[-0.15, 0.6, 0.8]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}

function Lizard({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.4, 0.3, 0.8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.5, 0.35]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.08, 0.55, 0.48]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.08, 0.55, 0.48]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0, 0.28, -0.35]} rotation={[0.3, 0, 0]} castShadow>
        <boxGeometry args={[0.15, 0.25, 0.4]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function Whale({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.3, 0.6, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <coneGeometry args={[0.3, 0.4, 3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.75, 0.1]} castShadow>
        <coneGeometry args={[0.2, 0.35, 3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.15, 0.6, 0.3]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.15, 0.6, -0.3]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}

function Dolphin({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.5, 0]} rotation={[0, 0, Math.PI / 8]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.25, 0.6, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <coneGeometry args={[0.2, 0.3, 3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.7, 0.08]} castShadow>
        <coneGeometry args={[0.15, 0.25, 3]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.12, 0.58, 0.25]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.12, 0.58, -0.25]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}

function Turtle({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.42, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.42, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0, 0.25, 0.35]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.2, 0.3, -0.15]} castShadow>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.2, 0.3, -0.15]} castShadow>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function Crab({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.3, 0.35, 0.1]} rotation={[0, 0, -Math.PI / 6]} castShadow>
        <boxGeometry args={[0.1, 0.4, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.3, 0.35, 0.1]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <boxGeometry args={[0.1, 0.4, 0.08]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.15, 0.42, 0.2]} castShadow>
        <boxGeometry args={[0.08, 0.25, 0.06]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.15, 0.42, 0.2]} castShadow>
        <boxGeometry args={[0.08, 0.25, 0.06]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.08, 0.58, 0.22]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      <mesh position={[0.08, 0.58, 0.22]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial color="#000" />
      </mesh>
    </group>
  );
}

function Tree({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 1.2, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 1.4, 0]} castShadow>
        <coneGeometry args={[0.5, 0.8, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.9, 0]} castShadow>
        <coneGeometry args={[0.6, 0.8, 32]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function Flower({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.8, 16]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0, 1.0, 0]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.18, 0.85, 0]} castShadow>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.18, 0.85, 0]} castShadow>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.85, -0.18]} castShadow>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.85, 0.18]} castShadow>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 1.0, 0]}>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  );
}

function Grass({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[-0.15, 0.25, 0]} rotation={[0.3, 0, -0.3]} castShadow>
        <boxGeometry args={[0.06, 0.5, 0.04]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.3, 0]} rotation={[0.2, 0, 0]} castShadow>
        <boxGeometry args={[0.06, 0.55, 0.04]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.15, 0.25, 0]} rotation={[0.3, 0, 0.3]} castShadow>
        <boxGeometry args={[0.06, 0.5, 0.04]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.08, 0.2, 0.1]} rotation={[0.25, 0.2, -0.2]} castShadow>
        <boxGeometry args={[0.05, 0.45, 0.03]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.08, 0.22, 0.1]} rotation={[0.25, -0.2, 0.2]} castShadow>
        <boxGeometry args={[0.05, 0.48, 0.03]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function Cactus({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 1.0, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.35, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 0.7, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.35, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 0.7, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.8, 0.35]} castShadow>
        <boxGeometry args={[0.08, 0.2, 0.15]} />
        <meshStandardMaterial color="#FFD700" />
      </mesh>
    </group>
  );
}

function CoconutTree({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 1.0, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 1.35, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.3, 1.15, 0.25]} castShadow>
        <boxGeometry args={[0.1, 0.4, 0.06]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0.3, 1.15, 0.25]} castShadow>
        <boxGeometry args={[0.1, 0.4, 0.06]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );
}

function Sunflower({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.12, 1.2, 16]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0, 1.4, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.25, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.25, 1.2, 0]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 1.2, -0.25]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 1.2, 0.25]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}

function Rose({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.06, 0.08, 0.8, 16]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0, 1.0, 0]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 1.0, 0]} castShadow>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.08, 0.7, 0.08]} castShadow>
        <boxGeometry args={[0.04, 0.25, 0.03]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0.08, 0.7, 0.08]} castShadow>
        <boxGeometry args={[0.04, 0.25, 0.03]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );
}

function PalmTree({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.28, 1.2, 16]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[0, 1.35, 0]} castShadow>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.35, 1.1, 0.15]} rotation={[0.3, -0.4, 0]} castShadow>
        <boxGeometry args={[0.08, 0.4, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.35, 1.1, 0.15]} rotation={[0.3, 0.4, 0]} castShadow>
        <boxGeometry args={[0.08, 0.4, 0.05]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function Mushroom({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.35, 16]} />
        <meshStandardMaterial color="#D2691E" />
      </mesh>
      <mesh position={[0, 0.42, 0]} castShadow>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.1, 0.35, 0.1]} castShadow>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#FFF" />
      </mesh>
      <mesh position={[0.1, 0.35, 0.1]} castShadow>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#FFF" />
      </mesh>
    </group>
  );
}

function Leaf({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.3, 0]} rotation={[0.2, 0.3, 0.1]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.3, 0]} rotation={[0.2, 0.3, 0.1]} castShadow>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.1, 0.35, 0.15]} castShadow>
        <boxGeometry args={[0.05, 0.15, 0.03]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
    </group>
  );
}

function Rice({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[-0.12, 0.4, 0]} rotation={[0, 0, -0.2]} castShadow>
        <boxGeometry args={[0.08, 0.7, 0.06]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.4, 0]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.08, 0.8, 0.06]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.12, 0.4, 0]} rotation={[0, 0, 0.2]} castShadow>
        <boxGeometry args={[0.08, 0.7, 0.06]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.1, 0]} castShadow>
        <cylinderGeometry args={[0.15, 0.18, 0.15, 8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
    </group>
  );
}

function Spinach({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.18, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0.18, 0.35, 0]} castShadow>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.35, -0.18]} castShadow>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[0, 0.35, 0.18]} castShadow>
        <sphereGeometry args={[0.18, 8, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
    </group>
  );
}

function Chili({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.6, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.12, 0.9, 16]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0, 1.15, 0.05]} rotation={[Math.PI / 4, 0, 0]} castShadow>
        <boxGeometry args={[0.25, 0.4, 0.12]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.1, 1.05, 0]} castShadow>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0.1, 1.05, 0]} castShadow>
        <sphereGeometry args={[0.08, 8, 8]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );
}

function Corn({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.7, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.15, 1.2, 16]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0, 1.15, 0]} rotation={[0, 0, 0.1]} castShadow>
        <cylinderGeometry args={[0.22, 0.25, 0.5, 8]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.15, 0.95, 0.1]} castShadow>
        <boxGeometry args={[0.08, 0.35, 0.06]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0.15, 0.95, 0.1]} castShadow>
        <boxGeometry args={[0.08, 0.35, 0.06]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );
}

function Pineapple({ color }: { color: string }) {
  const s = SCALE;
  return (
    <group scale={[s, s, s]}>
      <mesh position={[0, 0.4, 0]} castShadow>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh position={[-0.15, 0.75, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.08, 0.35, 0.05]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0.15, 0.75, 0]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.08, 0.35, 0.05]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0, 0.75, -0.12]} castShadow>
        <boxGeometry args={[0.08, 0.32, 0.05]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0, 0.75, 0.12]} castShadow>
        <boxGeometry args={[0.08, 0.32, 0.05]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );
}
