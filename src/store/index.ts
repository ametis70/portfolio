import create from 'zustand'

import { displayStatus, displayContentTypes } from './constants'

type StoreType = {
  isHome?: boolean
  setHome: (value: boolean) => void
  cameraPosition?: number
  setCameraPosition: (cp: number) => void
  displayContent?: DisplayContent
  setDisplayContent: (status: number, contentType?: number, data?: string) => void
  displayCanvas?: HTMLCanvasElement
  setDisplayCanvas?: (el: HTMLCanvasElement | undefined) => void
}

const useStore = create<StoreType>((set) => ({
  isHome: undefined,
  cameraPosition: undefined,
  displayContent: { status: displayStatus.OFF, contentType: displayContentTypes.BLANK },
  setHome: (value) => set({ isHome: value }),
  setDisplayContent: (status, contentType, data) =>
    set({ displayContent: { status, contentType, data } }),
  setCameraPosition: (cp: number) => set({ cameraPosition: cp }),
  setDisplayCanvas: (el) => set({ displayCanvas: el }),
}))

export default useStore
