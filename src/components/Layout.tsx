import { useEffect } from 'react'
import { PageProps } from 'gatsby'
import { AnimatePresence, motion } from 'framer-motion'
import { Flex } from '@chakra-ui/react'

import Header from './Header'
import Canvas from './Canvas'
import ContentBackground from './ContentBackground'
import ContentContainer from './ContentContainer'
import IndexPage from '../pages'

import useStore from '../store'
import usePersistentStore from '../store/persistent'
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
  const use3D = usePersistentStore((state) => state.use3D)

  const { originalPath } = pageContext

  useEffect(() => {
    if (originalPath === '/') setHome(true)
    else setHome(false)
  }, [setHome, originalPath])

  return (
    <PageContextProvider pageContext={pageContext}>
      <Flex minH="100vh" w="100%" alignContent="flex-start" justifyContent="flex-start">
        <Header key="header" />

        <AnimatePresence>
          {use3D ? <Canvas key="3d-bg" /> : null}
          {originalPath === '/' ? (
            <motion.div key="/">
              <IndexPage />
            </motion.div>
          ) : (
            <ContentBackground key="content-background">
              <AnimatePresence exitBeforeEnter>
                <ContentContainer key={path}>{children}</ContentContainer>
              </AnimatePresence>
            </ContentBackground>
          )}
        </AnimatePresence>
      </Flex>
    </PageContextProvider>
  )
}

export default Layout
