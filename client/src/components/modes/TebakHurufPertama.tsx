import { useMemo } from "react";
import { useForestGame, ANIMALS } from "@/lib/stores/useForestGame";
import { useAudio } from "@/lib/stores/useAudio";
import { AnimalCharacter } from "../AnimalCharacter";
import { Button } from "../ui/button";

// Simple seeded shuffle for stable generation
function seededShuffle<T>(arr: T[], seed: string): T[] {
  const result = [...arr];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash >>> 0;
  }
  
  for (let i = result.length - 1; i > 0; i--) {
    hash = (hash * 9301 + 49297) >>> 0;
    const normalized = (hash % 233280) / 233280;
    const j = Math.floor(normalized * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function TebakHurufPertama() {
  const { currentAnimal, selectedAnswer, checkAnswer, selectAnswer } = useForestGame();
  const { playHit, playSuccess } = useAudio();
  
  if (!currentAnimal) return null;
  
  const correctLetter = currentAnimal.name[0];
  
  // Generate options: correct letter + 3 random wrong letters (stable per animal)
  const options = useMemo(() => {
    const allLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const wrongLetters = seededShuffle(
      allLetters.filter(l => l !== correctLetter),
      currentAnimal.id + "_wrong"
    ).slice(0, 3);
    return seededShuffle(
      [correctLetter, ...wrongLetters],
      currentAnimal.id + "_all"
    );
  }, [currentAnimal.id, correctLetter]);
  
  const handleSelectLetter = (letter: string) => {
    selectAnswer(letter);
    playHit();
    
    setTimeout(() => {
      checkAnswer(correctLetter);
    }, 500);
  };
  
  return (
    <div className="relative w-full min-h-screen p-4 flex flex-col items-center justify-center gap-12 py-20">
      {/* Question */}
      <div className="w-full flex justify-center">
        <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl sm:rounded-3xl px-4 sm:px-6 md:px-8 py-4 md:py-6 shadow-xl md:shadow-2xl max-w-xl w-full">
          <p className="text-white text-base sm:text-2xl md:text-3xl font-bold mb-1 md:mb-2">
            Huruf pertama dari nama hewan ini?
          </p>
          <p className="text-4xl sm:text-6xl md:text-7xl text-center">{currentAnimal.emoji}</p>
        </div>
      </div>
      
      {/* Letter options */}
      <div className="w-full flex justify-center pointer-events-auto">
        <div className="flex gap-2 sm:gap-3 md:gap-6 flex-wrap justify-center max-w-2xl">
          {options.map((letter) => (
            <button
              key={letter}
              onClick={() => handleSelectLetter(letter)}
              disabled={selectedAnswer !== null}
              className={`w-14 h-14 sm:w-18 sm:h-18 md:w-24 md:h-24 rounded-lg sm:rounded-2xl font-bold text-2xl sm:text-3xl md:text-4xl shadow-lg md:shadow-xl transition-all active:scale-95 ${
                selectedAnswer === letter
                  ? letter === correctLetter
                    ? "bg-green-500 text-white scale-110"
                    : "bg-red-500 text-white scale-90"
                  : "bg-white text-gray-800 hover:scale-110 hover:bg-yellow-400"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
