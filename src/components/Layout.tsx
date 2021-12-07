import { useEffect, useState } from 'react'
import { PageProps } from 'gatsby'
import { AnimatePresence, motion } from 'framer-motion'
import { Flex } from '@chakra-ui/react'

import Header from './Header'
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
import SimpleBackground from './SimpleBackground'
import MobileHeader from './MobileHeader'

let CanvasModule: React.FC | undefined

const Layout: React.FC<PageProps<null, PageContext>> = ({
  path,
  children,
  pageContext,
}) => {
  useCommonTranslations()
  const setHome = useStore((state) => state.setHome)
  const use3D = usePersistentStore((state) => state.use3D)
  const toggleUse3D = usePersistentStore((state) => state.toggleUse3D)
  const [loadedCanvas, setLoadedCanvas] = useState<boolean>(false)

  const { originalPath } = pageContext

  useEffect(() => {
    if (process.env.GATSBY_DISABLE_3D === 'true' && use3D) {
      toggleUse3D()
    }
  }, [use3D, toggleUse3D])

  useEffect(() => {
    if (originalPath === '/') setHome(true)
    else setHome(false)
  }, [setHome, originalPath])

  useEffect(() => {
    if (use3D && !loadedCanvas) {
      import('./Canvas').then((i) => {
        CanvasModule = i.default
        setLoadedCanvas(true)
      })
    }
  }, [use3D, loadedCanvas])

  useEffect(() => {
    const setDocHeight = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`)
    }

    setDocHeight()
    // window.addEventListener('resize', function () {
    //  setDocHeight()
    // })
    window.addEventListener('orientationchange', function () {
      setDocHeight()
    })
  }, [])

  if (process.env.GATSBY_DISABLE_3D === 'true' && use3D) {
    return null
  }

  return (
    <PageContextProvider pageContext={pageContext}>
      <Flex
        w="100%"
        minH="calc(100 * var(--vh))"
        alignContent="flex-start"
        justifyContent="flex-start"
      >
        <Header />
        <MobileHeader />

        <SimpleBackground key="2d-bg" />
        <AnimatePresence>
          {use3D && loadedCanvas && CanvasModule ? <CanvasModule key="3d-bg" /> : null}
        </AnimatePresence>

        <AnimatePresence>
          {originalPath === '/' ? (
            <IndexPage key="/" />
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
