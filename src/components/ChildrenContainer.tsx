import { useColorMode } from '@chakra-ui/react'

import MotionBox, { MotionBoxProps } from './MotionBox'
import useStore from '../store'

const ChildrenContainer: React.FC<MotionBoxProps> = ({ children, ...props }) => {
  const isHome = useStore((state) => state.isHome)
  const { colorMode } = useColorMode()
  return (
    <MotionBox
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      flex="0 1 560px"
      ml="64px"
      bg={!isHome ? (colorMode === 'dark' ? 'overlay.dark' : 'overlay.light') : 'none'}
      backdropFilter={!isHome ? 'blur(40px)' : 'none'}
      py={8}
      {...props}
    >
      {children}
    </MotionBox>
  )
}

export default ChildrenContainer
