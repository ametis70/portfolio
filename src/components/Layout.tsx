import { useEffect } from 'react'
import { PageProps } from 'gatsby'
import { AnimatePresence } from 'framer-motion'
import { Flex } from '@chakra-ui/react'

import { I18NextContext } from '@ianmethyst/gatsby-plugin-react-i18next/dist/types'

import Header from './Header'
import Canvas from './Canvas'
import DisplayCanvas from './DisplayCanvas'
import ChildrenContainer from './ChildrenContainer'

import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'

import useStore from '../store'
import { I18nextProvider } from 'react-i18next'
import i18n from '../i18n'

const Layout: React.FC<PageProps<null, { i18n: I18NextContext }>> = ({
  path,
  children,
  pageContext,
}) => {
  const setHome = useStore((state) => state.setHome)

  const { originalPath } = pageContext.i18n

  useEffect(() => {
    if (originalPath === '/') setHome(true)
    else setHome(false)
  }, [originalPath])

  return (
    <I18nextProvider i18n={i18n}>
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
    </I18nextProvider>
  )
}

export default Layout
