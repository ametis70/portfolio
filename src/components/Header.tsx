import { Flex, Image, Box, useColorMode } from '@chakra-ui/react'

import ColorModeButton from './ColorModeButton'
import HeaderTitle from './HeaderTitle'

import Nav from './Nav'
import Logo from '../images/logo.inline.svg'

const Header: React.FC = (): JSX.Element => {
  const { colorMode } = useColorMode()
  return (
    <Flex
      as="header"
      w="64px"
      h="100vh"
      position="fixed"
      alignItems="center"
      direction="column"
      bg={colorMode === 'dark' ? 'amethyst.900' : 'amethyst.50'}
      zIndex="10"
    >
      <Box mt={4}>
        <Image w="full" h="full" px={2} color="currentColor" as={Logo} />
      </Box>

      <Box flex="1 1 0" />

      <Nav />

      <Box flex="1 1 0" />

      <Box mb={4}>
        <ColorModeButton />
      </Box>
    </Flex>
  )
}

export default Header
