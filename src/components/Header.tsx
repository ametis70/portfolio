import React, { useEffect, useState } from 'react'
import { Box, Heading, Stack } from '@chakra-ui/react'
import { useLocation } from '@reach/router'
import { useResizeDetector } from 'react-resize-detector'

import Link from './Link'
import MotionBox from './MotionBox'

const headerVariants = {
  home: {
    y: 'calc(50vh - 100%)',
    x: 'calc(50vw - 50%)',
    transition: {
      delayChildren: 0.5,
      ease: 'easeInOut',
      duration: 0.5,
    },
  },
  top: {
    y: 0,
    x: 0,
    transition: {
      when: 'afterChildren',
      ease: 'easeInOut',
      duration: 0.5,
    },
  },
}

const navVariants = {
  home: (headingsHeight) => ({
    y: `calc(50vh + ${headingsHeight}px)`,
    x: 'calc(-50vw + 50%)',
    transition: {
      delayChildren: 0.5,
      ease: 'easeInOut',
      duration: 0.5,
    },
  }),
  top: {
    y: 0,
    x: 0,
    transition: {
      when: 'afterChildren',
      ease: 'easeInOut',
      duration: 0.5,
    },
  },
}

const subtitleVariants = {
  home: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  top: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
}

const Header: React.FC = (): JSX.Element => {
  const { pathname } = useLocation()
  const [isHome, setHome] = useState<boolean>(pathname === '/')
  const [headingsHeight, setHeadingsHeight] = useState<number>(undefined)
  const { height: titleHeight, ref: titleRef } = useResizeDetector()
  const { height: subtitleHeight, ref: subtitleRef } = useResizeDetector()

  console.log(titleHeight, subtitleHeight)

  useEffect(() => {
    if (pathname === '/') setHome(true)
    else setHome(false)
  }, [pathname])

  useEffect(() => {
    if (titleRef?.current && subtitleRef?.current && titleHeight && subtitleHeight) {
      setHeadingsHeight(titleHeight + subtitleHeight)
    }
  }, [
    titleRef,
    subtitleRef,
    titleHeight,
    subtitleHeight,
    headingsHeight,
    setHeadingsHeight,
  ])

  return (
    <MotionBox
      display="flex"
      as="header"
      animate={isHome ? 'home' : 'top'}
      variants={{
        top: { transition: { staggerChildren: 0.2 } },
      }}
      w="100%"
      alignItems="center"
      layout
    >
      <MotionBox
        display="inline-block"
        position="relative"
        variants={headerVariants}
        initial={false}
      >
        <Box position="relative">
          <Link to="/">
            <Heading
              as="h1"
              px={[2, 4, 4]}
              textTransform="uppercase"
              fontSize={['xl', '2xl', '5xl']}
              letterSpacing="0.05em"
              fontWeight="normal"
              ref={titleRef}
            >
              Ian Mancini
            </Heading>
          </Link>
          <MotionBox
            w="100%"
            textAlign="center"
            position="absolute"
            as="h2"
            textTransform="uppercase"
            fontSize={['xl', '2xl', '2xl']}
            letterSpacing="0.065em"
            fontWeight="300"
            pb="3rem"
            ref={subtitleRef}
            variants={subtitleVariants}
          >
            Diseño Multimedial
          </MotionBox>
        </Box>
      </MotionBox>
      <Box flex="1 1 0" />
      {headingsHeight ? (
        <MotionBox
          initial={false}
          custom={headingsHeight}
          variants={navVariants}
          as={Stack}
          px={[2, 4, 4]}
          direction="row"
          spacing="2rem"
          fontSize="xl"
          fontWeight="200"
          opacity="0.82"
        >
          <Link to="/services"> Servicios </Link>
          <Link to="/works"> Trabajos </Link>
          <Link to="/cv"> CV </Link>
          <Link to="/contact"> Contacto </Link>
        </MotionBox>
      ) : null}
    </MotionBox>
  )
}

export default Header
