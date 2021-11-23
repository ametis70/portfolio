import { I18nextProvider } from 'react-i18next'
import { ChakraProvider } from '@chakra-ui/react'

import i18n from '../i18n'
import theme from '../theme'

const Root: React.FC<{ element: JSX.Element }> = ({ element }) => {
  return (
    <ChakraProvider theme={theme} resetCSS portalZIndex={40}>
      <I18nextProvider i18n={i18n}>{element}</I18nextProvider>
    </ChakraProvider>
  )
}

export default Root
