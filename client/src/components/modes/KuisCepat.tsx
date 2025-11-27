import { useMemo } from "react";
import { useForestGame, ANIMALS, type Animal } from "@/lib/stores/useForestGame";
import { useAudio } from "@/lib/stores/useAudio";

// Clues for each animal
const CLUES: Record<string, string[]> = {
  kucing: [
    "Hewan peliharaan yang suka mengeong",
    "Punya kumis dan suka makan ikan",
    "Hewan yang suka tidur dan bermain dengan benang",
  ],
  kelinci: [
    "Hewan yang suka makan wortel",
    "Punya telinga panjang dan ekor pendek",
    "Hewan yang melompat-lompat dengan lucu",
  ],
  bebek: [
    "Hewan yang suka berenang di kolam",
    "Punya paruh lebar dan kaki berselaput",
    "Hewan yang bersuara kwek-kwek",
  ],
  ayam: [
    "Hewan yang berkokok di pagi hari",
    "Punya jengger merah di kepala",
    "Hewan yang bertelur untuk kita makan",
  ],
  ikan: [
    "Hewan yang hidup di air",
    "Punya sirip dan ekor untuk berenang",
    "Hewan yang bernapas dengan insang",
  ],
};

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

export function KuisCepat() {
  const { currentAnimal, selectedAnswer, selectAnswer, checkAnswer } = useForestGame();
  const { playHit } = useAudio();
  
  if (!currentAnimal) return null;
  
  // Get a stable clue for the current animal
  const clue = useMemo(() => {
    const clues = CLUES[currentAnimal.id] || ["Hewan lucu dari hutan"];
    const index = Math.floor(seededRandom(currentAnimal.id + "_clue") * clues.length);
    return clues[index];
  }, [currentAnimal.id]);
  
  // Generate 4 options: correct animal + 3 random wrong animals (stable per animal)
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
  
  const handleSelectAnimal = (animal: Animal) => {
    selectAnswer(animal.name);
    playHit();
    
    setTimeout(() => {
      checkAnswer(currentAnimal.name);
    }, 500);
  };
  
  return (
    <div className="relative w-full min-h-screen p-4 flex flex-col items-center justify-center gap-8 py-20 pointer-events-auto">
      <div className="text-center w-full max-w-2xl">
        {/* Question with clue */}
        <div className="mb-6 sm:mb-8 md:mb-12">
          <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl sm:rounded-3xl px-6 sm:px-8 md:px-12 py-4 md:py-8 shadow-lg md:shadow-2xl">
            <p className="text-white text-lg sm:text-2xl md:text-3xl font-bold mb-2 md:mb-4">
              🧠 Tebak Hewan Apa Ini? 🧠
            </p>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-2xl px-4 sm:px-6 md:px-8 py-3 md:py-6 mb-2 md:mb-4">
              <p className="text-white text-sm sm:text-lg md:text-2xl italic">
                "{clue}"
              </p>
            </div>
            <p className="text-white text-sm sm:text-base md:text-xl">
              Pilih nama hewan yang benar!
            </p>
          </div>
        </div>
        
        {/* Animal emoji options */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-6">
          {options.map((animal) => (
            <button
              key={animal.id}
              onClick={() => handleSelectAnimal(animal)}
              disabled={selectedAnswer !== null}
              className={`px-3 sm:px-6 md:px-8 py-4 sm:py-6 md:py-8 rounded-lg sm:rounded-2xl shadow-lg md:shadow-xl transition-all active:scale-95 pointer-events-auto ${
                selectedAnswer === animal.name
                  ? animal.name === currentAnimal.name
                    ? "bg-green-500 scale-105"
                    : "bg-red-500 scale-95"
                  : "bg-white hover:scale-105 hover:bg-yellow-400"
              }`}
            >
              <div className="text-4xl sm:text-6xl md:text-7xl mb-1 md:mb-3">{animal.emoji}</div>
              <p className={`text-sm sm:text-lg md:text-2xl font-bold ${
                selectedAnswer === animal.name ? "text-white" : "text-gray-800"
              }`}>
                {animal.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
