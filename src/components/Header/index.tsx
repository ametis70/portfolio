import { useEffect, useState } from 'react'
import {
  Image,
  useColorMode,
  useBreakpointValue,
  Flex,
  IconButton,
  Box,
} from '@chakra-ui/react'
import { BiMenu, BiX } from 'react-icons/bi'
import { AnimatePresence } from 'framer-motion'

import Nav from './Nav'
import Settings from './Settings'
import Link from '../Link'
import MotionBox from '../MotionBox'
import HeaderGrid from './Grid'

import { usePageContext } from '../../hooks/usePageContext'
import useI18Next from '../../hooks/useI18Next'
import useLockScroll from '../../hooks/useLockScroll'

import Logo from '../../images/logo.inline.svg'

const Header: React.FC = () => {
  const [isOpen, setOpen] = useState(false)
  const { colorMode } = useColorMode()
  const { isHome } = usePageContext()
  const { t } = useI18Next()

  const homePosition = useBreakpointValue({
    base: { x: 0, y: '-64px' },
    md: { x: 0, y: '-64px' },
    lg: { x: '-64px', y: 0 },
  })

  const headerHeight = useBreakpointValue({
    base: { height: isOpen ? 'fit-content' : '64px' },
    md: { height: isOpen ? 'fit-content' : '64px' },
    lg: { height: '100%' },
  })

  const isMobile = useBreakpointValue({
    base: true,
    md: true,
    lg: false,
  })

  useEffect(() => {
    if (!isMobile && isOpen) {
      setOpen(false)
    }
  }, [isMobile, isOpen, setOpen])

  useLockScroll(isOpen)

  if (
    // @ts-ignore
    homePosition === 'undefined' ||
    // @ts-ignore
    headerHeight === 'undefined' ||
    // @ts-ignore
    isMobile === 'undefined'
  ) {
    return null
  }

  return (
    <>
      <MotionBox
        as="header"
        backgroundColor={colorMode === 'dark' ? 'overlay.darker' : 'overlay.lighter'}
        initial={{ display: 'none', ...homePosition }}
        display="none"
        variants={{
          home: {
            ...homePosition,
            transitionEnd: { display: 'none' },
            ...headerHeight,
          },
          page: {
            x: 0,
            y: 0,
            display: 'block',
            transition: { duration: 0.3 },
            ...headerHeight,
          },
        }}
        animate={isHome ? 'home' : 'page'}
        zIndex="999"
        position="fixed"
        transform={[
          'translate(0px, -64px)',
          'translate(0px, -64px)',
          'translate(-64px, 0px)',
        ]}
        w={['100%', '100%', '64px']}
        h={['64px', '64px', '100%']}
        overflow={['hidden', 'hidden', 'visible']}
      >
        <HeaderGrid>
          <Flex direction="row" justify="space-between" align="center" w="full" h="64px">
            <Link to="/" variant="icon" bg="inherit" onClick={() => setOpen(false)}>
              <Image bg="inherit" py={2} px={2} w="64px" color="currentColor" as={Logo} />
            </Link>

            {isMobile ? (
              <IconButton
                aria-label={
                  isOpen
                    ? t('ui.close_nav', { ns: 'common' })
                    : t('ui.open_nav', { ns: 'common' })
                }
                onClick={() => setOpen(!isOpen)}
                icon={isOpen ? <BiX /> : <BiMenu />}
                mr={5}
                fontSize="3xl"
                size="lg"
                variant="icon"
                _focus={{ boxShadow: 'none', outline: 'none' }}
              />
            ) : null}
          </Flex>

          <Nav open={isMobile} onClick={() => setOpen(false)} />

          <Box py={[4, 4, 0]} h="100%" w="100%">
            <Settings open={isMobile} />
          </Box>
        </HeaderGrid>
      </MotionBox>
      <AnimatePresence>
        {isOpen ? (
          <MotionBox
            key="nav-overlay"
            onClick={() => setOpen(false)}
            position="fixed"
            backgroundColor="rgba(0, 0, 0, 0.5)"
            h="100vh"
            w="100%"
            top="0"
            left="0"
            zIndex="998"
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default Header
