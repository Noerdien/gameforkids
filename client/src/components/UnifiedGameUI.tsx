import { useForestGame, ANIMALS } from "@/lib/stores/useForestGame";
import { useAudio } from "@/lib/stores/useAudio";
import { Button } from "./ui/button";
import { Volume2, VolumeX, Star, ArrowLeft, Award } from "lucide-react";
import { useEffect } from "react";
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
    totalStars,
    currentLevel,
    nextLevel,
    backToModeSelect,
  } = useForestGame();
  
  const { isMuted, toggleMute } = useAudio();
  const isSusunHurf = gameMode === 'susun_huruf';
  
  return (
    <>
      {/* Header Game - Sticky at top - Always interactive */}
      <div className="z-30 bg-gradient-to-b from-blue-500 via-purple-500 to-transparent flex-shrink-0" style={{ pointerEvents: 'auto' }}>
        <div className="p-1.5 sm:p-2 md:p-4 text-center border-b-2 border-white/30">
          <h2 className="text-sm sm:text-lg md:text-3xl font-bold text-white drop-shadow-lg mb-0.5 sm:mb-1">
            🌳 Penyelamat Abjad Hutan 🌳
          </h2>
          <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-4">
            <div className="bg-white/20 backdrop-blur-sm rounded px-1.5 sm:px-2 md:px-3 py-0.25 sm:py-0.5 md:py-1">
              <p className="text-white text-xs sm:text-xs md:text-sm font-semibold">
                Mode: {gameMode ? MODE_NAMES[gameMode] : "Game"}
              </p>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded px-1.5 sm:px-2 md:px-3 py-0.25 sm:py-0.5 md:py-1">
              <p className="text-white text-xs sm:text-xs md:text-sm font-semibold">
                Lv: {currentLevel + 1}/{ANIMALS.length}
              </p>
            </div>
            {currentAnimal && (
              <div className="bg-white/20 backdrop-blur-sm rounded px-1.5 sm:px-2 md:px-3 py-0.25 sm:py-0.5 md:py-1">
                <p className="text-white text-xs sm:text-xs md:text-sm font-semibold">
                  {currentAnimal.emoji}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Top bar - Controls - Compact for all orientations */}
      <div className="p-1 sm:p-2 md:p-4 flex justify-between items-center z-20 gap-1 sm:gap-2 bg-gradient-to-b from-blue-100 to-white/50 flex-shrink-0" style={{ pointerEvents: 'auto' }}>
        <Button
          onClick={backToModeSelect}
          size="sm"
          className="rounded-full w-6 sm:w-8 md:w-12 h-6 sm:h-8 md:h-12 bg-gray-500 hover:bg-gray-600 text-white shadow-lg flex items-center justify-center flex-shrink-0"
        >
          <ArrowLeft className="w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6" />
        </Button>
        
        <div className="bg-white/90 backdrop-blur-sm rounded px-1.5 sm:px-2 md:px-4 py-0.5 sm:py-1 md:py-2 shadow-lg">
          <div className="flex items-center gap-0.5 sm:gap-1 md:gap-2">
            <Star className="w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6 text-yellow-500 fill-yellow-500" />
            <span className="text-xs sm:text-sm md:text-xl font-bold text-gray-800">{totalStars}</span>
          </div>
        </div>
        
        <div className="flex-1"></div>
        
        <Button
          onClick={toggleMute}
          size="sm"
          className="rounded-full w-6 sm:w-8 md:w-12 h-6 sm:h-8 md:h-12 bg-purple-500 hover:bg-purple-600 text-white shadow-lg flex items-center justify-center flex-shrink-0"
        >
          {isMuted ? <VolumeX className="w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6" /> : <Volume2 className="w-3 sm:w-4 md:w-6 h-3 sm:h-4 md:h-6" />}
        </Button>
      </div>
      
      {/* Mode-specific content - Scrollable overlay */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-3 md:px-4 py-2 sm:py-3 md:py-4" style={{ 
        pointerEvents: isSusunHurf ? 'none' : 'auto',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div className="w-full">
          {gameMode === "tebak_pertama" && <TebakHurufPertama />}
          {gameMode === "huruf_hilang" && <CariHurufHilang />}
          {gameMode === "cocokkan" && <CocokkanGambar />}
          {gameMode === "kuis" && <KuisCepat />}
        </div>
        <div className="h-4"></div>
      </div>
      
      {/* Success overlay - Fixed modal */}
      {phase === "success" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm pointer-events-auto z-50 p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-12 shadow-xl md:shadow-2xl text-center transform animate-bounce w-full max-w-xs sm:max-w-sm my-auto">
            <div className="text-4xl sm:text-6xl md:text-8xl mb-2 md:mb-4">{currentAnimal?.emoji}</div>
            <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-white mb-1 md:mb-3">HEBAT!</h2>
            <p className="text-base sm:text-xl md:text-3xl text-white mb-4 md:mb-6">+100 Poin!</p>
            
            <Button
              onClick={nextLevel}
              size="sm"
              className="text-sm sm:text-base md:text-2xl px-4 sm:px-6 md:px-12 py-2 sm:py-4 md:py-8 rounded-lg md:rounded-2xl bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold shadow-lg active:scale-95 w-full"
            >
              {currentLevel < ANIMALS.length - 1 ? "Hewan Selanjutnya!" : "Selesai!"}
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export function CompleteScreen() {
  const { score, totalStars, resetGame, backToModeSelect } = useForestGame();
  const { playSuccess } = useAudio();

  useEffect(() => {
    playSuccess();
  }, [playSuccess]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-500 overflow-auto p-4 z-50">
      <div className="text-center w-full max-w-md py-6">
        <div className="mb-6 md:mb-8">
          <Award className="w-16 sm:w-20 md:w-32 h-16 sm:h-20 md:h-32 text-white mx-auto mb-2 md:mb-4" />
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg">
            SELAMAT!
          </h1>
          <p className="text-lg sm:text-xl md:text-3xl text-white drop-shadow mb-3 md:mb-4">
            Kamu telah menyelamatkan semua hewan! 🎉
          </p>
        </div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-12 mb-6 md:mb-8 shadow-lg md:shadow-2xl">
          <div className="flex items-center justify-center gap-4 md:gap-8 mb-4 md:mb-6">
            <div className="text-center">
              <Star className="w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 text-yellow-500 fill-yellow-500 mx-auto mb-1 md:mb-2" />
              <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800">{totalStars}</p>
              <p className="text-sm sm:text-base md:text-xl text-gray-600">Bintang</p>
            </div>
            
            <div className="text-center">
              <Award className="w-10 sm:w-12 md:w-16 h-10 sm:h-12 md:h-16 text-purple-500 mx-auto mb-1 md:mb-2" />
              <p className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-800">{score}</p>
              <p className="text-sm sm:text-base md:text-xl text-gray-600">Poin</p>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pointer-events-auto">
          <Button
            onClick={backToModeSelect}
            size="lg"
            className="text-base sm:text-lg md:text-2xl px-6 sm:px-8 md:px-12 py-3 sm:py-5 md:py-8 rounded-xl md:rounded-3xl bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-lg md:shadow-2xl active:scale-95"
          >
            Pilih Mode Lain
          </Button>
          
          <Button
            onClick={resetGame}
            size="lg"
            className="text-base sm:text-lg md:text-2xl px-6 sm:px-8 md:px-12 py-3 sm:py-5 md:py-8 rounded-xl md:rounded-3xl bg-green-500 hover:bg-green-600 text-white font-bold shadow-lg md:shadow-2xl active:scale-95"
          >
            Bermain Lagi
          </Button>
        </div>
      </div>
    </div>
  );
}
