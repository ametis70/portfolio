import { useColorMode } from '@chakra-ui/react'

import MotionBox, { MotionBoxProps } from './MotionBox'

const ContentBackground: React.FC<MotionBoxProps> = ({ children, ...props }) => {
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
      bg={colorMode === 'dark' ? 'overlay.dark' : 'overlay.light'}
      backdropFilter="blur(40px)"
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 1 }}
      {...props}
    >
      {children}
    </MotionBox>
  )
}

export default ContentBackground
