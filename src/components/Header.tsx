import React from 'react'
import { Flex, Image, Box, Heading, Stack } from '@chakra-ui/react'

import ColorModeButton from './ColorModeButton'
import MotionBox from './MotionBox'
import HeaderTitle from './HeaderTitle'
import Nav from './Nav'
import Logo from '../images/logo.inline.svg'

type HeaderProps = {
  isHome: boolean | null
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
    <Flex as="header" w="100%" alignItems="center" px="1rem">
      <MotionBox initial={false} variants={logoVariants} zIndex="10">
        <Image w="76px" h="76px" p="0.5rem" mr="0.5rem" color="currentColor" as={Logo} />
      </MotionBox>
      {isHome ? null : <HeaderTitle />}
      <Box flex="1 1 0" />
      {isHome ? null : <Nav />}
      <ColorModeButton />
    </Flex>
  )
}

export default Header
