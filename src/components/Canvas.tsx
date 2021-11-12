import { Suspense } from 'react'
import { Canvas as ThreeCanvas } from '@react-three/fiber'
import { Box, ColorModeContext } from '@chakra-ui/react'

import Logo from './3d/Logo'
import House from './3d/House'
import Pc from './3d/Pc'
import Camera from './3d/Camera'
import { useContextBridge } from '@react-three/drei'

const Canvas: React.FC = () => {
  const ContextBridge = useContextBridge(ColorModeContext)

  return (
    <Box w="100%" h="100vh" position="absolute">
      <ThreeCanvas
        style={{ width: '100%', height: '100%' }}
        camera={{
          fov: 20,
          near: 0.1,
          far: 10,
        }}
        raycaster={{
          computeOffsets: (event: PointerEvent) => {
            const { screenX, screenY } = event
            return {
              offsetX: screenX,
              offsetY: screenY,
            }
          },
        }}
        onCreated={(state) => {
          state.events.connect!(window)
        }}
      >
        <ContextBridge>
          <Camera />
          <Suspense fallback={null}>
            <House />
            <Pc />
            <Logo
              position={[-0.459085, 0.935968, -4.5]}
              rotation={[-Math.PI * 0.1, 0, -Math.PI * 0.05]}
            />
          </Suspense>
        </ContextBridge>
      </ThreeCanvas>
    </Box>
  )
}

export default Canvas
