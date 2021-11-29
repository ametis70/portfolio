import { navigate } from 'gatsby'
import { BiGlobe } from 'react-icons/bi'
import { Text, Button } from '@chakra-ui/react'
import useI18Next from '../hooks/useI18Next'
import { usePageContext } from '../hooks/usePageContext'

const LanguageSwitcherButton: React.FC = () => {
  const { originalPath, language } = usePageContext()
  const { t } = useI18Next('common')

  const spanish = language === 'es'

  const switchLanguage = () => {
    if (originalPath) {
      navigate(spanish ? originalPath : `/es${originalPath}`)
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
      aria-label={t('ui.switch_language_to', {
        language: spanish
          ? t('languages.english', { ns: 'common' })
          : t('languages.spanish', { ns: 'common' }),
        ns: 'common',
      })}
      leftIcon={<BiGlobe />}
      iconSpacing={6}
      fontSize="xl"
      textTransform="uppercase"
    >
      <Text fontSize="sm">
        {spanish
          ? t('languages.spanish', { ns: 'common' })
          : t('languages.english', { ns: 'common' })}
      </Text>
    </Button>
  )
}

export default LanguageSwitcherButton
