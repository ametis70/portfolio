import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import theme from '../theme'
import Header from './Header'

const Index: React.FC = ({ children }) => {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Header />
      {children}
    </ChakraProvider>
  )
}

export default Index
