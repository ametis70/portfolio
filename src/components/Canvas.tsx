import { Suspense } from 'react'
import { Canvas as ThreeCanvas } from '@react-three/fiber'
import { Box } from '@chakra-ui/react'

import Logo from './3d/Logo'
import House from './3d/House'
import Pc from './3d/Pc'
import Camera from './3d/Camera'

const Canvas: React.FC = () => {
  return (
    <Box w="100%" h="100vh" position="absolute">
      <ThreeCanvas
        style={{ width: '100%', height: '100%' }}
        camera={{
          fov: 20,
          near: 0.1,
          far: 10,
        }}
        flat
      >
        <Camera />
        <Suspense fallback={null}>
          <House />
          <Pc />
          <Logo
            position={[-0.459085, 0.935968, -4.5]}
            rotation={[-Math.PI * 0.1, 0, -Math.PI * 0.05]}
          />
        </Suspense>
      </ThreeCanvas>
    </Box>
  )
}

export default Canvas
