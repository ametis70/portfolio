import React from 'react'
import { Flex, Image, Box, Heading, Stack } from '@chakra-ui/react'

import { useResizeDetector } from 'react-resize-detector'
import { AnimateSharedLayout } from 'framer-motion'

import MotionBox from './MotionBox'
import HeaderTitle from './HeaderTitle'
import Nav from './Nav'
import Logo from '../images/logo.inline.svg'

type HeaderProps = {
  isHome: boolean
}

const logoVariants = {
  top: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
  home: {
    opacity: 0,
    x: '-100%',
    transition: {
      duration: 0.2,
      ease: 'easeInOut',
    },
  },
}

const Header: React.FC<HeaderProps> = ({ isHome }): JSX.Element => {
  return (
    <Flex as="header" w="100%" alignItems="center">
      <MotionBox initial={false} variants={logoVariants}>
        <Image w="76px" h="76px" p="0.25rem" mx="0.5rem" color="amethyst.900" as={Logo} />
      </MotionBox>
      {isHome ? null : <HeaderTitle isHome={isHome} />}
      <Box flex="1 1 0" />
      {isHome ? null : <Nav />}
    </Flex>
  )
}

export default Header
