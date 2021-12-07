import { Image, useColorMode, Grid, useBreakpointValue } from '@chakra-ui/react'

import Nav from './Nav'
import Settings from './Settings'
import Link from '../Link'
import MotionBox from '../MotionBox'

import useStore from '../../store'

import Logo from '../../images/logo.inline.svg'
import HeaderGrid from './Grid'

const Header: React.FC = (): JSX.Element => {
  const { colorMode } = useColorMode()
  const isHome = useStore((state) => state.isHome)

  const homePosition = useBreakpointValue({
    base: { x: 0, y: '-64px' },
    md: { x: 0, y: '-64px' },
    lg: { x: '-64px', y: 0 },
  })

  return (
    <MotionBox
      as="header"
      backgroundColor={colorMode === 'dark' ? 'amethyst.900' : 'amethyst.50'}
      variants={{
        home: {
          ...homePosition,
          transitionEnd: { display: 'none' },
        },
        page: {
          x: 0,
          y: 0,
          display: 'block',
          transition: { duration: 0.3 },
        },
      }}
      animate={isHome ? 'home' : 'page'}
      zIndex="999"
      position="fixed"
      w={['100%', '100%', '64px']}
      h={['64px', '64px', '100%']}
    >
      <HeaderGrid>
        <Link to="/" variant="icon" bg="inherit" tabIndex={isHome ? -1 : 0}>
          <Image bg="inherit" py={2} px={2} w="64px" color="currentColor" as={Logo} />
        </Link>

        <Nav />

        <Settings />
      </HeaderGrid>
    </MotionBox>
  )
}

export default Header
