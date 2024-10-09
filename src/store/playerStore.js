import { create } from 'zustand'
export const usePlayerStore = create((set) => ({
    IsPlaying: false,
    currentMusic: {playlist:null, song: null, songs: []},
    volume : 1,
    setVolume : (volume) => set({volume}),
    setIsPlaying : (IsPlaying) => set({IsPlaying}),
    setCurrentMusic : (currentMusic) => set({currentMusic}),
}))
