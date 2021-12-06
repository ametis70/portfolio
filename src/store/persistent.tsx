import create, { GetState, SetState } from 'zustand'
import { persist, StoreApiWithPersist } from 'zustand/middleware'

type PersistentState = {
  use3D: boolean
  toggleUse3D: () => void
}

const useStore = create(
  persist<
    PersistentState,
    SetState<PersistentState>,
    GetState<PersistentState>,
    StoreApiWithPersist<PersistentState>
  >(
    (set, get) => ({
      use3D: false,
      toggleUse3D: process.env.GATSBY_DISABLE_3D
        ? () => set({ use3D: false })
        : () => set({ use3D: !get().use3D }),
    }),
    { name: 'persistent-store' },
  ),
)

export default useStore
