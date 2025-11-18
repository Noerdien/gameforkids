import { useEffect, useState } from "react";
import { useForestGame } from "./lib/stores/useForestGame";
import { GameScene } from "./components/GameScene";
import { GameUI } from "./components/GameUI";
import { SoundManager } from "./components/SoundManager";
import "@fontsource/inter";

function App() {
  const [showGame, setShowGame] = useState(false);
  const phase = useForestGame((state) => state.phase);

  useEffect(() => {
    setShowGame(true);
  }, []);

  if (!showGame) {
    return null;
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* 3D Game Scene - only show when playing or success */}
      {(phase === 'playing' || phase === 'success') && <GameScene />}
      
      {/* UI Overlay */}
      <GameUI />
      
      {/* Sound Manager */}
      <SoundManager />
    </div>
  );
}

export default App;
