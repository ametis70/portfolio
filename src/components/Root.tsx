import { I18nextProvider } from 'react-i18next'
import { ChakraProvider } from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'

import i18n from '../i18n'
import theme from '../theme'

const Root: React.FC<{ element: JSX.Element }> = ({ element }) => {
  const methods = useForm()

  return (
    <ChakraProvider theme={theme} resetCSS portalZIndex={40}>
      <I18nextProvider i18n={i18n}>
        <FormProvider {...methods}>{element}</FormProvider>
      </I18nextProvider>
    </ChakraProvider>
  )
}

export default Root
