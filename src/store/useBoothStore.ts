import { create } from 'zustand';

export type FrameLayout = '1-grid' | '2-grid' | '2-strip' | '3-strip' | '4-strip' | '4-grid' | '6-grid' | '9-grid';

interface BoothState {
  currentStep: number;
  timer: number;
  layoutType: FrameLayout | null;
  selectedFilter: string;
  capturedPhotos: string[];
  capturedBursts: string[][];
  backgroundColor: string;
  finalPhotoUrl: string | null;
  finalGifUrl: string | null;
  finalRawGifUrl: string | null;
  retakeIndex: number | null;
  isMirrored: boolean;

  setStep: (step: number) => void;
  setTimer: (seconds: number) => void;
  setLayoutType: (type: FrameLayout) => void;
  setFilter: (filter: string) => void;
  addCapturedPhoto: (photoUrl: string) => void;
  addCapturedBurst: (burst: string[]) => void;
  updateCapturedPhoto: (index: number, photoUrl: string) => void;
  updateCapturedBurst: (index: number, burst: string[]) => void;
  setRetakeIndex: (index: number | null) => void;
  clearPhotos: () => void;
  setBackgroundColor: (color: string) => void;
  setFinalResult: (photo: string, gif: string, rawGif: string) => void;
  toggleMirror: () => void;
}

export const useBoothStore = create<BoothState>()((set) => ({
  currentStep: 0,
  timer: 3,
  layoutType: null,
  selectedFilter: 'none',
  capturedPhotos: [],
  capturedBursts: [],
  backgroundColor: '#ffffff',
  finalPhotoUrl: null,
  finalGifUrl: null,
  finalRawGifUrl: null,
  retakeIndex: null,
  isMirrored: true,
  
  setStep: (step) => set({ currentStep: step }),
  setTimer: (seconds) => set({ timer: seconds }),
  setLayoutType: (type) => set({ layoutType: type }),
  setFilter: (filter) => set({ selectedFilter: filter }),
  addCapturedPhoto: (photoUrl) => set((state) => ({ capturedPhotos: [...state.capturedPhotos, photoUrl] })),
  addCapturedBurst: (burst) => set((state) => ({ capturedBursts: [...state.capturedBursts, burst] })),
  updateCapturedPhoto: (index, photoUrl) => set((state) => {
    const newPhotos = [...state.capturedPhotos];
    newPhotos[index] = photoUrl;
    return { capturedPhotos: newPhotos };
  }),
  updateCapturedBurst: (index, burst) => set((state) => {
    const newBursts = [...state.capturedBursts];
    newBursts[index] = burst;
    return { capturedBursts: newBursts };
  }),
  setRetakeIndex: (index) => set({ retakeIndex: index }),
  clearPhotos: () => set({ capturedPhotos: [], capturedBursts: [], retakeIndex: null }),
  setBackgroundColor: (color) => set({ backgroundColor: color }),
  setFinalResult: (photo, gif, rawGif) => set({ finalPhotoUrl: photo, finalGifUrl: gif, finalRawGifUrl: rawGif }),
  toggleMirror: () => set((state) => ({ isMirrored: !state.isMirrored }))
}));