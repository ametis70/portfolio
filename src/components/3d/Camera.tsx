import { useEffect } from 'react'
import { useMotionValue, animate } from 'framer-motion'
import { useThree } from '@react-three/fiber'
import useStore from '../../store'
import { cameraPositions as cp } from '../../store/constants'

const transition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 1,
}

const Camera = () => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const z = useMotionValue(0)

  const { camera } = useThree()

  useEffect(() => {
    const move = (vec: Array<number>) => {
      animate(x, vec[0], transition)
      animate(y, vec[1], transition)
      animate(z, vec[2], transition)
    }
    useStore.subscribe(
      (cameraPosition: number) => {
        switch (cameraPosition) {
          case cp.CLOSE:
            move([0.913962, 1.24633, 0.185101])
            break
          case cp.FRONT:
            move([1, 1, 0])
            break
        }
      },
      (state) => state.cameraPosition,
    ),
      []
  })

  useEffect(() => {
    const updateCamera = () => {
      camera.position.fromArray([x.get(), y.get(), z.get()])
      console.log(camera.position)
    }

    const unsubscribeX = x.onChange(updateCamera)

    return () => {
      unsubscribeX()
    }
  }, [])

  return null
}

export default Camera
