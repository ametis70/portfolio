import React from 'react'
import { Canvas as ThreeCanvas } from '@react-three/fiber'
import { Box } from '@chakra-ui/react'
import { OrbitControls } from '@react-three/drei'

import Logo from './Logo'

const Canvas: React.FC = () => {
  return (
    <Box w="100%" h="35vh">
      <ThreeCanvas
        camera={{ position: [3.48, -0.83, 0], fov: 23 }}
        style={{ width: '100%', height: '100%' }}
      >
        <OrbitControls enableZoom={false} enablePan={false} enableRotate />
        <ambientLight />
        <pointLight position={[2.34, -0.46, 1.36]} />
        <pointLight position={[-3.04, -1.38, -1.17]} />
        <pointLight position={[-2.02, 1.18, 1.76]} />
        <pointLight position={[-9.32, 6.13, -0.75]} />
        <Logo />
      </ThreeCanvas>
    </Box>
  )
}

export default Canvas
