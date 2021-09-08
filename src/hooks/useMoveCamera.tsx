import { useEffect } from 'react'
import useStore from '../store'
import { cameraPositions } from '../store/constants'

const useMoveCamera = (cp: number) => {
  const setCameraPosition = useStore((state) => state.setCameraPosition)

  useEffect(() => {
    setCameraPosition(cp)
  }, [])

  return null
}

export { cameraPositions }
export default useMoveCamera
