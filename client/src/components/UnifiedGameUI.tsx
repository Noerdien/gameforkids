import { useForestGame, ANIMALS } from "@/lib/stores/useForestGame";
import { useAudio } from "@/lib/stores/useAudio";
import { Button } from "./ui/button";
import { Volume2, VolumeX, Star, Award, ArrowLeft } from "lucide-react";
import { TebakHurufPertama } from "./modes/TebakHurufPertama";
import { CariHurufHilang } from "./modes/CariHurufHilang";
import { CocokkanGambar } from "./modes/CocokkanGambar";
import { KuisCepat } from "./modes/KuisCepat";

const MODE_NAMES: Record<string, string> = {
  susun_huruf: "Susun Huruf",
  tebak_pertama: "Tebak Huruf Pertama",
  cocokkan: "Cocokkan Gambar",
  huruf_hilang: "Cari Huruf Hilang",
  kuis: "Kuis Cepat",
};

export function UnifiedGameUI() {
  const {
    phase,
    gameMode,
    currentAnimal,
    selectedLetters,
    score,
    totalStars,
    currentLevel,
    startGame,
    nextLevel,
    resetGame,
    backToModeSelect,
  } = useForestGame();
  
  const { isMuted, toggleMute } = useAudio();
  
  if (phase === "menu") {
    return <MenuScreen onStart={startGame} mode={gameMode} onBack={backToModeSelect} />;
  }
  
  if (phase === "levelComplete") {
    return <CompleteScreen score={score} totalStars={totalStars} onRestart={resetGame} onBack={backToModeSelect} />;
  }
  
  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-start pointer-events-auto z-20">
        <div className="flex gap-4">
          <Button
            onClick={backToModeSelect}
            size="lg"
            className="rounded-full w-16 h-16 bg-gray-500 hover:bg-gray-600 text-white shadow-lg"
          >
            <ArrowLeft className="w-8 h-8" />
          </Button>
          
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg">
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
              <span className="text-3xl font-bold text-gray-800">{totalStars}</span>
            </div>
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
      
      {/* Mode-specific content */}
      {gameMode === "susun_huruf" && currentAnimal && (
        <>
          <div className="absolute top-24 left-1/2 -translate-x-1/2 pointer-events-auto z-10">
            <div className="bg-gradient-to-r from-pink-400 to-purple-500 rounded-3xl px-8 py-6 shadow-2xl">
              <div className="text-center">
                <p className="text-white text-2xl font-bold mb-2">Bantu {currentAnimal.emoji} pulang!</p>
                <p className="text-white text-xl">Susun huruf:</p>
                <p className="text-5xl font-bold text-white mt-2 tracking-wider">{currentAnimal.name}</p>
              </div>
            </div>
          </div>
          
          {selectedLetters.length > 0 && (
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 pointer-events-none z-10">
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-8 py-6 shadow-xl">
                <p className="text-4xl font-bold text-gray-800 tracking-widest">
                  {selectedLetters.map(sl => sl.letter).join("")}
                </p>
              </div>
            </div>
          )}
        </>
      )}
      
      {gameMode === "tebak_pertama" && <TebakHurufPertama />}
      {gameMode === "huruf_hilang" && <CariHurufHilang />}
      {gameMode === "cocokkan" && <CocokkanGambar />}
      {gameMode === "kuis" && <KuisCepat />}
      
      {/* Success overlay */}
      {phase === "success" && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm pointer-events-auto z-30">
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

function MenuScreen({ onStart, mode, onBack }: { onStart: () => void; mode: string | null; onBack: () => void }) {
  const modeName = mode ? MODE_NAMES[mode] : "Game";
  const canStart = mode !== null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-green-300 via-blue-400 to-purple-500">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-7xl font-bold text-white mb-4 drop-shadow-lg">
            {modeName}
          </h1>
          <p className="text-3xl text-white drop-shadow">
            Bantu hewan-hewan lucu menemukan jalan pulang!
          </p>
        </div>
        
        <div className="mb-12 flex justify-center gap-4 text-6xl">
          {ANIMALS.map((animal, idx) => (
            <div key={animal.id} className="animate-bounce" style={{ animationDelay: `${idx * 0.1}s` }}>
              {animal.emoji}
            </div>
          ))}
        </div>
        
        {!canStart && (
          <div className="mb-6 bg-red-500/80 text-white px-8 py-4 rounded-2xl text-xl font-bold">
            Silakan pilih mode permainan terlebih dahulu!
          </div>
        )}
        
        <div className="flex gap-4 justify-center">
          <Button
            onClick={onBack}
            size="lg"
            className="text-2xl px-12 py-8 rounded-3xl bg-gray-400 hover:bg-gray-500 text-white font-bold shadow-2xl"
          >
            Kembali
          </Button>
          
          <Button
            onClick={onStart}
            disabled={!canStart}
            size="lg"
            className={`text-3xl px-16 py-10 rounded-3xl font-bold shadow-2xl transform transition-transform ${
              canStart
                ? "bg-yellow-400 hover:bg-yellow-500 text-gray-800 hover:scale-110"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Mulai Bermain!
          </Button>
        </div>
        
        <div className="mt-12 text-white text-xl">
          <p>⭐ Kumpulkan bintang sebanyak-banyaknya!</p>
        </div>
      </div>
    </div>
  );
}

function CompleteScreen({ score, totalStars, onRestart, onBack }: { score: number; totalStars: number; onRestart: () => void; onBack: () => void }) {
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
        
        <div className="flex gap-4 justify-center">
          <Button
            onClick={onBack}
            size="lg"
            className="text-2xl px-12 py-8 rounded-3xl bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-2xl"
          >
            Pilih Mode Lain
          </Button>
          
          <Button
            onClick={onRestart}
            size="lg"
            className="text-3xl px-16 py-10 rounded-3xl bg-green-500 hover:bg-green-600 text-white font-bold shadow-2xl transform hover:scale-110 transition-transform"
          >
            Main Lagi!
          </Button>
        </div>
      </div>
    </div>
  );
}
