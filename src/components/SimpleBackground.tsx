import { useColorMode } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import useStore from '../store'
import MotionBox, { MotionBoxProps } from './MotionBox'

const sharedProps: MotionBoxProps = {
  w: '100%',
  h: '100%',
  position: 'fixed',
  exit: { opacity: 0 },
  initial: { opacity: 0 },
}

const SimpleBackground: React.FC = () => {
  const { colorMode } = useColorMode()
  const workGradient = useStore((state) => state.workGradient)

  return (
    <AnimatePresence>
      {workGradient ? (
        <MotionBox
          {...sharedProps}
          key={workGradient}
          animate={{
            opacity: 1,
            background: workGradient,
          }}
        />
      ) : (
        <MotionBox
          {...sharedProps}
          key={`default-simple-${colorMode}`}
          animate={{
            opacity: 1,
            background:
              colorMode === 'dark'
                ? 'linear-gradient(110deg, var(--chakra-colors-amethyst-700), var(--chakra-colors-amethyst-900))'
                : 'linear-gradient(110deg, var(--chakra-colors-amethyst-200), var(--chakra-colors-amethyst-400))',
          }}
        />
      )}
    </AnimatePresence>
  )
}

export default SimpleBackground
