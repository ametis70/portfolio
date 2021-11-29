import { Transition, useIsPresent } from 'framer-motion'
import MotionBox, { MotionBoxProps } from './MotionBox'

const transition: Transition = {
  staggerChildren: 0.1,
}

const ContentContainer: React.FC<MotionBoxProps> = ({ children, ...props }) => {
  const isPresent = useIsPresent()

  return (
    <MotionBox
      position="relative"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      w="100%"
      py={8}
      variants={{ enter: { transition }, exit: { transition } }}
      exit="exit"
      animate={isPresent ? 'enter' : 'exit'}
      {...props}
    >
      {children}
    </MotionBox>
  )
}

export default ContentContainer
