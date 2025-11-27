import { useForestGame } from "@/lib/stores/useForestGame";
import { Button } from "./ui/button";

export function GameHeaderScreen() {
  const { goToModeSelect } = useForestGame();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-green-300 via-blue-400 to-purple-500 p-4 overflow-auto">
      <div className="text-center w-full max-w-2xl py-8">
        {/* Big Title */}
        <div className="mb-8 md:mb-12">
          <div className="text-6xl sm:text-7xl md:text-8xl mb-4 animate-bounce">
            🌳
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            Penyelamat Abjad Hutan
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-white drop-shadow">
            Game Edukasi Anak Indonesia
          </p>
        </div>

        {/* Description */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl mb-8 md:mb-12">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-800 mb-4 font-semibold">
            🎮 Selamat datang!
          </p>
          <div className="space-y-3 text-left text-base sm:text-lg md:text-xl text-gray-700">
            <p>✨ Bantu hewan-hewan lucu menemukan jalan pulang!</p>
            <p>🔤 Belajar membaca dan menulis huruf Indonesia</p>
            <p>🌟 Kumpulkan bintang dengan menyelesaikan setiap level</p>
            <p>🎯 Pilih dari 5 mode permainan yang berbeda</p>
          </div>
        </div>

        {/* Animals preview */}
        <div className="mb-8 md:mb-12">
          <p className="text-white text-lg sm:text-xl md:text-2xl font-bold mb-4 drop-shadow">
            Hewan-hewan yang ingin kamu selamatkan:
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
            <div className="text-4xl sm:text-5xl md:text-6xl">🐱</div>
            <div className="text-4xl sm:text-5xl md:text-6xl">🐰</div>
            <div className="text-4xl sm:text-5xl md:text-6xl">🦆</div>
            <div className="text-4xl sm:text-5xl md:text-6xl">🐔</div>
            <div className="text-4xl sm:text-5xl md:text-6xl">🐟</div>
          </div>
        </div>

        {/* Start button */}
        <Button
          onClick={goToModeSelect}
          size="lg"
          className="text-xl sm:text-3xl md:text-4xl px-8 sm:px-16 md:px-20 py-4 sm:py-8 md:py-12 rounded-2xl md:rounded-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold shadow-2xl transform hover:scale-110 transition-transform active:scale-95 w-full sm:w-auto min-h-14 sm:min-h-16 md:min-h-20"
          style={{ touchAction: 'manipulation' }}
        >
          🚀 Mulai Petualangan!
        </Button>

        {/* Footer */}
        <div className="mt-8 md:mt-12 text-white text-sm sm:text-base md:text-lg">
          <p>Setiap level = 1 hewan diselamatkan</p>
          <p className="mt-2">Belajar sambil bermain! 🎨</p>
        </div>
      </div>
    </div>
  );
}
