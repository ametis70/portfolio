import create from 'zustand'

type StoreType = {
  isHome: boolean | null
  cameraPosition: number | null
  displayContent: number | null
  setHome: (value: boolean) => void
  setDisplayContent: (dp: number) => void
  setCameraPosition: (cp: number) => void
}

const useStore = create<StoreType>((set) => ({
  isHome: null,
  cameraPosition: null,
  displayContent: null,
  setHome: (value) => set({ isHome: value }),
  setDisplayContent: (dp: number) => set({ displayContent: dp }),
  setCameraPosition: (cp: number) => set({ cameraPosition: cp }),
}))

export default useStore
