import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface Animal {
  id: string;
  name: string;
  color: string;
  emoji: string;
  isPlant?: boolean;
}

export const ANIMALS: Animal[] = [
  // Hewan Domestik
  { id: "kucing", name: "KUCING", color: "#FF6B6B", emoji: "🐱" },
  { id: "kelinci", name: "KELINCI", color: "#4ECDC4", emoji: "🐰" },
  { id: "bebek", name: "BEBEK", color: "#FFE66D", emoji: "🦆" },
  { id: "ayam", name: "AYAM", color: "#FF8C42", emoji: "🐔" },
  { id: "ikan", name: "IKAN", color: "#95E1D3", emoji: "🐟" },
  { id: "anjing", name: "ANJING", color: "#8B6F47", emoji: "🐶" },
  { id: "sapi", name: "SAPI", color: "#9B59B6", emoji: "🐄" },
  
  // Hewan Buas
  { id: "singa", name: "SINGA", color: "#F1C40F", emoji: "🦁" },
  { id: "harimau", name: "HARIMAU", color: "#E74C3C", emoji: "🐯" },
  { id: "gajah", name: "GAJAH", color: "#7F8C8D", emoji: "🐘" },
  { id: "beruang", name: "BERUANG", color: "#8B4513", emoji: "🐻" },
  
  // Hewan Lain
  { id: "monyet", name: "MONYET", color: "#D2691E", emoji: "🐵" },
  { id: "kuda", name: "KUDA", color: "#A0522D", emoji: "🐴" },
  { id: "rusa", name: "RUSA", color: "#8B4513", emoji: "🦌" },
  { id: "domba", name: "DOMBA", color: "#F5F5DC", emoji: "🐑" },
  { id: "kambing", name: "KAMBING", color: "#D3D3D3", emoji: "🐐" },
  
  // Burung
  { id: "burung", name: "BURUNG", color: "#E74C3C", emoji: "🐦" },
  { id: "elang", name: "ELANG", color: "#8B4513", emoji: "🦅" },
  { id: "penguin", name: "PENGUIN", color: "#000000", emoji: "🐧" },
  
  // Serangga & Reptil
  { id: "capung", name: "CAPUNG", color: "#00CED1", emoji: "🦗" },
  { id: "ular", name: "ULAR", color: "#228B22", emoji: "🐍" },
  { id: "buaya", name: "BUAYA", color: "#006400", emoji: "🐊" },
  { id: "kadal", name: "KADAL", color: "#8FBC8F", emoji: "🦎" },
  
  // Laut
  { id: "paus", name: "PAUS", color: "#4682B4", emoji: "🐋" },
  { id: "lumba", name: "LUMBA-LUMBA", color: "#1E90FF", emoji: "🐬" },
  { id: "penyu", name: "PENYU", color: "#DAA520", emoji: "🐢" },
  { id: "kepiting", name: "KEPITING", color: "#FF4500", emoji: "🦀" },
  
  // Tumbuhan
  { id: "pohon", name: "POHON", color: "#228B22", emoji: "🌳", isPlant: true },
  { id: "bunga", name: "BUNGA", color: "#FF69B4", emoji: "🌸", isPlant: true },
  { id: "rumput", name: "RUMPUT", color: "#90EE90", emoji: "🌱", isPlant: true },
  { id: "kaktus", name: "KAKTUS", color: "#7CB342", emoji: "🌵", isPlant: true },
  { id: "kelapa", name: "KELAPA", color: "#DAA520", emoji: "🥥", isPlant: true },
  { id: "bunga_matahari", name: "BUNGA MATAHARI", color: "#FFD700", emoji: "🌻", isPlant: true },
  { id: "bunga_ros", name: "BUNGA ROS", color: "#DC143C", emoji: "🌹", isPlant: true },
  { id: "pohon_palm", name: "POHON PALEM", color: "#228B22", emoji: "🌴", isPlant: true },
  { id: "jamur", name: "JAMUR", color: "#8B4513", emoji: "🍄", isPlant: true },
  { id: "daun", name: "DAUN", color: "#228B22", emoji: "🍃", isPlant: true },
  { id: "padi", name: "PADI", color: "#DAA520", emoji: "🌾", isPlant: true },
  { id: "bayam", name: "BAYAM", color: "#228B22", emoji: "🥬", isPlant: true },
  { id: "cabai", name: "CABAI", color: "#FF0000", emoji: "🌶️", isPlant: true },
  { id: "jagung", name: "JAGUNG", color: "#FFD700", emoji: "🌽", isPlant: true },
  { id: "nanas", name: "NANAS", color: "#FFD700", emoji: "🍍", isPlant: true },
];

export type GameMode = "susun_huruf" | "tebak_pertama" | "cocokkan" | "huruf_hilang" | "kuis";
export type GamePhase = "header" | "mode_select" | "menu" | "playing" | "success" | "levelComplete";

