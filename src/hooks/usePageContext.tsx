import { useContext, createContext, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

const PageContext = createContext<Partial<PageContext>>({})

export const PageContextProvider = ({ pageContext, children }) => {
  const { i18n } = useTranslation()
  useEffect(() => {
    if (i18n.language !== pageContext.language) {
      i18n.changeLanguage(pageContext.language)
    }
  }, [i18n.language, pageContext.language])

  return <PageContext.Provider value={pageContext}>{children}</PageContext.Provider>
}

export const usePageContext = () => useContext(PageContext)
