import { useColorMode } from '@chakra-ui/react'

import MotionBox, { MotionBoxProps } from './MotionBox'

import usePersistentStore from '../store/persistent'

const ContentBackground: React.FC<MotionBoxProps> = ({ children, ...props }) => {
  const { colorMode } = useColorMode()

  const use3D = usePersistentStore((state) => state.use3D)

  return (
    <MotionBox
      layout
      position="relative"
      display="flex"
      alignSelf="center"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      flex="0 1 560px"
      m={use3D ? '0 0 0 64px' : '0 auto'}
      bg={
        !use3D ? 'transparent ' : colorMode === 'dark' ? 'overlay.dark' : 'overlay.light'
      }
      backdropFilter={use3D ? 'none' : 'blur(40px)'}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      {...props}
    >
      {children}
    </MotionBox>
  )
}

export default ContentBackground
