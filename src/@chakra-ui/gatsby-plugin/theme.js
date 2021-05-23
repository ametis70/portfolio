import { extendTheme } from '@chakra-ui/react'

const fontFamilies = 'Montserrat, system-ui, sans-serif'
const amethyst = {
  50: '#FAF7FC',
  100: '#F5F0FA',
  200: '#E6D9F2',
  300: '#D6C2EB',
  400: '#B894DB',
  500: '#9966CC',
  600: '#8A5CB8',
  700: '#734D99',
  800: '#5C3D7A',
  900: '#4B3264',
}

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
  colors: {
    amethyst,
  },
  fonts: {
    body: fontFamilies,
    heading: fontFamilies,
    mono: 'monospace',
  },
  styles: {
    global: (props) => ({
      'html, body': {
        color: props.colorMode === 'dark' ? 'amethyst.50' : 'amethyst.900',
        bg: props.colorMode === 'dark' ? 'amethyst.900' : 'amethyst.50',
        fontFamily: 'body',
        width: '100%',
        minHeight: '100vh',
      },
    }),
  },
})

export default theme
