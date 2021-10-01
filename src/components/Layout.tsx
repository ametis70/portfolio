import { useEffect } from 'react'
import { useLocation } from '@reach/router'
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion'

import MotionBox from '../components/MotionBox'
import Header from './Header'
import Canvas from './Canvas'
import DisplayCanvas from './DisplayCanvas'

import '@fontsource/montserrat'
import useStore from '../store'

const Layout: React.FC = ({ children }) => {
  const { pathname } = useLocation()
  const setHome = useStore((state) => state.setHome)
  const isHome = useStore((state) => state.isHome)

  useEffect(() => {
    if (pathname === '/') setHome(true)
    else setHome(false)
  }, [pathname])

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
          <AnimatePresence>
            <Header isHome={isHome} />
            {children}
          </AnimatePresence>
        </MotionBox>
      </AnimateSharedLayout>
      <DisplayCanvas />
    </>
  )
}

export default Layout
