import { useContext, createContext } from 'react'
import { useTranslation } from 'react-i18next'

const PageContext = createContext<Partial<PageContext>>({})

export const PageContextProvider = ({ pageContext, children }) => {
  const { i18n } = useTranslation()
  i18n.changeLanguage(pageContext.lang)

  return <PageContext.Provider value={pageContext}>{children}</PageContext.Provider>
}

export const usePageContext = () => useContext(PageContext)
