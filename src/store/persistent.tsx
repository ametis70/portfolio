import create, { GetState, SetState } from 'zustand'
import { persist, StoreApiWithPersist } from 'zustand/middleware'

type PersistentState = {
  use3D: number
  toggleUse3D: () => void
}

const useStore = create<
  PersistentState,
  SetState<PersistentState>,
  GetState<PersistentState>,
  StoreApiWithPersist<PersistentState>
>(
  persist(
    (set, get) => ({
      use3D: 0,
      toggleUse3D: () => set({ use3D: get().use3D === 0 ? 1 : 0 }),
    }),
    { name: 'persistent-store' },
  ),
)

export default useStore