export interface SelectedLetter {
  letter: string;
  blockId: string;
}

interface ForestGameState {
  gameMode: GameMode | null;
  phase: GamePhase;
  currentLevel: number;
  currentAnimal: Animal | null;
  selectedLetters: SelectedLetter[];
  selectedAnswer: string | null;
  score: number;
  totalStars: number;
  isDarkMode: boolean;
  
  // Actions
  goToModeSelect: () => void;
  selectMode: (mode: GameMode) => void;
  startGame: () => void;
  selectLetter: (letter: string, blockId: string) => void;
  selectAnswer: (answer: string) => void;
  checkWord: () => boolean;
  checkAnswer: (correctAnswer: string) => boolean;
  nextLevel: () => void;
  resetGame: () => void;
  backToModeSelect: () => void;
  setPhase: (phase: GamePhase) => void;
  toggleDarkMode: () => void;
}

export const useForestGame = create<ForestGameState>()(
  subscribeWithSelector((set, get) => ({
    gameMode: null,
    phase: "header",
    currentLevel: 0,
    currentAnimal: null,
    selectedLetters: [],
    selectedAnswer: null,
    score: 0,
    totalStars: 0,
    isDarkMode: false,
    
    goToModeSelect: () => {
      set({
        phase: "mode_select",
        gameMode: null,
      });
    },
    
    selectMode: (mode: GameMode) => {
      set({
        gameMode: mode,
        phase: "menu",
        currentLevel: 0,
        score: 0,
      });
      console.log("Mode selected:", mode);
    },
    
    startGame: () => {
      const firstAnimal = ANIMALS[0];
      set({
        phase: "playing",
        currentLevel: 0,
        currentAnimal: firstAnimal,
        selectedLetters: [],
        selectedAnswer: null,
        score: 0,
      });
      console.log("Game started with animal:", firstAnimal.name);
    },
    
    selectLetter: (letter: string, blockId: string) => {
      const { selectedLetters, currentAnimal } = get();
      if (!currentAnimal) return;
      
      const newLetters = [...selectedLetters, { letter, blockId }];
      const word = newLetters.map(l => l.letter).join("");
      console.log("Selected letters:", word);
      set({ selectedLetters: newLetters });
      
      // Auto-check if word is complete
      if (newLetters.length === currentAnimal.name.length) {
        setTimeout(() => {
          get().checkWord();
        }, 300);
      }
    },
    
    selectAnswer: (answer: string) => {
      set({ selectedAnswer: answer });
      console.log("Answer selected:", answer);
    },
    
    checkWord: () => {
      const { selectedLetters, currentAnimal, score } = get();
      if (!currentAnimal) return false;
      
      const word = selectedLetters.map(l => l.letter).join("");
      const isCorrect = word === currentAnimal.name;
      
      console.log("Checking word:", word, "vs", currentAnimal.name, "=", isCorrect);
      
      if (isCorrect) {
        set({
          phase: "success",
          score: score + 100,
          totalStars: get().totalStars + 1,
        });
        return true;
      } else {
        // Reset if wrong
        set({ selectedLetters: [] });
        return false;
      }
    },
    
    checkAnswer: (correctAnswer: string) => {
      const { selectedAnswer, score } = get();
      const isCorrect = selectedAnswer === correctAnswer;
      
      console.log("Checking answer:", selectedAnswer, "vs", correctAnswer, "=", isCorrect);
      
      if (isCorrect) {
        set({
          phase: "success",
          score: score + 100,
          totalStars: get().totalStars + 1,
          selectedAnswer: null,
        });
        return true;
      } else {
        set({ selectedAnswer: null });
        return false;
      }
    },
    
    nextLevel: () => {
      const { currentLevel } = get();
      const nextLevelIndex = currentLevel + 1;
      
      if (nextLevelIndex < ANIMALS.length) {
        set({
          phase: "playing",
          currentLevel: nextLevelIndex,
          currentAnimal: ANIMALS[nextLevelIndex],
          selectedLetters: [],
          selectedAnswer: null,
        });
        console.log("Next level:", ANIMALS[nextLevelIndex].name);
      } else {
        set({
          phase: "levelComplete",
        });
        console.log("All levels completed!");
      }
    },
    
    resetGame: () => {
      set({
        phase: "menu",
        currentLevel: 0,
        currentAnimal: null,
        selectedLetters: [],
        selectedAnswer: null,
        score: 0,
      });
    },
    
    backToModeSelect: () => {
      set({
        gameMode: null,
        phase: "mode_select",
        currentLevel: 0,
        currentAnimal: null,
        selectedLetters: [],
        selectedAnswer: null,
        score: 0,
        totalStars: 0,
      });
    },
    
    setPhase: (phase: GamePhase) => {
      set({ phase });
    },
    
    toggleDarkMode: () => {
      const { isDarkMode } = get();
      set({ isDarkMode: !isDarkMode });
    },
  }))
);
