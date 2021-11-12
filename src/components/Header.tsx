import { useState } from 'react'
import { Text, Flex, Image, Box, useColorMode, Grid, Heading } from '@chakra-ui/react'
import { useHover, useFocusWithin } from '@react-aria/interactions'
import { AnimatePresence, Transition, Variants } from 'framer-motion'

import Nav from './Nav'
import Link from './Link'
import MotionBox from './MotionBox'
import ColorModeButton from './ColorModeButton'
import useStore from '../store'

import Logo from '../images/logo.inline.svg'

const defaultTransition: Transition = {
  duration: 0.25,
  easing: 'easeInOut',
}

const headerVariants: Variants = {
  hidden: {
    x: '-100%',
  },
  compact: {
    x: '0',
    width: '64px',
    transition: {
      ...defaultTransition,
      when: 'afterChildren',
    },
  },
  expanded: {
    x: '0',
    width: '300px',
    transition: {
      ...defaultTransition,
      delayChildren: 0.15,
    },
  },
}

const Header: React.FC = (): JSX.Element => {
  const { colorMode } = useColorMode()
  const [focusWithin, setFocusWithin] = useState(false)
  const isHome = useStore((state) => state.isHome)

  let { hoverProps, isHovered } = useHover({
    onHoverEnd: () => setFocusWithin(false),
  })

  const { focusWithinProps } = useFocusWithin({
    onFocusWithinChange: (isFocusWithin) => setFocusWithin(isFocusWithin),
  })

  return (
    <MotionBox
      as="header"
      initial="hidden"
      variants={headerVariants}
      animate={isHovered || focusWithin || isHome ? 'expanded' : 'compact'}
      overflow="hidden"
      zIndex="999"
      position="fixed"
      h="100vh"
      sx={{ transition: 'background-color 0.3s' }}
      bg={
        isHome
          ? 'rgba(0, 0, 0, 0)'
          : colorMode === 'dark'
          ? 'amethyst.900'
          : 'amethyst.50'
      }
      {...hoverProps}
      {...focusWithinProps}
    >
      <Grid
        as={MotionBox}
        templateRows="1fr 2fr 1fr"
        templateColumns="1fr"
        justifyContent="start"
        h="100%"
      >
        <Link to="/">
          <MotionBox w="300px" position="relative" maxH="calc(96px + 2rem + 2rem)">
            <AnimatePresence>
              {!isHome ? (
                <MotionBox
                  key="header-logo"
                  w="fit-content"
                  position="absolute"
                  exit={{ opacity: 0 }}
                  initial={{
                    opacity: 0,
                    x: '-50%',
                    left: '50%',
                    right: '50%',
                    y: '2rem',
                  }}
                  variants={{
                    compact: {
                      opacity: 1,
                      y: '1rem',
                      width: '64px',
                      left: '0%',
                      right: '0%',
                      x: '0%',
                      transition: {
                        ...defaultTransition,
                        when: 'afterChildren',
                      },
                    },
                    expanded: {
                      opacity: 1,
                      width: '96px',
                      x: '-50%',
                      left: '50%',
                      right: '50%',
                      y: '2rem',
                      transition: {
                        ...defaultTransition,
                        delay: 0.2,
                        delayChildren: 0.15,
                      },
                    },
                  }}
                >
                  <Image px={2} maxW="96px" w="100%" color="currentColor" as={Logo} />
                  <MotionBox
                    variants={{ compact: { opacity: 0 }, expanded: { opacity: 1 } }}
                  >
                    <Heading
                      py={2}
                      position="absolute"
                      left="50%"
                      right="50%"
                      transform="translateX(-50%)"
                      w="fit-content"
                      fontSize="lg"
                      whiteSpace="nowrap"
                      textTransform="uppercase"
                      fontWeight="medium"
                    >
                      Ian Mancini
                    </Heading>
                  </MotionBox>
                </MotionBox>
              ) : null}
            </AnimatePresence>
          </MotionBox>
        </Link>

        <Nav />

        <Flex direction="column" alignItems="flex-start" justify="flex-end" px={3} pb={2}>
          <ColorModeButton />
        </Flex>
      </Grid>
    </MotionBox>
  )
}

export default Header
