import { navigate } from 'gatsby'
import { BiGlobe } from 'react-icons/bi'
import { Text, Button, useColorMode } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { useLocation } from '@reach/router'
import useI18NextConfig from '../hooks/useI18NextConfig'

const LanguageSwitcherButton: React.FC = () => {
  const { i18n } = useTranslation()
  const location = useLocation()

  const { defaultLanguage, languages } = useI18NextConfig()

  const spanish = i18n.language === 'es'

  const switchLanguage = () => {
    spanish ? i18n.changeLanguage('en') : i18n.changeLanguage('es')
    const langPart = location.pathname.split('/')[1]

    if (i18n.language === defaultLanguage) {
      console.log({ langPart })
      if (languages.some((l) => l === langPart)) {
        const routeWithoutLang = location.pathname.slice(3, location.pathname.length)
        navigate(routeWithoutLang)
      }
    } else {
      if (location.pathname.slice(0, 3) !== `/${i18n.language}`) {
        navigate(`/${i18n.language}${location.pathname}`)
      }
    }
  }

  return (
    <Button
      variant="ghost"
      colorScheme="amethyst"
      opacity="0.5"
      px={3}
      fontWeight="regular"
      onClick={() => switchLanguage()}
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
