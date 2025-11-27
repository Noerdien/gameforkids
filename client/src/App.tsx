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
      {(phase === 'playing' || phase === 'success') && (
        <>
          <UnifiedGameScene />
          <UnifiedGameUI />
        </>
      )}
      {(phase === 'menu' || phase === 'levelComplete') && <UnifiedGameUI />}
      <SoundManager />
    </div>
  );
}

export default App;
