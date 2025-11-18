import { useRef, useState, useMemo } from "react";
import { useFrame, ThreeEvent } from "@react-three/fiber";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useForestGame } from "@/lib/stores/useForestGame";
import { useAudio } from "@/lib/stores/useAudio";

interface LetterBlockProps {
  letter: string;
  blockId: string;
  position: [number, number, number];
  color: string;
}

export function LetterBlock({ letter, blockId, position, color }: LetterBlockProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const selectLetter = useForestGame((state) => state.selectLetter);
  const selectedLetters = useForestGame((state) => state.selectedLetters);
  const { playHit } = useAudio();
  
  const isSelected = selectedLetters.some(sl => sl.blockId === blockId);
  
  useFrame((state) => {
    if (meshRef.current) {
      if (clicked) {
        // Bounce up when clicked
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 10) * 0.3;
      } else if (hovered) {
        // Float when hovered
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3) * 0.1;
        meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 2) * 0.2;
      } else {
        // Idle animation
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.05;
        meshRef.current.rotation.y += (0 - meshRef.current.rotation.y) * 0.1;
      }
    }
  });
  
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!isSelected) {
      console.log("Letter clicked:", letter, "blockId:", blockId);
      setClicked(true);
      selectLetter(letter, blockId);
      playHit();
      
      setTimeout(() => {
        setClicked(false);
      }, 500);
    }
  };
  
  const displayColor = isSelected ? "#999" : (hovered ? "#FFD700" : color);
  
  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => !isSelected && setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial
          color={displayColor}
          roughness={0.3}
          metalness={0.1}
          emissive={hovered ? "#FFD700" : "#000"}
          emissiveIntensity={hovered ? 0.3 : 0}
        />
      </mesh>
      
      {/* Letter text on all sides */}
      <Text
        position={[0, 0, 0.41]}
        fontSize={0.5}
        color={isSelected ? "#666" : "#000"}
        anchorX="center"
        anchorY="middle"
        fontWeight="bold"
      >
        {letter}
      </Text>
      
      <Text
        position={[0, 0, -0.41]}
        fontSize={0.5}
        color={isSelected ? "#666" : "#000"}
        anchorX="center"
        anchorY="middle"
        rotation={[0, Math.PI, 0]}
        fontWeight="bold"
      >
        {letter}
      </Text>
    </group>
  );
}

export function LetterBlocksContainer() {
  const currentAnimal = useForestGame((state) => state.currentAnimal);
  
  if (!currentAnimal) return null;
  
  const shuffledLetters = useMemo(() => {
    const letters = currentAnimal.name.split("");
    return [...letters].sort(() => Math.random() - 0.5);
  }, [currentAnimal.id]);
  
  const totalWidth = shuffledLetters.length * 1.2;
  const startX = -totalWidth / 2 + 0.6;
  
  return (
    <group position={[0, 0, 2]}>
      {shuffledLetters.map((letter, index) => {
        const blockId = `block-${currentAnimal.id}-${index}`;
        return (
          <LetterBlock
            key={blockId}
            letter={letter}
            blockId={blockId}
            position={[startX + index * 1.2, 0.5, 0]}
            color="#4A90E2"
          />
        );
      })}
    </group>
  );
}
