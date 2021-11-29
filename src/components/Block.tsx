import { Transition, Variants } from 'framer-motion'
import MotionBox, { MotionBoxProps } from './MotionBox'

const transition: Transition = {
  duration: 0.2,
}

const blockVariants: Variants = {
  exit: {
    y: -16,
    opacity: 0,
    transition,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition,
  },
}

const Block: React.FC<MotionBoxProps> = ({ children, ...props }) => (
  <MotionBox variants={blockVariants} initial={{ opacity: 0, y: 16 }} {...props}>
    {children}
  </MotionBox>
)
export default Block
