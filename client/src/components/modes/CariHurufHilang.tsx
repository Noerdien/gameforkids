import { useMemo } from "react";
import { useForestGame } from "@/lib/stores/useForestGame";
import { useAudio } from "@/lib/stores/useAudio";
import { AnimalCharacter } from "../AnimalCharacter";

// Simple seeded random for stable generation
function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash >>> 0;
  }
  hash = (hash * 9301 + 49297) >>> 0;
  return ((hash % 233280) / 233280);
}

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

export function CariHurufHilang() {
  const { currentAnimal, selectedAnswer, checkAnswer, selectAnswer } = useForestGame();
  const { playHit } = useAudio();
  
  if (!currentAnimal) return null;
  
  // Hide one letter from the name (stable per animal)
  const { hiddenIndex, displayName, hiddenLetter, options } = useMemo(() => {
    const name = currentAnimal.name;
    const index = Math.floor(seededRandom(currentAnimal.id + "_index") * name.length);
    const hidden = name[index];
    const display = name.split("").map((l, i) => i === index ? "_" : l).join(" ");
    
    // Generate options: correct letter + 3 random wrong letters
    const allLetters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    const wrongLetters = seededShuffle(
      allLetters.filter(l => l !== hidden),
      currentAnimal.id + "_wrong"
    ).slice(0, 3);
    const opts = seededShuffle(
      [hidden, ...wrongLetters],
      currentAnimal.id + "_all"
    );
    
    return {
      hiddenIndex: index,
      displayName: display,
      hiddenLetter: hidden,
      options: opts,
    };
  }, [currentAnimal.id]);
  
  const handleSelectLetter = (letter: string) => {
    selectAnswer(letter);
    playHit();
    
    setTimeout(() => {
      checkAnswer(hiddenLetter);
    }, 500);
  };
  
  return (
    <div className="relative w-full h-full p-4 flex flex-col items-center justify-between">
      {/* Question */}
      <div className="absolute top-8 sm:top-16 md:top-32 left-1/2 -translate-x-1/2 z-10 w-[90%] max-w-xl">
        <div className="bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl sm:rounded-3xl px-4 sm:px-6 md:px-8 py-3 md:py-6 shadow-xl md:shadow-2xl">
          <p className="text-white text-sm sm:text-lg md:text-2xl font-bold mb-2 md:mb-4 text-center">
            Huruf apa yang hilang? {currentAnimal.emoji}
          </p>
          <p className="text-3xl sm:text-4xl md:text-6xl font-bold text-white text-center tracking-widest">
            {displayName}
          </p>
        </div>
      </div>
      
      {/* Letter options */}
      <div className="absolute bottom-8 sm:bottom-16 md:bottom-32 left-1/2 -translate-x-1/2 z-10">
        <div className="flex gap-2 sm:gap-3 md:gap-6 flex-wrap justify-center">
          {options.map((letter) => (
            <button
              key={letter}
              onClick={() => handleSelectLetter(letter)}
              disabled={selectedAnswer !== null}
              className={`w-14 h-14 sm:w-18 sm:h-18 md:w-24 md:h-24 rounded-lg sm:rounded-2xl font-bold text-2xl sm:text-3xl md:text-4xl shadow-lg md:shadow-xl transition-all active:scale-95 ${
                selectedAnswer === letter
                  ? letter === hiddenLetter
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
