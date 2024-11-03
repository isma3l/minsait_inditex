import { create } from 'zustand';
import { createSelectors } from './createSelectors';

interface PodcastState {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

const usePodcastStoreBase = create<PodcastState>()((set) => ({
  isLoading: false,
  setIsLoading: (value: boolean) => set({ isLoading: value }),
}));

export const usePodcastStore = createSelectors(usePodcastStoreBase);
