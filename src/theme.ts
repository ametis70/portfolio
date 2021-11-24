import { extendTheme } from '@chakra-ui/react'

const fontFamilies = 'Montserrat, system-ui, sans-serif'
const amethyst = {
  '50-70': 'rgba(250,247,252, 0.7)',
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
  '900-70': 'rgba(75, 50, 100, 0.7)',
}

const smallCaps = {
  textTransform: 'lowercase',
  fontVariant: 'small-caps',
  fontFeatureSettings: '"smcp"',
}

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
  components: {
    Divider: {
      baseStyle: (props) => ({
        borderColor: props.colorMode === 'dark' ? 'amethyst.700' : 'amethyst.300',
      }),
    },
    Heading: {
      baseStyle: {
        letterSpacing: '0.065em',
        fontWeight: 'medium',
      },
      variants: {
        smallcaps: {
          fontWeight: 'semiBold',
          ...smallCaps,
        },
      },
      sizes: {
        sectionTitle: {
          fontSize: '3xl',
        },
        cardTitle: {
          fontSize: 'xl',
        },
      },
    },
    Text: {
      baseStyle: {
        letterSpacing: '0.065em',
        fontWeight: 'medium',
      },
      variants: {
        cardAlt: (props) => ({
          color: props.colorMode === 'dark' ? 'amethyst.50-70' : 'amethyst.900-70',
          fontWeight: 'medium',
        }),
      },
    },
    Link: {
      baseStyle: (props) => ({
        color: props.colorMode === 'dark' ? 'amethyst.400' : 'amethyst.500',
        textDecoration: props.colorMode === 'dark' ? 'underline' : 'none',
      }),
      variants: {
        textColor: (props) => ({
          color: props.colorMode === 'dark' ? 'amethyst.900' : 'amethyst.50',
        }),
        icon: (props) => ({
          color: props.colorMode === 'dark' ? 'amethyst.50' : 'amethyst.900',
          textDecoration: 'none',
          _hover: {
            background: props.colorMode === 'dark' ? 'amethyst.800' : 'amethyst.200',
          },
        }),
        center: {
          display: 'block',
          mx: 'auto',
          textAlign: 'center',
        },
        cta: (props) => ({
          mx: 'auto',
          textAlign: 'center',
          display: 'block',
          px: 4,
          py: 4,
          textDecoration: 'none',
          bg: props.colorMode === 'dark' ? 'amethyst.50' : 'amethyst.900',
          color: props.colorMode === 'dark' ? 'amethyst.900' : 'amethyst.50',
          _hover: {
            textDecoration: 'none',
            bg: props.colorMode === 'dark' ? 'amethyst.200' : 'amethyst.700',
          },
        }),
      },
    },
  },
  colors: {
    amethyst,
    overlay: {
      light: 'rgba(250, 247, 252, 0.80)',
      dark: 'rgba(75, 50, 100, 0.80)',
    },
  },
  fonts: {
    body: fontFamilies,
    heading: fontFamilies,
    mono: 'monospace',
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semiBold: 600,
  },
  styles: {
    global: (props) => ({
      'html, body': {
        color: props.colorMode === 'dark' ? 'amethyst.50' : 'amethyst.900',
        bg: props.colorMode === 'dark' ? 'amethyst.900' : 'amethyst.50',
        fontFamily: 'body',
        fontWeight: 'medium',
        letterSpacing: '0.065em',
        width: '100%',
        minHeight: '100vh',
      },
    }),
  },
})

export default theme
