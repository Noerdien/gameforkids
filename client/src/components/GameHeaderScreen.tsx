import { useForestGame } from "@/lib/stores/useForestGame";
import { Button } from "./ui/button";
import { Moon, Sun } from "lucide-react";

export function GameHeaderScreen() {
  const { goToModeSelect, isDarkMode, toggleDarkMode } = useForestGame();

  return (
    <div className={`fixed inset-0 flex flex-col items-center justify-center p-4 overflow-auto transition-all duration-300 ${isDarkMode ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900' : 'bg-gradient-to-br from-green-300 via-blue-400 to-purple-500'}`}>
      {/* Dark Mode Toggle Button - Top Right */}
      <div className="absolute top-4 right-4 z-40">
        <Button
          onClick={toggleDarkMode}
          size="sm"
          className={`rounded-full min-w-10 min-h-10 text-white shadow-lg flex items-center justify-center transition-all duration-300 active:scale-90 ${isDarkMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-orange-500 hover:bg-orange-600'}`}
          style={{ touchAction: 'manipulation' }}
        >
          {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
      </div>

      <div className="text-center w-full max-w-2xl py-8">
        {/* Game For Kids Logo */}
        <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
          <div className={`rounded-3xl px-6 sm:px-10 md:px-14 py-4 sm:py-6 md:py-8 shadow-2xl border-4 sm:border-6 md:border-8 transition-all duration-300 ${isDarkMode ? 'bg-cyan-600 border-cyan-300' : 'bg-yellow-300 border-yellow-500'}`}>
            <span className={`inline-block text-2xl sm:text-4xl md:text-5xl font-black transition-all duration-300 whitespace-nowrap ${isDarkMode ? 'text-white drop-shadow-lg' : 'text-white drop-shadow-lg'}`}>
              🎮 GAME FOR KIDS 🎮
            </span>
          </div>
        </div>

        {/* Big Title */}
        <div className="mb-8 md:mb-12">
          <div className="text-6xl sm:text-7xl md:text-8xl mb-4 animate-bounce">
            🌳
          </div>
          <h1 className={`text-4xl sm:text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg transition-colors duration-300 ${isDarkMode ? 'text-cyan-100' : 'text-white'}`}>
            Penyelamat Abjad Hutan
          </h1>
          <p className={`text-xl sm:text-2xl md:text-3xl drop-shadow transition-colors duration-300 ${isDarkMode ? 'text-cyan-100' : 'text-white'}`}>
            Game Edukasi Anak Indonesia
          </p>
        </div>

        {/* Description */}
        <div className={`backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-2xl mb-8 md:mb-12 transition-all duration-300 ${isDarkMode ? 'bg-slate-700/90' : 'bg-white/90'}`}>
          <p className={`text-lg sm:text-xl md:text-2xl mb-4 font-semibold transition-colors duration-300 ${isDarkMode ? 'text-cyan-100' : 'text-gray-800'}`}>
            🎮 Selamat datang!
          </p>
          <div className={`space-y-3 text-left text-base sm:text-lg md:text-xl transition-colors duration-300 ${isDarkMode ? 'text-cyan-50' : 'text-gray-700'}`}>
            <p>✨ Bantu hewan-hewan lucu menemukan jalan pulang!</p>
            <p>🔤 Belajar membaca dan menulis huruf Indonesia</p>
            <p>🌟 Kumpulkan bintang dengan menyelesaikan setiap level</p>
            <p>🎯 Pilih dari 5 mode permainan yang berbeda</p>
          </div>
        </div>

        {/* Animals preview */}
        <div className="mb-8 md:mb-12">
          <p className={`text-lg sm:text-xl md:text-2xl font-bold mb-4 drop-shadow transition-colors duration-300 ${isDarkMode ? 'text-cyan-100' : 'text-white'}`}>
            Hewan-hewan yang ingin kamu selamatkan:
          </p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4">
            <div className="text-3xl sm:text-4xl md:text-5xl">🐱</div>
            <div className="text-3xl sm:text-4xl md:text-5xl">🐶</div>
            <div className="text-3xl sm:text-4xl md:text-5xl">🦁</div>
            <div className="text-3xl sm:text-4xl md:text-5xl">🐘</div>
            <div className="text-3xl sm:text-4xl md:text-5xl">🐯</div>
            <div className="text-3xl sm:text-4xl md:text-5xl">🦌</div>
            <div className="text-3xl sm:text-4xl md:text-5xl">🐵</div>
            <div className="text-3xl sm:text-4xl md:text-5xl">🦅</div>
            <div className="text-3xl sm:text-4xl md:text-5xl">🐢</div>
            <div className="text-3xl sm:text-4xl md:text-5xl">🐋</div>
            <div className="text-3xl sm:text-4xl md:text-5xl">🌳</div>
            <div className="text-3xl sm:text-4xl md:text-5xl">🌸</div>
            <div className="text-3xl sm:text-4xl md:text-5xl">🌵</div>
            <div className="text-3xl sm:text-4xl md:text-5xl">🦐</div>
            <div className="text-3xl sm:text-4xl md:text-5xl">🐧</div>
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
        <div className={`mt-8 md:mt-12 text-sm sm:text-base md:text-lg transition-colors duration-300 ${isDarkMode ? 'text-cyan-100' : 'text-white'}`}>
          <p>Setiap level = 1 hewan diselamatkan</p>
          <p className="mt-2">Belajar sambil bermain! 🎨</p>
        </div>
      </div>
    </div>
  );
}
