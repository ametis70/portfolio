import { useEffect } from 'react'
import { PageProps } from 'gatsby'
import { AnimatePresence } from 'framer-motion'
import { Flex } from '@chakra-ui/react'
import { I18nextProvider } from 'react-i18next'

import Header from './Header'
import Canvas from './Canvas'
import DisplayCanvas from './DisplayCanvas'
import ChildrenContainer from './ChildrenContainer'

import useStore from '../store'
import i18n from '../i18n'
import { PageContextProvider } from '../hooks/usePageContext'

import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'

const Layout: React.FC<PageProps<null, PageContext>> = ({
  path,
  children,
  pageContext,
}) => {
  const setHome = useStore((state) => state.setHome)

  const { originalPath } = pageContext

  useEffect(() => {
    if (originalPath === '/') setHome(true)
    else setHome(false)
  }, [originalPath])

  return (
    <I18nextProvider i18n={i18n}>
      <PageContextProvider pageContext={pageContext}>
        <Canvas />
        <Flex minH="100vh" w="100%" alignContent="flex-start" justifyContent="flex-start">
          <Header key="header" />

          <AnimatePresence exitBeforeEnter>
            <ChildrenContainer
              exit={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
              key={path}
            >
              {children}
            </ChildrenContainer>
          </AnimatePresence>
        </Flex>
        <DisplayCanvas />
      </PageContextProvider>
    </I18nextProvider>
  )
}

export default Layout
