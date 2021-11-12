import { Text, Flex, Image, Box, useColorMode, Grid } from '@chakra-ui/react'
import { useHover } from '@react-aria/interactions'

import ColorModeButton from './ColorModeButton'

import Nav from './Nav'
import Logo from '../images/logo.inline.svg'
import Link from './Link'
import MotionBox from './MotionBox'
import { Transition, Variants } from 'framer-motion'
import React from 'react'

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

  let { hoverProps, isHovered } = useHover({})

  return (
    <MotionBox
      as="header"
      initial="hidden"
      variants={headerVariants}
      animate={isHovered ? 'expanded' : 'compact'}
      overflow="hidden"
      zIndex="999"
      position="fixed"
      {...hoverProps}
      h="100vh"
      bg={colorMode === 'dark' ? 'amethyst.900' : 'amethyst.50'}
    >
      <Grid
        as={MotionBox}
        templateRows="repeat(3, 1fr)"
        templateColumns="1fr"
        justifyContent="start"
        h="100%"
      >
        <MotionBox
          w="300px"
          position="relative"
          variants={{
            compact: {
              y: '1rem',
              transition: defaultTransition,
            },
            expanded: {
              y: '2rem',
              transition: defaultTransition,
            },
          }}
        >
          <MotionBox
            w="fit-content"
            position="absolute"
            variants={{
              compact: {
                width: '64px',
                left: '0%',
                right: '0%',
                x: '0%',
                transition: defaultTransition,
              },
              expanded: {
                width: '128px',
                x: '-50%',
                left: '50%',
                right: '50%',
                transition: defaultTransition,
              },
            }}
          >
            <Link to="/">
              <Image px={2} w="100%" color="currentColor" as={Logo} />
            </Link>
          </MotionBox>
        </MotionBox>

        <Nav expand={isHovered} />

        <Flex direction="column" alignItems="flex-start" justify="flex-end" px={2}>
          <ColorModeButton />
        </Flex>
      </Grid>
    </MotionBox>
  )
}

export default Header
