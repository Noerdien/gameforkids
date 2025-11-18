import { useEffect, useState } from "react";
import { useForestGame } from "./lib/stores/useForestGame";
import { UnifiedGameScene } from "./components/UnifiedGameScene";
import { UnifiedGameUI } from "./components/UnifiedGameUI";
import { ModeSelectScreen } from "./components/ModeSelectScreen";
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
      {/* Mode Selection Screen */}
      {phase === 'mode_select' && <ModeSelectScreen />}
      
      {/* 3D Game Scene - show when playing or success */}
      {(phase === 'playing' || phase === 'success') && <UnifiedGameScene />}
      
      {/* UI Overlay - show for menu, playing, success, and levelComplete */}
      {phase !== 'mode_select' && <UnifiedGameUI />}
      
      {/* Sound Manager */}
      <SoundManager />
    </div>
  );
}

export default App;
