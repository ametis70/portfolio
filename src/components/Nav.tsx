import { Icon, Stack, Text, useColorMode, useTheme } from '@chakra-ui/react'

import { BiUser, BiBriefcase, BiMessageDetail } from 'react-icons/bi'

import { useLocation } from '@reach/router'

import MotionBox from './MotionBox'
import Link, { LinkProps } from './Link'
import React from 'react'

const NavLink: React.FC<{ to: string }> = ({ to, children }) => {
  const { colorMode } = useColorMode()
  const { colors } = useTheme()

  const linkStyles: Partial<LinkProps> = {
    width: 'full',
    px: '16px',
    py: 2,
    activeStyle: {
      background: colorMode === 'dark' ? colors.amethyst['50'] : colors.amethyst['900'],
      color: colorMode === 'dark' ? colors.amethyst['900'] : colors.amethyst['50'],
    },
  }

  return (
    <Link to={to} {...linkStyles}>
      {children}
    </Link>
  )
}

const Nav: React.FC<{ expand: boolean }> = ({ expand }) => {
  const { colorMode } = useColorMode()

  return (
    <MotionBox
      display="flex"
      fontSize="xl"
      fontWeight="200"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
      w="full"
      color={colorMode === 'dark' ? 'amethyst.50' : 'amethyst.900'}
    >
      <NavLink to="/about">
        <Icon boxSize={8} as={BiUser} /> <Text display="none"> Acerca </Text>
      </NavLink>
      <NavLink to="/works">
        <Icon boxSize={8} as={BiBriefcase} /> <Text display="none"> Trabajos </Text>
      </NavLink>
      <NavLink to="/contact">
        <Icon boxSize={8} as={BiMessageDetail} /> <Text display="none"> Contacto </Text>
      </NavLink>
    </MotionBox>
  )
}

export default Nav
