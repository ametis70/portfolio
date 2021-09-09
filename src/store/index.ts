import create from 'zustand'

type StoreType = {
  cameraPosition: number
  displayContent: number
  setDisplayContent: (dp: number) => void
  setCameraPosition: (cp: number) => void
}

const useStore = create<StoreType>((set) => ({
  cameraPosition: -1,
  displayContent: -1,
  setDisplayContent: (dp: number) => set({ displayContent: dp }),
  setCameraPosition: (cp: number) => set({ cameraPosition: cp }),
}))

export default useStore
