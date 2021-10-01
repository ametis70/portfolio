import create from 'zustand'

type StoreType = {
  isHome?: boolean
  cameraPosition?: number
  displayContent?: number
  setHome: (value: boolean) => void
  setDisplayContent: (dp: number) => void
  setCameraPosition: (cp: number) => void
}

const useStore = create<StoreType>((set) => ({
  isHome: undefined,
  cameraPosition: undefined,
  displayContent: undefined,
  setHome: (value) => set({ isHome: value }),
  setDisplayContent: (dp: number) => set({ displayContent: dp }),
  setCameraPosition: (cp: number) => set({ cameraPosition: cp }),
}))

export default useStore
