import { navigate } from 'gatsby'
import { BiSquare, BiCube, BiMoon, BiSun, BiGlobe } from 'react-icons/bi'
import { Flex, useColorMode } from '@chakra-ui/react'
import shallow from 'zustand/shallow'

import Collapsibles from './Collapsibles'

import usePersistentStore from '../../store/persistent'
import useI18Next from '../../hooks/useI18Next'
import { usePageContext } from '../../hooks/usePageContext'

type SettingsButtonProps = {
  open?: boolean
}

const BackgroundSwitcher: React.FC<SettingsButtonProps> = ({ open }) => {
  const { t } = useI18Next('common')
  const { use3D, toggleUse3D } = usePersistentStore(
    (state) => ({ use3D: state.use3D, toggleUse3D: state.toggleUse3D }),
    shallow,
  )

  if (process.env.GATSBY_DISABLE_3D === 'true') {
    return null
  }

  return (
    <Collapsibles.Button
      onClick={() => toggleUse3D()}
      ariaLabel={t('ui.switch_to', {
        ns: 'common',
        what: use3D
          ? t('ui.3d_background', { ns: 'common' })
          : t('ui.2d_background', { ns: 'common' }),
      })}
      Icon={use3D ? BiCube : BiSquare}
      label={
        use3D
          ? t('ui.3d_background', { ns: 'common' })
          : t('ui.2d_background', { ns: 'common' })
      }
      open={open}
    />
  )
}

const ColorModeButton: React.FC<SettingsButtonProps> = ({ open }) => {
  const { t } = useI18Next('common')

  const { colorMode, toggleColorMode } = useColorMode()
  const dark = colorMode === 'dark'
  return (
    <Collapsibles.Button
      onClick={() => toggleColorMode()}
      ariaLabel={t('ui.switch_to', {
        ns: 'common',
        what: dark
          ? t('ui.dark_mode', { ns: 'common' })
          : t('ui.light_mode', { ns: 'common' }),
      })}
      Icon={dark ? BiMoon : BiSun}
      label={
        dark ? t('ui.dark_mode', { ns: 'common' }) : t('ui.light_mode', { ns: 'common' })
      }
      open={open}
    />
  )
}

const LanguageSwitcherButton: React.FC<SettingsButtonProps> = ({ open }) => {
  const { t } = useI18Next('common')
  const { originalPath, language } = usePageContext()

  const spanish = language === 'es'

  const switchLanguage = () => {
    if (originalPath) {
      navigate(spanish ? originalPath : `/es${originalPath}`)
    }
  }

  return (
    <Collapsibles.Button
      onClick={() => switchLanguage()}
      ariaLabel={t('ui.switch_language_to', {
        language: spanish
          ? t('languages.english', { ns: 'common' })
          : t('languages.spanish', { ns: 'common' }),
        ns: 'common',
      })}
      Icon={BiGlobe}
      label={
        spanish
          ? t('languages.spanish', { ns: 'common' })
          : t('languages.english', { ns: 'common' })
      }
      open={open}
    />
  )
}

const Settings: React.FC<SettingsButtonProps> = ({ open }) => {
  return (
    <Flex h="100%" direction="column" alignItems="flex-start" justify="flex-end" pb={2}>
      <BackgroundSwitcher open={open} />
      <LanguageSwitcherButton open={open} />
      <ColorModeButton open={open} />
    </Flex>
  )
}

export default Settings
