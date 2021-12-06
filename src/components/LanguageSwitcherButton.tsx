import { navigate } from 'gatsby'
import { BiGlobe } from 'react-icons/bi'

import CollapsibleNavButton, { CollapsibleButtonProps } from './CollapsibleNavButton'

import useI18Next from '../hooks/useI18Next'
import { usePageContext } from '../hooks/usePageContext'

const LanguageSwitcherButton: React.FC<Partial<CollapsibleButtonProps>> = ({
  alwaysOpen = false,
}) => {
  const { t } = useI18Next('common')
  const { originalPath, language } = usePageContext()

  const spanish = language === 'es'

  const switchLanguage = () => {
    if (originalPath) {
      navigate(spanish ? originalPath : `/es${originalPath}`)
    }
  }

  return (
    <CollapsibleNavButton
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
      alwaysOpen={alwaysOpen}
    />
  )
}

export default LanguageSwitcherButton
