import { Flex, Image, useColorMode, Grid } from '@chakra-ui/react'

import Nav from './Nav'
import Link from './Link'
import MotionBox from './MotionBox'
import ColorModeButton from './ColorModeButton'
import useStore from '../store'

import Logo from '../images/logo.inline.svg'
import LanguageSwitcherButton from './LanguageSwitcherButton'

const Header: React.FC = (): JSX.Element => {
  const { colorMode } = useColorMode()
  const isHome = useStore((state) => state.isHome)

  return (
    <MotionBox
      as="header"
      variants={{
        home: { backgroundColor: 'rgba(0, 0, 0, 0)', transition: { delay: 2 } },
        page: {
          backgroundColor:
            colorMode === 'dark'
              ? 'var(--chakra-colors-amethyst-900)'
              : 'var(--chakra-colors-amethyst-50)',
        }, // @ts-ignore
        transition: { duration: 0.01 },
      }}
      animate={isHome ? 'home' : 'page'}
      zIndex="999"
      position="fixed"
      w="64px"
      h="100vh"
      sx={{ transition: 'background ease-out 0.3s, color ease-out 0.3s' }}
      pt={2}
    >
      <Grid
        templateRows="1fr 2fr 1fr"
        templateColumns="100%"
        justifyContent="start"
        h="100%"
      >
        <MotionBox
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
          <Link to="/" variant="icon" bg="inherit" tabIndex={isHome ? -1 : 0}>
            <Image bg="inherit" py={2} px={2} w="64px" color="currentColor" as={Logo} />
          </Link>
        </MotionBox>

        <Nav />

        <Flex direction="column" alignItems="flex-start" justify="flex-end" pb={2}>
          <LanguageSwitcherButton />
          <ColorModeButton />
        </Flex>
      </Grid>
    </MotionBox>
  )
}

export default Header
