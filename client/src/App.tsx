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
  const [, setOrientation] = useState(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
  const { phase } = useForestGame();

  useEffect(() => {
    setShowGame(true);
  }, []);

  useEffect(() => {
    const handleOrientationChange = () => {
      setOrientation(window.innerWidth > window.innerHeight ? 'landscape' : 'portrait');
      window.scrollTo(0, 0);
    };

    window.addEventListener('orientationchange', handleOrientationChange);
    window.addEventListener('resize', handleOrientationChange);

    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
      window.removeEventListener('resize', handleOrientationChange);
    };
  }, []);

  if (!showGame) {
    return null;
  }

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {phase === 'header' && <GameHeaderScreen />}
      {phase === 'mode_select' && <ModeSelectScreen />}
      {phase === 'menu' && <MenuScreen />}
      
      {(phase === 'playing' || phase === 'success') && (
        <>
          {/* Canvas - Full screen */}
          <div style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%', 
            height: '100%',
            zIndex: 0,
            backgroundColor: '#87CEEB'
          }}>
            <UnifiedGameScene />
          </div>
          
          {/* UI Overlay - Full screen overlay */}
          <div style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%', 
            height: '100%',
            zIndex: 10,
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            <UnifiedGameUI />
          </div>
        </>
      )}
      
      {phase === 'levelComplete' && <CompleteScreen />}
      
      <SoundManager />
    </div>
  );
}

export default App;
