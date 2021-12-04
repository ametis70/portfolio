import { useColorMode } from '@chakra-ui/react'
import MotionBox from './MotionBox'

const SimpleBackground: React.FC = () => {
  const { colorMode } = useColorMode()
  return (
    <MotionBox
      w="100%"
      h="100vh"
      position="fixed"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      sx={{ transition: 'all 0.3s ease-out' }}
      bg={
        colorMode === 'dark'
          ? 'linear-gradient(110deg, var(--chakra-colors-amethyst-700) , var(--chakra-colors-amethyst-900))'
          : 'linear-gradient(110deg, var(--chakra-colors-amethyst-200) , var(--chakra-colors-amethyst-400))'
      }
    />
  )
}

export default SimpleBackground
