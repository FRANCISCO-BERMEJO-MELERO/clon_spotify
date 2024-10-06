import { create } from 'zustand'
export const usePlayerStore = create((set) => ({
    IsPlaying: false,
    currentMusic: {playlist:null, song: null, songs: []},
    setIsPlaying : (IsPlaying) => set({IsPlaying}),
    setCurrentMusic : (currentMusic) => set({currentMusic}),
}))
