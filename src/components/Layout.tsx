import { useEffect } from 'react'
import { PageProps } from 'gatsby'
import { AnimatePresence } from 'framer-motion'
import { Flex } from '@chakra-ui/react'

import Header from './Header'
import Canvas from './Canvas'
import DisplayCanvas from './DisplayCanvas'
import ChildrenContainer from './ChildrenContainer'

import useStore from '../store'
import { PageContextProvider } from '../hooks/usePageContext'
import useCommonTranslations from '../hooks/useCommonTranslations'

import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'
import '@fontsource/montserrat/600.css'

const Layout: React.FC<PageProps<null, PageContext>> = ({
  path,
  children,
  pageContext,
}) => {
  useCommonTranslations()
  const setHome = useStore((state) => state.setHome)

  const { originalPath } = pageContext

  useEffect(() => {
    if (originalPath === '/') setHome(true)
    else setHome(false)
  }, [originalPath])

  return (
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
  )
}

export default Layout
