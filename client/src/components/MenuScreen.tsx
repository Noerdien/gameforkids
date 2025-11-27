import { useForestGame, ANIMALS } from "@/lib/stores/useForestGame";
import { Button } from "./ui/button";

const MODE_NAMES: Record<string, string> = {
  susun_huruf: "Susun Huruf",
  tebak_pertama: "Tebak Huruf Pertama",
  cocokkan: "Cocokkan Gambar",
  huruf_hilang: "Cari Huruf Hilang",
  kuis: "Kuis Cepat",
};

export function MenuScreen() {
  const { gameMode, startGame, backToModeSelect } = useForestGame();
  const modeName = gameMode ? MODE_NAMES[gameMode] : "Game";
  const canStart = gameMode !== null;
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-green-300 via-blue-400 to-purple-500 overflow-auto p-4 z-50">
      <div className="text-center w-full max-w-2xl py-6">
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-2 sm:mb-4 drop-shadow-lg">
            {modeName}
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl text-white drop-shadow">
            Bantu hewan-hewan lucu menemukan jalan pulang!
          </p>
        </div>
        
        <div className="mb-8 md:mb-12 flex justify-center gap-2 sm:gap-3 md:gap-4 text-3xl sm:text-5xl md:text-6xl flex-wrap">
          {ANIMALS.map((animal, idx) => (
            <div key={animal.id} className="animate-bounce" style={{ animationDelay: `${idx * 0.1}s` }}>
              {animal.emoji}
            </div>
          ))}
        </div>
        
        {!canStart && (
          <div className="mb-4 md:mb-6 bg-red-500/80 text-white px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl text-sm sm:text-base md:text-xl font-bold">
            Silakan pilih mode permainan terlebih dahulu!
          </div>
        )}
        
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pointer-events-auto">
          <Button
            onClick={backToModeSelect}
            size="lg"
            className="text-lg sm:text-xl md:text-2xl px-6 sm:px-8 md:px-12 py-4 sm:py-6 md:py-8 rounded-2xl md:rounded-3xl bg-gray-400 hover:bg-gray-500 text-white font-bold shadow-lg md:shadow-2xl active:scale-95"
          >
            Kembali
          </Button>
          
          <Button
            onClick={startGame}
            disabled={!canStart}
            size="lg"
            className={`text-lg sm:text-2xl md:text-3xl px-8 sm:px-12 md:px-16 py-4 sm:py-6 md:py-10 rounded-2xl md:rounded-3xl font-bold shadow-lg md:shadow-2xl transform transition-transform active:scale-95 ${
              canStart
                ? "bg-yellow-400 hover:bg-yellow-500 text-gray-800 hover:scale-110"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            Mulai Bermain!
          </Button>
        </div>
        
        <div className="mt-8 md:mt-12 text-white text-sm sm:text-base md:text-xl">
          <p>⭐ Kumpulkan bintang sebanyak-banyaknya!</p>
        </div>
      </div>
    </div>
  );
}
