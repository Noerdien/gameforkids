import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { Suspense } from "react";
import { ForestEnvironment } from "./ForestEnvironment";
import { AnimalCharacter } from "./AnimalCharacter";
import { useForestGame } from "@/lib/stores/useForestGame";
import { SuccessParticles } from "./SuccessParticles";
import { LetterBlocksContainer } from "./LetterBlock";

export function UnifiedGameScene() {
  const { currentAnimal, phase, gameMode } = useForestGame();
  
  if (!currentAnimal) return null;
  
  const isCorrect = phase === "success";
  const showLetterBlocks = gameMode === "susun_huruf";
  
  return (
    <Canvas shadows gl={{ antialias: true }}>
      <color attach="background" args={["#87CEEB"]} />
      
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 5, 8]} fov={50} />
      
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[-5, 5, -5]} intensity={0.5} color="#FFD700" />
      
      <Suspense fallback={null}>
        {/* Environment */}
        <ForestEnvironment />
        
        {/* Animal character */}
        <AnimalCharacter animal={currentAnimal} isCorrect={isCorrect} />
        
        {/* Letter blocks only for susun_huruf mode */}
        {showLetterBlocks && <LetterBlocksContainer />}
        
        {/* Success particles */}
        {isCorrect && <SuccessParticles />}
      </Suspense>
      
      {/* Controls - full 360 rotation for kids */}
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        maxPolarAngle={Math.PI}
        minPolarAngle={0}
        maxAzimuthAngle={Math.PI * 2}
        minAzimuthAngle={-Math.PI * 2}
        autoRotate={false}
      />
    </Canvas>
  );
}
