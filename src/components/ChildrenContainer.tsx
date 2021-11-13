import { Flex, useColorMode } from '@chakra-ui/react'

import MotionBox from './MotionBox'
import useStore from '../store'

const variants = {
  top: {
    width: '560px',
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  home: {
    width: '100%',
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
}

const ChildrenContainer: React.FC = ({ children }) => {
  const isHome = useStore((state) => state.isHome)
  const { colorMode } = useColorMode()
  return (
    <Flex
      as={MotionBox}
      variants={variants}
      direction="column"
      align="center"
      justify="flex-start"
      w="100%"
      flex="1"
      zIndex="10"
      bg={!isHome ? (colorMode === 'dark' ? 'overlay.dark' : 'overlay.light') : 'none'}
      backdropFilter={!isHome ? 'blur(40px)' : 'none'}
      ml="64px"
      py={8}
    >
      {children}
    </Flex>
  )
}

export default ChildrenContainer
