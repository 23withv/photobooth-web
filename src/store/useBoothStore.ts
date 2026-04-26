import { create } from 'zustand';

export type FrameLayout = '2-grid' | '3-strip' | '4-strip' | '4-grid' | '9-grid';

interface BoothState {
  currentStep: number;
  timer: number;
  layoutType: FrameLayout | null;
  customText: string;
  selectedFilter: string;
  capturedPhotos: string[];
  backgroundColor: string;

  setStep: (step: number) => void;
  setTimer: (seconds: number) => void;
  setLayoutType: (type: FrameLayout) => void;
  setCustomText: (text: string) => void;
  setFilter: (filter: string) => void;
  addCapturedPhoto: (photoUrl: string) => void;
  clearPhotos: () => void;
  setBackgroundColor: (color: string) => void;
}

export const useBoothStore = create<BoothState>()((set) => ({
  currentStep: 0,
  timer: 3,
  layoutType: null,
  customText: '',
  selectedFilter: 'none',
  capturedPhotos: [],
  backgroundColor: '#ffffff',
  
  setStep: (step) => set({ currentStep: step }),
  setTimer: (seconds) => set({ timer: seconds }),
  setLayoutType: (type) => set({ layoutType: type }),
  setCustomText: (text) => set({ customText: text }),
  setFilter: (filter) => set({ selectedFilter: filter }),
  addCapturedPhoto: (photoUrl) => set((state) => ({ 
    capturedPhotos: [...state.capturedPhotos, photoUrl] 
  })),
  clearPhotos: () => set({ capturedPhotos: [] }),
  setBackgroundColor: (color) => set({ backgroundColor: color }),
}));