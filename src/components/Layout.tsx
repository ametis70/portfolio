import { useEffect } from 'react'
import { PageProps } from 'gatsby'
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion'

import MotionBox from '../components/MotionBox'
import Header from './Header'
import Canvas from './Canvas'
import DisplayCanvas from './DisplayCanvas'
import ChildrenContainer from './ChildrenContainer'

import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/500.css'

import useStore from '../store'

const Layout: React.FC<PageProps> = ({ children, path }) => {
  const setHome = useStore((state) => state.setHome)
  const isHome = useStore((state) => state.isHome)

  useEffect(() => {
    if (path === '/') setHome(true)
    else setHome(false)
  }, [path])

  return (
    <>
      <Canvas />
      <AnimateSharedLayout>
        <MotionBox
          animate={isHome ? 'home' : 'top'}
          minH="100vh"
          w="100%"
          display="flex"
          flexDirection="column"
        >
          <Header key="header" />

          <ChildrenContainer>
            <AnimatePresence>{children}</AnimatePresence>
          </ChildrenContainer>
        </MotionBox>
      </AnimateSharedLayout>
      <DisplayCanvas />
    </>
  )
}

export default Layout
