import { Flex, Image, Box, useColorMode } from '@chakra-ui/react'

import ColorModeButton from './ColorModeButton'
import MotionBox from './MotionBox'
import HeaderTitle from './HeaderTitle'
import Nav from './Nav'
import Logo from '../images/logo.inline.svg'

type HeaderProps = {
  isHome: boolean | undefined
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
  const { colorMode } = useColorMode()
  return (
    <Flex
      as="header"
      w="100%"
      alignItems="center"
      px="1rem"
      bg={colorMode === 'dark' ? 'overlay.dark' : 'overlay.light'}
      zIndex="10"
    >
      <MotionBox initial={false} variants={logoVariants}>
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
