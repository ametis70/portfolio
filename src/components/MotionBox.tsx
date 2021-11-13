import { HTMLChakraProps, chakra } from '@chakra-ui/react'
import { motion, HTMLMotionProps } from 'framer-motion'
type Merge<P, T> = Omit<P, keyof T> & T
export type MotionBoxProps = Merge<
  Merge<HTMLChakraProps<'div'>, HTMLMotionProps<'div'>>,
  React.HTMLAttributes<HTMLElement>
>

const MotionBox: React.FC<MotionBoxProps> = motion(chakra.div)

export default MotionBox
