import { useMemo } from "react";
import { useForestGame, ANIMALS, type Animal } from "@/lib/stores/useForestGame";
import { useAudio } from "@/lib/stores/useAudio";

// Simple seeded shuffle using animal ID
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

export function CocokkanGambar() {
  const { currentAnimal, selectedAnswer, selectAnswer, checkAnswer } = useForestGame();
  const { playHit } = useAudio();
  
  if (!currentAnimal) return null;
  
  // Generate 4 options: correct name + 3 random wrong names (stable per animal)
  const options = useMemo(() => {
    const wrongAnimals = seededShuffle(
      ANIMALS.filter(a => a.id !== currentAnimal.id),
      currentAnimal.id + "_wrong"
    ).slice(0, 3);
    
    const allOptions = seededShuffle(
      [currentAnimal, ...wrongAnimals],
      currentAnimal.id + "_all"
    );
    return allOptions;
  }, [currentAnimal.id]);
  
  const handleSelectName = (animal: Animal) => {
    selectAnswer(animal.name);
    playHit();
    
    setTimeout(() => {
      checkAnswer(currentAnimal.name);
    }, 500);
  };
  
  return (
    <div className="relative w-full min-h-screen p-4 flex flex-col items-center justify-center gap-8 py-20 pointer-events-auto">
      <div className="text-center w-full max-w-2xl">
        {/* Question with animal emoji */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl sm:rounded-3xl px-6 sm:px-8 md:px-12 py-4 md:py-8 shadow-lg md:shadow-2xl">
            <p className="text-white text-lg sm:text-2xl md:text-3xl font-bold mb-3 md:mb-6">
              Nama hewan ini adalah?
            </p>
            <div className="text-5xl sm:text-7xl md:text-9xl">{currentAnimal.emoji}</div>
          </div>
        </div>
        
        {/* Name options in a grid */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-6 max-w-2xl mx-auto">
          {options.map((animal) => (
            <button
              key={animal.id}
              onClick={() => handleSelectName(animal)}
              disabled={selectedAnswer !== null}
              className={`px-3 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 rounded-lg sm:rounded-2xl font-bold text-sm sm:text-xl md:text-3xl shadow-lg md:shadow-xl transition-all active:scale-95 pointer-events-auto ${
                selectedAnswer === animal.name
                  ? animal.name === currentAnimal.name
                    ? "bg-green-500 text-white scale-105"
                    : "bg-red-500 text-white scale-95"
                  : "bg-white text-gray-800 hover:scale-105 hover:bg-yellow-400"
              }`}
            >
              {animal.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
