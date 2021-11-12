import { Icon as ChakraIcon, Text, useColorMode, useTheme } from '@chakra-ui/react'

import { BiUser, BiBriefcase, BiMessageDetail } from 'react-icons/bi'

import MotionBox from './MotionBox'
import Link, { LinkProps } from './Link'
import React from 'react'

const NavLink: React.FC<{ to: string; Icon: React.FC }> = ({ to, Icon, children }) => {
  const { colorMode } = useColorMode()
  const { colors } = useTheme()

  const linkStyles: Partial<LinkProps> = {
    width: 'full',
    px: '16px',
    py: 4,
    textTransform: 'uppercase',
    transition: 'all ease-in-out 0.2s',
    fontWeight: 'medium',
    _hover: {
      background: colorMode === 'dark' ? colors.amethyst['800'] : colors.amethyst['200'],
    },
    activeStyle: {
      background: colorMode === 'dark' ? colors.amethyst['50'] : colors.amethyst['900'],
      color: colorMode === 'dark' ? colors.amethyst['900'] : colors.amethyst['50'],
    },
  }

  return (
    <Link to={to} {...linkStyles} display="flex" alignItems="center">
      <ChakraIcon boxSize={8} as={Icon} />
      <Text pl={6}>{children}</Text>
    </Link>
  )
}

const Nav: React.FC = () => {
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
      <NavLink to="/about" Icon={BiUser}>
        Acerca
      </NavLink>
      <NavLink to="/works" Icon={BiBriefcase}>
        Trabajos
      </NavLink>
      <NavLink to="/contact" Icon={BiMessageDetail}>
        Contacto
      </NavLink>
    </MotionBox>
  )
}

export default Nav
