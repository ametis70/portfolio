import { useEffect } from 'react'
import useStore from '../store'
import { displayContents } from '../store/constants'

const useDisplay = (dc: number) => {
  const setDisplayContent = useStore((state) => state.setDisplayContent)

  useEffect(() => {
    setDisplayContent(dc)
  }, [])

  return null
}

export { displayContents }
export default useDisplay
