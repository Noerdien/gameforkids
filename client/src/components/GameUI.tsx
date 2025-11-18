import { useForestGame, ANIMALS } from "@/lib/stores/useForestGame";
import { useAudio } from "@/lib/stores/useAudio";
import { Button } from "./ui/button";
import { Volume2, VolumeX, Star, Award } from "lucide-react";

export function GameUI() {
  const {
    phase,
    currentAnimal,
    selectedLetters,
    score,
    totalStars,
    currentLevel,
    startGame,
    nextLevel,
    resetGame,
  } = useForestGame();
  
  const { isMuted, toggleMute } = useAudio();
  
  if (phase === "menu") {
    return <MenuScreen onStart={startGame} />;
  }
  
  if (phase === "levelComplete") {
    return <CompleteScreen score={score} totalStars={totalStars} onRestart={resetGame} />;
  }
  
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start pointer-events-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
            <span className="text-3xl font-bold text-gray-800">{totalStars}</span>
          </div>
        </div>
        
        <Button
          onClick={toggleMute}
          size="lg"
          className="rounded-full w-16 h-16 bg-purple-500 hover:bg-purple-600 text-white shadow-lg"
        >
          {isMuted ? <VolumeX className="w-8 h-8" /> : <Volume2 className="w-8 h-8" />}
        </Button>
      </div>
      
      {/* Current animal and instruction */}
      {currentAnimal && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 pointer-events-auto">
          <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-3xl px-8 py-6 shadow-2xl">
            <div className="text-center">
              <p className="text-white text-2xl font-bold mb-2">Bantu {currentAnimal.emoji} pulang!</p>
              <p className="text-white text-xl">Susun huruf:</p>
              <p className="text-5xl font-bold text-white mt-2 tracking-wider">{currentAnimal.name}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Selected letters display */}
      {selectedLetters.length > 0 && (
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 pointer-events-none">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-xl">
            <p className="text-4xl font-bold text-gray-800 tracking-widest">
              {selectedLetters.map(sl => sl.letter).join("")}
            </p>
          </div>
        </div>
      )}
      
      {/* Success overlay */}
      {phase === "success" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm pointer-events-auto">
          <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl p-12 shadow-2xl text-center transform animate-bounce">
            <div className="text-8xl mb-4">{currentAnimal?.emoji}</div>
            <h2 className="text-6xl font-bold text-white mb-4">HEBAT!</h2>
            <p className="text-3xl text-white mb-8">+100 Poin!</p>
            
            <Button
              onClick={nextLevel}
              size="lg"
              className="text-2xl px-12 py-8 rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold shadow-lg"
            >
              {currentLevel < ANIMALS.length - 1 ? "Hewan Selanjutnya!" : "Selesai!"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function MenuScreen({ onStart }: { onStart: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-green-300 via-blue-400 to-purple-500">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-7xl font-bold text-white mb-4 drop-shadow-lg">
            🌳 Penyelamat Abjad Hutan 🌳
          </h1>
          <p className="text-3xl text-white drop-shadow">
            Bantu hewan-hewan lucu menemukan jalan pulang!
          </p>
        </div>
        
        <div className="mb-12 flex justify-center gap-4 text-6xl">
          {ANIMALS.map((animal) => (
            <div key={animal.id} className="animate-bounce" style={{ animationDelay: `${Math.random()}s` }}>
              {animal.emoji}
            </div>
          ))}
        </div>
        
        <Button
          onClick={onStart}
          size="lg"
          className="text-3xl px-16 py-10 rounded-3xl bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold shadow-2xl transform hover:scale-110 transition-transform"
        >
          Mulai Bermain!
        </Button>
        
        <div className="mt-12 text-white text-xl">
          <p>📝 Klik huruf untuk mengeja nama hewan</p>
          <p className="mt-2">⭐ Kumpulkan bintang sebanyak-banyaknya!</p>
        </div>
      </div>
    </div>
  );
}

function CompleteScreen({ score, totalStars, onRestart }: { score: number; totalStars: number; onRestart: () => void }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500">
      <div className="text-center">
        <div className="mb-8">
          <Award className="w-32 h-32 text-white mx-auto mb-4" />
          <h1 className="text-7xl font-bold text-white mb-4 drop-shadow-lg">
            SELAMAT!
          </h1>
          <p className="text-3xl text-white drop-shadow mb-4">
            Kamu telah menyelamatkan semua hewan! 🎉
          </p>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-12 mb-8 shadow-2xl">
          <div className="flex items-center justify-center gap-8 mb-6">
            <div className="text-center">
              <Star className="w-16 h-16 text-yellow-500 fill-yellow-500 mx-auto mb-2" />
              <p className="text-5xl font-bold text-gray-800">{totalStars}</p>
              <p className="text-xl text-gray-600">Bintang</p>
            </div>
            
            <div className="text-center">
              <Award className="w-16 h-16 text-purple-500 mx-auto mb-2" />
              <p className="text-5xl font-bold text-gray-800">{score}</p>
              <p className="text-xl text-gray-600">Poin</p>
            </div>
          </div>
        </div>
        
        <Button
          onClick={onRestart}
          size="lg"
          className="text-3xl px-16 py-10 rounded-3xl bg-green-500 hover:bg-green-600 text-white font-bold shadow-2xl transform hover:scale-110 transition-transform"
        >
          Main Lagi!
        </Button>
      </div>
    </div>
  );
}
