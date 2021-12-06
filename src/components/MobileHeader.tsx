import { useState } from 'react'
import { Box, Flex, Grid, IconButton, Image, useColorMode } from '@chakra-ui/react'
import { BiMenu, BiX } from 'react-icons/bi'

import BackgroundSwitcher from './BackgroundSwitcher'
import ColorModeButton from './ColorModeButton'
import LanguageSwitcherButton from './LanguageSwitcherButton'
import Link from './Link'
import MotionBox from './MotionBox'
import Nav from './Nav'

import useI18Next from '../hooks/useI18Next'
import useStore from '../store'

import Logo from '../images/logo.inline.svg'

const MobileHeader: React.FC = () => {
  const { t } = useI18Next()
  const { colorMode } = useColorMode()
  const isHome = useStore((state) => state.isHome)

  const [isOpen, setOpen] = useState(false)

  return (
    <Box
      as="header"
      position="fixed"
      overflowX="hidden"
      w="100%"
      zIndex="999"
      display={['block', 'block', 'none']}
    >
      <MotionBox
        w="100%"
        animate={isHome ? 'home' : isOpen ? 'open' : 'closed'}
        initial={false}
        variants={{
          home: {
            height: '64px',
            backgroundColor: 'rgba(255,255,255,0)',
            transitionEnd: {
              overflow: 'visible',
            },
            transition: { duration: 0.2, when: 'beforeChildren' },
          },
          open: {
            height: 'fit-content',
            backgroundColor:
              colorMode === 'dark'
                ? 'var(--chakra-colors-overlay-darker)'
                : 'var(--chakra-colors-overlay-lighter)',
            overflow: 'hidden',
            transition: { when: 'beforeChildren', duration: 0.3, ease: 'easeOut' },
          },
          closed: {
            height: '64px',
            backgroundColor:
              colorMode === 'dark'
                ? 'var(--chakra-colors-overlay-darker)'
                : 'var(--chakra-colors-overlay-lighter)',
            overflow: 'hidden',
            transition: { duration: 0.3, ease: 'easeOut', when: 'afterChildren' },
          },
        }}
      >
        <MotionBox
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
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
        </MotionBox>

        <MotionBox
          key="mobile-nav"
          layout="position"
          variants={{
            open: { opacity: 1, transitionEnd: { position: 'static' } },
            home: {
              opacity: 1,
              transition: { delay: 0.1 },
              position: 'fixed',
            },
            closed: {
              opacity: 0,
              transition: { duration: 0.1 },
              transitionEnd: { position: 'static' },
            },
          }}
          top="0"
          h="100%"
        >
          <Flex direction="column" h="100%" justify="space-between">
            <Box />
            <Box pt={12} pb={4}>
              <Nav alwaysOpen onLinkClick={() => setOpen(false)} />
            </Box>

            <Flex direction="column" alignItems="flex-start" justify="flex-end" py={4}>
              <BackgroundSwitcher alwaysOpen />
              <LanguageSwitcherButton alwaysOpen />
              <ColorModeButton alwaysOpen />
            </Flex>
          </Flex>
        </MotionBox>
      </MotionBox>
    </Box>
  )
}

export default MobileHeader
