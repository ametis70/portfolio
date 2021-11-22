import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

export const languges = ['es', 'en']
export const defaultLanguage = 'es'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'production' ? false : true,
  nsSeparator: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {},
})

export default i18n
