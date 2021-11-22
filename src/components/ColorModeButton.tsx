import { BiMoon, BiSun } from 'react-icons/bi'
import { Text, Button, useColorMode } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'

const ColorModeButton: React.FC = () => {
  const { t } = useTranslation('common')
  const { colorMode, toggleColorMode } = useColorMode()
  const dark = colorMode === 'dark'
  return (
    <Button
      variant="ghost"
      colorScheme="amethyst"
      opacity="0.5"
      px={3}
      fontWeight="regular"
      aria-label={t('ui.switch_color_mode_specific', {
        mode: dark ? t('ui.dark_mode') : t('ui.light_mode'),
      })}
      onClick={toggleColorMode}
      leftIcon={dark ? <BiMoon /> : <BiSun />}
      iconSpacing={6}
      fontSize="xl"
      textTransform="uppercase"
    >
      <Text fontSize="sm">{dark ? t('ui.dark_mode') : t('ui.light_mode')}</Text>
    </Button>
  )
}

export default ColorModeButton
