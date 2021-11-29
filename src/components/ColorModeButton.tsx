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
      aria-label={t('ui.switch_to', {
        what: dark
          ? t('ui.dark_mode', { ns: 'common' })
          : t('ui.light_mode', { ns: 'common' }),
      })}
      onClick={toggleColorMode}
      leftIcon={dark ? <BiMoon /> : <BiSun />}
      iconSpacing={6}
      fontSize="xl"
      textTransform="uppercase"
    >
      <Text fontSize="sm">
        {dark
          ? t('ui.dark_mode', { ns: 'common' })
          : t('ui.light_mode', { ns: 'common' })}
      </Text>
    </Button>
  )
}

export default ColorModeButton
