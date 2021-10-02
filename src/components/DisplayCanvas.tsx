import { useRef, useEffect } from 'react'

import useStore from '../store'

const DisplayCanvas: React.FC = () => {
  const setDisplayCanvas = useStore((state) => state.setDisplayCanvas)
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!ref.current || !setDisplayCanvas) return

    setDisplayCanvas(ref.current)

    return () => {
      setDisplayCanvas(undefined)
    }
  }, [ref, ref.current])

  return <canvas width="1920" height="1080" ref={ref} style={{ display: 'none' }} />
}

export default DisplayCanvas
