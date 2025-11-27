import { useEffect, useState } from "react";
import { useForestGame } from "./lib/stores/useForestGame";
import { UnifiedGameScene } from "./components/UnifiedGameScene";
import { UnifiedGameUI } from "./components/UnifiedGameUI";
import { ModeSelectScreen } from "./components/ModeSelectScreen";
import { GameHeaderScreen } from "./components/GameHeaderScreen";
import { SoundManager } from "./components/SoundManager";
import "@fontsource/inter";

function App() {
  const [showGame, setShowGame] = useState(false);
  const { phase, gameMode } = useForestGame();

  useEffect(() => {
    setShowGame(true);
  }, []);

  if (!showGame) {
    return null;
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {phase === 'header' && <GameHeaderScreen />}
      {phase === 'mode_select' && <ModeSelectScreen />}
      
      {/* 3D Canvas Container - isolated */}
      {(phase === 'playing' || phase === 'success') && (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <UnifiedGameScene />
        </div>
      )}
      
      {/* UI Overlay - completely separate */}
      {(phase === 'playing' || phase === 'success' || phase === 'menu' || phase === 'levelComplete') && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 10, pointerEvents: 'none' }}>
          <UnifiedGameUI />
        </div>
      )}
      
      <SoundManager />
    </div>
  );
}

export default App;
