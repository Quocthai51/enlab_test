import { create } from "zustand";

const useGameStore = create((set) => ({
  gameStarted: false,

  setGameStarted: (gameStarted: boolean) => set({ gameStarted }),

  score: 0,

  setScore: (score: number) => set({ score }),

  isTimerRunning: true,

  setIsTimerRunning: (isTimerRunning: boolean) => set({ isTimerRunning }),

  globeTime: { minutes: 0, seconds: 0 },

  setGlobeTime: (globeTime: { minutes: number, seconds: number }) => set({ globeTime }),

  isEndGame: false,

  setIsEndGame: (isEndGame: boolean) => set({ isEndGame }),


}));

export default useGameStore;
