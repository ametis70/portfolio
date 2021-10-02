import { useEffect } from 'react'
import useStore from '../store'
import { displayStatus, displayContentTypes } from '../store/constants'

const useDisplay = (status: number, contentType?: number, contentData?: string) => {
  const setDisplayContent = useStore((state) => state.setDisplayContent)
  const displayCanvas = useStore((state) => state.displayCanvas)

  useEffect(() => {
    setDisplayContent(status, contentType, contentData)
  }, [status, contentType, contentData, setDisplayContent, displayCanvas])

  return null
}

export { displayStatus, displayContentTypes }
export default useDisplay
