import { Flex, useColorMode } from '@chakra-ui/react'
import MotionBox from './MotionBox'

const variants = {
  top: {
    width: '40%',
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
  const { colorMode } = useColorMode()

  return (
    <Flex
      as={MotionBox}
      variants={variants}
      direction="column"
      alignSelf="flex-end"
      align="center"
      justify="center"
      w="100%"
      flex="1"
      bg={colorMode === 'dark' ? 'overlay.dark' : 'overlay.light'}
      zIndex="10"
    >
      {children}
    </Flex>
  )
}

export default ChildrenContainer
