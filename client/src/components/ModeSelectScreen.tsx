import { useForestGame, type GameMode } from "@/lib/stores/useForestGame";
import { Button } from "./ui/button";
import { Sparkles, Mouse, Link, HelpCircle, Puzzle } from "lucide-react";

export function ModeSelectScreen() {
  const selectMode = useForestGame((state) => state.selectMode);
  
  const modes = [
    {
      id: "susun_huruf" as GameMode,
      title: "Susun Huruf",
      description: "Susun huruf untuk mengeja nama hewan",
      icon: Puzzle,
      color: "from-blue-400 to-blue-600",
      emoji: "🔤",
    },
    {
      id: "tebak_pertama" as GameMode,
      title: "Tebak Huruf Pertama",
      description: "Pilih huruf pertama dari nama hewan",
      icon: Sparkles,
      color: "from-green-400 to-green-600",
      emoji: "🎯",
    },
    {
      id: "cocokkan" as GameMode,
      title: "Cocokkan Gambar",
      description: "Hubungkan hewan dengan nama yang benar",
      icon: Link,
      color: "from-purple-400 to-purple-600",
      emoji: "🔗",
    },
    {
      id: "huruf_hilang" as GameMode,
      title: "Cari Huruf Hilang",
      description: "Isi huruf yang kosong di nama hewan",
      icon: HelpCircle,
      color: "from-orange-400 to-orange-600",
      emoji: "❓",
    },
    {
      id: "kuis" as GameMode,
      title: "Kuis Cepat",
      description: "Tebak hewan dari petunjuk",
      icon: Mouse,
      color: "from-pink-400 to-pink-600",
      emoji: "🧠",
    },
  ];
  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-green-300 via-blue-400 to-purple-500">
      <div className="text-center px-4 max-w-6xl">
        <div className="mb-12">
          <h1 className="text-7xl font-bold text-white mb-4 drop-shadow-lg">
            🌳 Penyelamat Abjad Hutan 🌳
          </h1>
          <p className="text-3xl text-white drop-shadow">
            Pilih mode permainan!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {modes.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => selectMode(mode.id)}
                className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl hover:scale-105 transition-transform cursor-pointer"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${mode.color} opacity-0 group-hover:opacity-20 rounded-3xl transition-opacity`}></div>
                
                <div className="text-7xl mb-4">{mode.emoji}</div>
                
                <h3 className="text-3xl font-bold text-gray-800 mb-3">
                  {mode.title}
                </h3>
                
                <p className="text-lg text-gray-600">
                  {mode.description}
                </p>
                
                <div className="mt-6">
                  <div className={`inline-block bg-gradient-to-r ${mode.color} text-white px-6 py-3 rounded-full font-bold text-lg`}>
                    Mainkan!
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="text-white text-xl">
          <p>⭐ Kumpulkan bintang sebanyak-banyaknya!</p>
        </div>
      </div>
    </div>
  );
}
