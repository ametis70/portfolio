import create from 'zustand'

import { cameraPositions } from './constants'

const useStore = create((set) => ({
  cameraPosition: cameraPositions.CLOSE,
  setCameraPosition: (cp: number) => set({ cameraPosition: cp }),
}))

export default useStore
