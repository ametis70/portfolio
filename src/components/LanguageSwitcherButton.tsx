import { BiGlobe } from 'react-icons/bi'
import { Text, Button, useColorMode } from '@chakra-ui/react'
import { useI18next } from 'gatsby-plugin-react-i18next'

const LanguageSwitcherButton: React.FC = () => {
  const { colorMode } = useColorMode()
  const { changeLanguage, language } = useI18next()

  const dark = colorMode === 'dark'
  const spanish = language === 'es'

  return (
    <Button
      variant="ghost"
      colorScheme="amethyst"
      opacity="0.5"
      px={3}
      fontWeight="regular"
      onClick={() => (spanish ? changeLanguage('en') : changeLanguage('es'))}
      aria-label={'Cambiar idioma'}
      leftIcon={<BiGlobe />}
      iconSpacing={6}
      fontSize="xl"
      textTransform="uppercase"
    >
      <Text fontSize="sm">{spanish ? 'Español' : 'Inglés'}</Text>
    </Button>
  )
}

export default LanguageSwitcherButton
