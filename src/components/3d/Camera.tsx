import { useEffect, useState } from 'react'
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

const defaultCameraValues = [
  [-999, -999, -999],
  [0, 0, 0],
]

const getCoordinates = (cameraPosition: number): Array<Array<number>> => {
  switch (cameraPosition) {
    case cp.CLOSE:
      return [[-0.459085, 0.935968, -1.29679], displayPosition]
    case cp.FRONT:
      return [[-0.459085, 0.935968, -0.6], displayPosition]
    case cp.GENERAL:
      return [
        [1.02887, 1.24633, 0.185101],
        [0, 0.89121, -1.58908],
      ]
    default:
      console.warn('using default camera values')
      return defaultCameraValues
  }
}

const Camera = () => {
  const [cameraInitialized, setCameraInitialized] = useState<boolean>(false)
  const cameraPosition = useStore((state) => state.cameraPosition)

  const posx = useMotionValue(0)
  const posy = useMotionValue(0)
  const posz = useMotionValue(0)

  const targetx = useMotionValue(0)
  const targety = useMotionValue(0)
  const targetz = useMotionValue(0)

  const { camera } = useThree()

  const updateCamera = () => {
    camera.position.fromArray([posx.get(), posy.get(), posz.get()])
    camera.lookAt(targetx.get(), targety.get(), targetz.get())
  }

  useEffect(() => {
    if (!cameraInitialized && cameraPosition !== undefined) {
      const c = getCoordinates(cameraPosition)

      if (c === defaultCameraValues) return

      posx.set(c[0][0])
      posy.set(c[0][1])
      posz.set(c[0][2])

      targetx.set(c[1][0])
      targety.set(c[1][1])
      targetz.set(c[1][2])

      updateCamera()
      setCameraInitialized(true)
    }
  }, [cameraPosition, cameraInitialized, setCameraInitialized])

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
      (cameraPosition: number | undefined) => {
        if (cameraPosition === undefined) return

        const coordinates = getCoordinates(cameraPosition)
        move(coordinates[0], coordinates[1])
      },
      (state) => state.cameraPosition,
    ),
      []
  })

  useFrame(() => {
    if (!cameraInitialized) return

    updateCamera()
  })

  return null
}

export default Camera
