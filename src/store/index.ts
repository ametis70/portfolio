import create, { GetState, SetState } from 'zustand'
import {
  StoreApiWithSubscribeWithSelector,
  subscribeWithSelector,
} from 'zustand/middleware'

import { displayStatus, displayContentTypes } from './constants'

type StoreType = {
  isHome?: boolean
  cameraPosition?: number
  displayContent?: DisplayContent
  displayCanvas?: HTMLCanvasElement
  workGradient?: string
  setDisplayCanvas: (el: HTMLCanvasElement) => void
  setHome: (value: boolean) => void
  setDisplayContent: (dp: { status: number; contentType?: number; data?: string }) => void
  setCameraPosition: (cp: number) => void
  setWorkGradient: (value?: string) => void
}

const useStore = create(
  subscribeWithSelector<
    StoreType,
    SetState<StoreType>,
    GetState<StoreType>,
    StoreApiWithSubscribeWithSelector<StoreType>
  >((set, _) => ({
    displayContent: {
      status: displayStatus.OFF,
      contentType: displayContentTypes.BLANK,
    },
    setHome: (value) => {
      set({ isHome: value })
    },
    setDisplayContent: (dp) => {
      set({ displayContent: dp })
    },
    setCameraPosition: (cp) => {
      set({ cameraPosition: cp })
    },
    setDisplayCanvas: (el) => {
      set({ displayCanvas: el })
    },
    setWorkGradient: (value) => {
      set({ workGradient: value })
    },
  })),
)

export default useStore
