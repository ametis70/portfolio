import { useEffect } from 'react'
import { useMotionValue, animate, Transition } from 'framer-motion'
import { useThree, useFrame } from '@react-three/fiber'
import useStore from '../../store'
import { cameraPositions as cp } from '../../store/constants'

const transition: Transition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 1,
}

const displayPosition = [-0.459085, 0.935968, -1.59215]

const Camera = () => {
  const posx = useMotionValue(0)
  const posy = useMotionValue(0)
  const posz = useMotionValue(0)

  const targetx = useMotionValue(0)
  const targety = useMotionValue(0)
  const targetz = useMotionValue(0)

  const { camera } = useThree()

  useEffect(() => {
    const move = (pos: Array<number>, target: Array<number>) => {
      animate(posx, pos[0], transition)
      animate(posy, pos[1], transition)
      animate(posz, pos[2], transition)
      animate(targetx, target[0], transition)
      animate(targety, target[1], transition)
      animate(targetz, target[2], transition)
    }
    useStore.subscribe(
      (cameraPosition: number) => {
        console.log(cameraPosition)
        switch (cameraPosition) {
          case cp.CLOSE:
            move([-0.459085, 0.935968, -1.29679], displayPosition)
            break
          case cp.FRONT:
            move([-0.459085, 0.935968, -0.6], displayPosition)
            break
          case cp.GENERAL:
            move([0.913962, 1.24633, 0.185101], [-0.176749, 0.89121, -1.58908])
            break
        }
      },
      (state) => state.cameraPosition,
    ),
      []
  })

  useFrame(() => {
    camera.position.fromArray([posx.get(), posy.get(), posz.get()])
    camera.lookAt(targetx.get(), targety.get(), targetz.get())
  })

  return null
}

export default Camera
