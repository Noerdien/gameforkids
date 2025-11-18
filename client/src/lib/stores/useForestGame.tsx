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

export type GamePhase = "menu" | "playing" | "success" | "levelComplete";

export interface SelectedLetter {
  letter: string;
  blockId: string;
}

interface ForestGameState {
  phase: GamePhase;
  currentLevel: number;
  currentAnimal: Animal | null;
  selectedLetters: SelectedLetter[];
  score: number;
  totalStars: number;
  
  // Actions
  startGame: () => void;
  selectLetter: (letter: string, blockId: string) => void;
  checkWord: () => boolean;
  nextLevel: () => void;
  resetGame: () => void;
  setPhase: (phase: GamePhase) => void;
}

export const useForestGame = create<ForestGameState>()(
  subscribeWithSelector((set, get) => ({
    phase: "menu",
    currentLevel: 0,
    currentAnimal: null,
    selectedLetters: [],
    score: 0,
    totalStars: 0,
    
    startGame: () => {
      const firstAnimal = ANIMALS[0];
      set({
        phase: "playing",
        currentLevel: 0,
        currentAnimal: firstAnimal,
        selectedLetters: [],
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
    
    nextLevel: () => {
      const { currentLevel } = get();
      const nextLevelIndex = currentLevel + 1;
      
      if (nextLevelIndex < ANIMALS.length) {
        set({
          phase: "playing",
          currentLevel: nextLevelIndex,
          currentAnimal: ANIMALS[nextLevelIndex],
          selectedLetters: [],
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
        score: 0,
        totalStars: 0,
      });
    },
    
    setPhase: (phase: GamePhase) => {
      set({ phase });
    },
  }))
);
