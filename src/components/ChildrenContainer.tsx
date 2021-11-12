import { Flex } from '@chakra-ui/react'
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
  return (
    <Flex
      as={MotionBox}
      variants={variants}
      direction="column"
      align="center"
      justify="center"
      w="100%"
      flex="1"
      zIndex="10"
    >
      {children}
    </Flex>
  )
}

export default ChildrenContainer
