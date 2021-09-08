import React, { Suspense } from 'react'
import { Canvas as ThreeCanvas } from '@react-three/fiber'
import { Box } from '@chakra-ui/react'

import Logo from './3d/Logo'
import House from './3d/House'
import Pc from './3d/Pc'

const Canvas: React.FC = () => {
  return (
    <Box w="100%" h="100vh" position="absolute">
      <ThreeCanvas
        style={{ width: '100%', height: '100%' }}
        camera={{
          fov: 20,
          near: 0.1,
          far: 10,
          position: [0.913962, 1.24633, 0.185101],
        }}
        flat
        onCreated={({ camera }) => {
          camera.lookAt(-0.176749, 0.89121, -1.58908)
        }}
      >
        <Suspense fallback={null}>
          <House />
          <Pc />
          <Logo />
        </Suspense>
      </ThreeCanvas>
    </Box>
  )
}

export default Canvas
