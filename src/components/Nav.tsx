import { useState } from 'react'
import { Icon as ChakraIcon, useColorMode } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BiUser, BiBriefcase, BiMessageDetail } from 'react-icons/bi'
import { useFocus, useHover } from '@react-aria/interactions'

import MotionBox from './MotionBox'
import Link, { LinkProps } from './Link'

import { usePageContext } from '../hooks/usePageContext'
import usePersistentStore from '../store/persistent'
import useStore from '../store'

const NavLink: React.FC<{
  to: string
  Icon: React.FC
  alwaysOpen?: boolean
  onLinkClick?: () => void
}> = ({ to, Icon, children, onLinkClick, alwaysOpen = false }) => {
  const isHome = useStore((state) => state.isHome)
  const use3D = usePersistentStore((state) => state.use3D)

  const [open, setOpen] = useState<boolean>(alwaysOpen || (isHome ?? false))

  const { hoverProps } = useHover({ onHoverChange: (e) => setOpen(e) })
  const { focusProps } = useFocus({ onFocusChange: (e) => setOpen(e) })

  const { originalPath } = usePageContext()

  const active = originalPath!.includes(to)

  const linkStyles: LinkProps = {
    position: 'relative',
    width: ['64px', '64px', 'full'],
    px: '16px',
    py: 4,
    textTransform: 'uppercase',
    transition: 'all ease-out 0.3s',
    fontWeight: 'medium',
    _focus: { outline: 'none' },
    variant:
      open && !alwaysOpen
        ? active
          ? 'navActiveHover'
          : 'navHover'
        : active
        ? 'navActive'
        : 'icon',
    display: 'flex',
    alignItems: 'center',
  }

  return (
    <Link
      to={to}
      {...linkStyles}
      {...hoverProps}
      {...focusProps}
      onClick={() => {
        setOpen(false)
        if (onLinkClick) {
          onLinkClick()
        }
      }}
    >
      <ChakraIcon boxSize={8} as={Icon} />
      <MotionBox
        display="flex"
        position="absolute"
        left="100%"
        h="100%"
        alignItems="center"
        overflow="hidden"
        bg="inherit"
        w={0}
        variants={{
          open: {
            width: alwaysOpen ? '100vw' : 'calc(36rem / 4)',
            paddingLeft: '0.5rem',
            transition: {
              initial: false,
              duration: 0.2,
              delay: isHome && use3D ? 2 : 0,
            },
          },
          closed: {
            width: 0,
          },
        }}
        animate={alwaysOpen || isHome || open ? 'open' : 'closed'}
      >
        {children}
      </MotionBox>
    </Link>
  )
}

const Nav: React.FC<{ alwaysOpen?: boolean; onLinkClick?: () => void }> = ({
  alwaysOpen = false,
  onLinkClick,
}) => {
  const { t } = useTranslation('common')
  const { colorMode } = useColorMode()

  return (
    <MotionBox
      display="flex"
      fontSize="xl"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
      w="full"
      color={colorMode === 'dark' ? 'amethyst.50' : 'amethyst.900'}
    >
      <NavLink
        to="/about"
        Icon={BiUser}
        alwaysOpen={alwaysOpen}
        onLinkClick={onLinkClick}
      >
        {t('sections.about')}
      </NavLink>
      <NavLink
        to="/works"
        Icon={BiBriefcase}
        alwaysOpen={alwaysOpen}
        onLinkClick={onLinkClick}
      >
        {t('sections.works')}
      </NavLink>
      <NavLink
        to="/contact"
        Icon={BiMessageDetail}
        alwaysOpen={alwaysOpen}
        onLinkClick={onLinkClick}
      >
        {t('sections.contact')}
      </NavLink>
    </MotionBox>
  )
}

export default Nav
