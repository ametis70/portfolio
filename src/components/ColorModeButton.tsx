import { BiMoon, BiSun } from 'react-icons/bi'
import { useColorMode } from '@chakra-ui/react'

import CollapsibleNavButton from './CollapsibleNavButton'
import useI18Next from '../hooks/useI18Next'

const ColorModeButton: React.FC = () => {
  const { t } = useI18Next('common')

  const { colorMode, toggleColorMode } = useColorMode()
  const dark = colorMode === 'dark'
  return (
    <CollapsibleNavButton
      onClick={() => toggleColorMode()}
      ariaLabel={t('ui.switch_to', {
        what: dark
          ? t('ui.dark_mode', { ns: 'common' })
          : t('ui.light_mode', { ns: 'common' }),
      })}
      Icon={dark ? BiMoon : BiSun}
      label={
        dark ? t('ui.dark_mode', { ns: 'common' }) : t('ui.light_mode', { ns: 'common' })
      }
    />
  )
}

export default ColorModeButton
