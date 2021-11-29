import { useState } from 'react'
import { Icon as ChakraIcon, useColorMode, useTheme } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BiUser, BiBriefcase, BiMessageDetail } from 'react-icons/bi'
import { useFocus, useHover } from '@react-aria/interactions'

import MotionBox from './MotionBox'
import Link, { LinkProps } from './Link'

import { usePageContext } from '../hooks/usePageContext'
import useStore from '../store'

const NavLink: React.FC<{ to: string; Icon: React.FC }> = ({ to, Icon, children }) => {
  const isHome = useStore((state) => state.isHome)
  const [open, setOpen] = useState<boolean>(isHome ?? false)

  const { hoverProps } = useHover({ onHoverChange: (e) => setOpen(e) })
  const { focusProps } = useFocus({ onFocusChange: (e) => setOpen(e) })

  const { originalPath } = usePageContext()
  const { colorMode } = useColorMode()
  const { colors } = useTheme()

  const active = originalPath!.includes(to)

  const linkStyles: Partial<LinkProps> = {
    position: 'relative',
    width: 'full',
    px: '16px',
    py: 4,
    textTransform: 'uppercase',
    transition: 'all ease-in-out 0.2s',
    fontWeight: 'medium',
    _focus: { outline: 'none' },
    variant: open
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
      onClick={() => setOpen(false)}
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
            width: 'calc(36rem / 4)',
            paddingLeft: '0.5rem',
            transition: {
              initial: false,
              duration: 0.2,
              delay: isHome ? 2 : 0,
            },
          },
          closed: {
            width: 0,
          },
        }}
        animate={isHome || open ? 'open' : 'closed'}
      >
        {children}
      </MotionBox>
    </Link>
  )
}

const Nav: React.FC = () => {
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
      <NavLink to="/about" Icon={BiUser}>
        {t('sections.about')}
      </NavLink>
      <NavLink to="/works" Icon={BiBriefcase}>
        {t('sections.works')}
      </NavLink>
      <NavLink to="/contact" Icon={BiMessageDetail}>
        {t('sections.contact')}
      </NavLink>
    </MotionBox>
  )
}

export default Nav
