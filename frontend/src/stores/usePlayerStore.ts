import { create } from "zustand";
import { Song } from "@/types";

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;

  initializeQueue: (songs: Song[]) => void;
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,

  initializeQueue: (songs: Song[]) => {
    set({
      queue: songs,
      currentSong: get().currentIndex === -1 ? songs[0] : get().currentSong,
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    });
  },

  playAlbum: (songs: Song[], startIndex = 0) => {
    if (songs.length === 0) return;
    set({
      queue: songs,
      currentSong: songs[startIndex],
      currentIndex: startIndex,
      isPlaying: true,
    });
  },

  setCurrentSong: (song: Song | null) => {
    if (!song) return;
    const state = get();
    let newQueue = [...state.queue];
    let songIndex = state.queue.findIndex((s) => s._id === song._id);

    if (songIndex === -1) {
      newQueue.push(song);
      songIndex = newQueue.length - 1;
    }

    set({
      queue: newQueue,
      currentSong: song,
      isPlaying: true,
      currentIndex: songIndex,
    });
  },

  togglePlay: () => {
    set((state) => ({ isPlaying: !state.isPlaying }));
  },

  playNext: () => {
    const { currentIndex, queue } = get();
    const nextIndex = (currentIndex + 1) % queue.length; // Loop back to first song

    set({
      currentSong: queue[nextIndex],
      currentIndex: nextIndex,
      isPlaying: true,
    });
  },

  playPrevious: () => {
    const { currentIndex, queue } = get();
    const prevIndex = (currentIndex - 1 + queue.length) % queue.length; // Loop back to last song

    set({
      currentSong: queue[prevIndex],
      currentIndex: prevIndex,
      isPlaying: true,
    });
  },
}));
