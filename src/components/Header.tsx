import { Flex, Image, useColorMode, Grid } from '@chakra-ui/react'
import { Transition, Variants } from 'framer-motion'

import Nav from './Nav'
import Link from './Link'
import MotionBox from './MotionBox'
import ColorModeButton from './ColorModeButton'
import useStore from '../store'

import Logo from '../images/logo.inline.svg'
import LanguageSwitcherButton from './LanguageSwitcherButton'

const defaultTransition: Transition = {
  duration: 0.35,
  easing: 'easeInOut',
}

const Header: React.FC = (): JSX.Element => {
  const { colorMode } = useColorMode()
  const isHome = useStore((state) => state.isHome)

  return (
    <MotionBox
      as="header"
      variants={{ home: {}, page: {} }}
      animate={isHome ? 'home' : 'page'}
      zIndex="999"
      position="fixed"
      w="64px"
      h="100vh"
      sx={{ transition: 'background-color 0.3s' }}
      bg={colorMode === 'dark' ? 'amethyst.900' : 'amethyst.50'}
    >
      <Grid
        templateRows="1fr 2fr 1fr"
        templateColumns="100%"
        justifyContent="start"
        h="100%"
      >
        <MotionBox
          py="1rem"
          w="full"
          initial={false}
          variants={{
            home: {
              transition: { duration: 0.3 },
              opacity: 0,
              y: '-50%',
            },
            page: {
              transition: { duration: 0.3, delay: 0.4 },
              opacity: 1,
              y: '0%',
            },
          }}
        >
          <Link to="/" variant="icon">
            <Image px={2} w="64px" color="currentColor" as={Logo} />
          </Link>
        </MotionBox>

        <Nav />

        <Flex direction="column" alignItems="flex-start" justify="flex-end" px={3} pb={2}>
          <LanguageSwitcherButton />
          <ColorModeButton />
        </Flex>
      </Grid>
    </MotionBox>
  )
}

export default Header
