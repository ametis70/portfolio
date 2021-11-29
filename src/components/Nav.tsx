import { Icon as ChakraIcon, Text, useColorMode, useTheme } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BiUser, BiBriefcase, BiMessageDetail } from 'react-icons/bi'

import MotionBox from './MotionBox'
import Link, { LinkProps } from './Link'

import { usePageContext } from '../hooks/usePageContext'

const NavLink: React.FC<{ to: string; Icon: React.FC }> = ({ to, Icon, children }) => {
  const { originalPath } = usePageContext()
  const { colorMode } = useColorMode()
  const { colors } = useTheme()

  const active = originalPath!.includes(to)

  const linkStyles: Partial<LinkProps> = {
    width: 'full',
    px: '16px',
    py: 4,
    textTransform: 'uppercase',
    transition: 'all ease-in-out 0.2s',
    fontWeight: 'medium',
    variant: 'icon',
    display: 'flex',
    alignItems: 'center',
    bg: active
      ? colorMode === 'dark'
        ? colors.amethyst['50']
        : colors.amethyst['900']
      : undefined,
    color: active
      ? colorMode === 'dark'
        ? colors.amethyst['900']
        : colors.amethyst['50']
      : undefined,
    _hover: {
      bg: active
        ? colorMode === 'dark'
          ? colors.amethyst['100']
          : colors.amethyst['800']
        : colorMode === 'dark'
        ? colors.amethyst['800']
        : colors.amethyst['100'],
    },
  }

  return (
    <Link to={to} {...linkStyles}>
      <ChakraIcon boxSize={8} as={Icon} />
      <Text pl={6}>{children}</Text>
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
      fontWeight="200"
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
