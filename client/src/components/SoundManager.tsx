import { useEffect } from "react";
import { useAudio } from "@/lib/stores/useAudio";
import { useForestGame } from "@/lib/stores/useForestGame";

export function SoundManager() {
  const { setBackgroundMusic, setHitSound, setSuccessSound, isMuted, playSuccess } = useAudio();
  const phase = useForestGame((state) => state.phase);
  
  useEffect(() => {
    // Load all sounds
    const bgMusic = new Audio("/sounds/background.mp3");
    bgMusic.loop = true;
    bgMusic.volume = 0.3;
    setBackgroundMusic(bgMusic);
    
    const hit = new Audio("/sounds/hit.mp3");
    setHitSound(hit);
    
    const success = new Audio("/sounds/success.mp3");
    setSuccessSound(success);
    
    console.log("Sounds loaded");
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);
  
  // Play success sound when phase changes to success
  useEffect(() => {
    if (phase === "success") {
      playSuccess();
    }
  }, [phase, playSuccess]);
  
  return null;
}
