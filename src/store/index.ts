import create from 'zustand'

import { cameraPositions } from './constants'

type StoreType = {
  cameraPosition: number
  setCameraPosition: (cp: number) => void
}

const useStore = create<StoreType>((set) => ({
  cameraPosition: cameraPositions.CLOSE,
  setCameraPosition: (cp: number) => set({ cameraPosition: cp }),
}))

export default useStore
