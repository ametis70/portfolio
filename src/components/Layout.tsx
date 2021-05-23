import React, { useState, useEffect } from 'react'
import { Image, Box, Heading, Stack } from '@chakra-ui/react'
import { useLocation } from '@reach/router'
import { ChakraProvider } from '@chakra-ui/react'
import { AnimateSharedLayout, AnimatePresence } from 'framer-motion'

import MotionBox from '../components/MotionBox'
import theme from '../theme'
import Header from './Header'

import '@fontsource/montserrat'

const Layout: React.FC = ({ children }) => {
  const { pathname } = useLocation()
  const [isHome, setHome] = useState<boolean>(pathname === '/')

  useEffect(() => {
    if (pathname === '/') setHome(true)
    else setHome(false)
  }, [pathname])

  return (
    <ChakraProvider resetCSS theme={theme}>
      <AnimateSharedLayout>
        <MotionBox
          variants={{ top: {}, home: {} }}
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
    </ChakraProvider>
  )
}

export default Layout
