import { useEffect } from 'react'
import { PageProps } from 'gatsby'
import { AnimatePresence } from 'framer-motion'
import { Flex } from '@chakra-ui/react'

import Header from './Header'
import Canvas from './Canvas'
import DisplayCanvas from './DisplayCanvas'
import ChildrenContainer from './ChildrenContainer'

import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'

import useStore from '../store'

const Layout: React.FC<PageProps> = ({ children, path }) => {
  const setHome = useStore((state) => state.setHome)

  useEffect(() => {
    if (path === '/') setHome(true)
    else setHome(false)
  }, [path])

  console.log(path)

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
            key={path}
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
