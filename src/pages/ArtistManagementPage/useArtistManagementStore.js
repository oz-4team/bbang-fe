import { create } from 'zustand'

const useArtistManagementStore = create((set) => ({
    artist: null,
    group: null,
    setArtist: (artist) => set(() => ({ artist })),
    setGroup: (group) => set(() => ({ group })),
    refresh: false,
    setRefresh: (refresh) => set(() => ({ refresh })),
}))

export default useArtistManagementStore