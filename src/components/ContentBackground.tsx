import { useColorMode, useTheme } from '@chakra-ui/react'

import MotionBox, { MotionBoxProps } from './MotionBox'

import usePersistentStore from '../store/persistent'
import useStore from '../store'

const ContentBackground: React.FC<MotionBoxProps> = ({ children, ...props }) => {
  const { colors } = useTheme()
  const { colorMode } = useColorMode()
  const workGradient = useStore((state) => state.workGradient)
  const use3D = usePersistentStore((state) => state.use3D)

  const variants = {
    showLight: {
      backgroundColor: colors.overlay.light,
      opacity: 1,
    },
    showDark: {
      backgroundColor: colors.overlay.dark,
      opacity: 1,
    },
    fadeLight: {
      backgroundColor: colors.overlay.fadeLight,
      opacity: 1,
    },
    fadeDark: {
      backgroundColor: colors.overlay.fadeDark,
      opacity: 1,
    },
    final: {
      opacity: 0,
      backgroundColor:
        colorMode === 'dark' ? colors.overlay.fadeDark : colors.overlay.fadeLight,
    },
    enter: {
      opacity: 0,
      backgroundColor: colorMode === 'dark' ? colors.overlay.light : colors.overlay.dark,
    },
  }

  const currentVariant =
    !use3D && !workGradient
      ? colorMode === 'dark'
        ? 'fadeDark'
        : 'fadeLight'
      : colorMode === 'dark'
      ? 'showDark'
      : 'showLight'

  return (
    <MotionBox
      layout="position"
      position="relative"
      display="flex"
      alignSelf="center"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      flex="0 1 560px"
      m={use3D ? '0 0 0 64px' : '0 auto 0 auto'}
      backdropFilter={'blur(40px)'}
      variants={variants}
      minH="100vh"
      exit="final"
      initial="enter"
      animate={currentVariant}
      {...props}
    >
      {children}
    </MotionBox>
  )
}

export default ContentBackground
