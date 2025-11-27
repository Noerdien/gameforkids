import { useEffect, useState } from "react";
import { useForestGame } from "./lib/stores/useForestGame";
import { UnifiedGameScene } from "./components/UnifiedGameScene";
import { UnifiedGameUI } from "./components/UnifiedGameUI";
import { ModeSelectScreen } from "./components/ModeSelectScreen";
import { MenuScreen } from "./components/MenuScreen";
import { CompleteScreen } from "./components/UnifiedGameUI";
import { GameHeaderScreen } from "./components/GameHeaderScreen";
import { SoundManager } from "./components/SoundManager";
import "@fontsource/inter";

function App() {
  const [showGame, setShowGame] = useState(false);
  const { phase } = useForestGame();

  useEffect(() => {
    setShowGame(true);
  }, []);

  if (!showGame) {
    return null;
  }

  return (
    <div style={{ width: '100vw', minHeight: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {phase === 'header' && <GameHeaderScreen />}
      {phase === 'mode_select' && <ModeSelectScreen />}
      {phase === 'menu' && <MenuScreen />}
      
      {(phase === 'playing' || phase === 'success') && (
        <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'hidden' }}>
          {/* Canvas - Mobile responsive */}
          <div style={{ 
            position: 'relative', 
            width: '100%', 
            height: 'clamp(250px, 50vh, 500px)',
            flexShrink: 0,
            zIndex: 0,
            backgroundColor: '#87CEEB'
          }}>
            <UnifiedGameScene />
          </div>
          
          {/* UI Overlay - Scrollable */}
          <div style={{ 
            flex: 1, 
            position: 'relative', 
            overflowY: 'auto', 
            overflowX: 'hidden', 
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'rgba(255, 255, 255, 0.95)'
          }}>
            <UnifiedGameUI />
          </div>
        </div>
      )}
      
      {phase === 'levelComplete' && <CompleteScreen />}
      
      <SoundManager />
    </div>
  );
}

export default App;
