import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import commonEn from '../cms/en/common.json'
import commonEs from '../cms/es/common.json'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  debug: process.env.NODE_ENV === 'production' ? false : true,
  nsSeparator: false,
  interpolation: {
    escapeValue: false,
  },
  resources: {},
})

i18n.addResourceBundle('en', 'common', commonEn)
i18n.addResourceBundle('es', 'common', commonEs)

export default i18n
