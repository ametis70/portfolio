import React, { Suspense } from 'react'
import { Canvas as ThreeCanvas } from '@react-three/fiber'
import { Box } from '@chakra-ui/react'
import { OrbitControls } from '@react-three/drei'

import Logo from './3d/Logo'
import House from './3d/House'
import Pc from './3d/Pc'

const Canvas: React.FC = () => {
  return (
    <Box w="100%" h="100vh" position="absolute">
      <ThreeCanvas style={{ width: '100%', height: '100%' }}>
        <OrbitControls />
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
