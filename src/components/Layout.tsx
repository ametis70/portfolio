import { useEffect } from 'react'
import { PageProps } from 'gatsby'
import { AnimatePresence } from 'framer-motion'
import { Flex } from '@chakra-ui/react'

import { I18NextContext } from 'gatsby-plugin-react-i18next/dist/types'

import Header from './Header'
import Canvas from './Canvas'
import DisplayCanvas from './DisplayCanvas'
import ChildrenContainer from './ChildrenContainer'

import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'

import useStore from '../store'

const Layout: React.FC<PageProps<null, { i18n: I18NextContext }>> = ({
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
    <>
      <Canvas />
      <Flex minH="100vh" w="100%" alignContent="flex-start" justifyContent="flex-start">
        <Header key="header" />

        <AnimatePresence exitBeforeEnter>
          <ChildrenContainer
            exit={{ opacity: 0, width: '100%' }}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            key={originalPath}
          >
            {children}
          </ChildrenContainer>
        </AnimatePresence>
      </Flex>
      <DisplayCanvas />
    </>
  )
}

export default Layout
