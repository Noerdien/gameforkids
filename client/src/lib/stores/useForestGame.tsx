import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export interface Animal {
  id: string;
  name: string;
  color: string;
  emoji: string;
}

export const ANIMALS: Animal[] = [
  { id: "kucing", name: "KUCING", color: "#FF6B6B", emoji: "🐱" },
  { id: "kelinci", name: "KELINCI", color: "#4ECDC4", emoji: "🐰" },
  { id: "bebek", name: "BEBEK", color: "#FFE66D", emoji: "🦆" },
  { id: "ayam", name: "AYAM", color: "#FF8C42", emoji: "🐔" },
  { id: "ikan", name: "IKAN", color: "#95E1D3", emoji: "🐟" },
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
