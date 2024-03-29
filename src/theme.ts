import { extendTheme } from '@chakra-ui/react'

const fontFamilies = 'Montserrat, system-ui, sans-serif'
const amethyst = {
  '50-70': 'rgba(250,247,252, 0.7)',
  '50-50': 'rgba(250,247,252, 0.5)',
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
  '900-50': 'rgba(75, 50, 100, 0.5)',
  '900-70': 'rgba(75, 50, 100, 0.7)',
  'light-gradient': 'linear-gradient(0, rgba(250,247,252, 1), rgba(250,247,252, 0))',
  'dark-gradient': 'linear-gradient(0, rgba(75, 50, 100, 1), rgba(75, 50, 100, 0))',
}

const smallCaps = {
  fontVariantCaps: 'all-small-caps',
}

const ctaVariant = (props) => ({
  fontWeight: 'medium',
  mx: 'auto',
  textAlign: 'center',
  display: 'block',
  height: 'fit-content',
  px: 6,
  py: 4,
  textDecoration: 'none',
  bg: props.colorMode === 'dark' ? 'amethyst.50' : 'amethyst.900',
  color: props.colorMode === 'dark' ? 'amethyst.900' : 'amethyst.50',
  _hover: {
    textDecoration: 'none',
    bg: props.colorMode === 'dark' ? 'amethyst.200' : 'amethyst.700',
  },
})

const workMainLink = {
  textAlign: 'center',
  textStyle: 'smallCaps',
  fontSize: 'lg',
  px: 2,
  flex: '0 1 50%',
  h: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  py: 4,
  textDecoration: 'none',
}

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: true,
  },
  radii: {
    none: 0,
  },
  shadows: {
    outline: '0 0 0 4px rgba(153, 102, 204, 0.8)',
    darkOutline: '0 0 0 4px rgba(184, 148, 219, 0.8)',
  },
  layerStyles: {
    container: {
      px: [6, 6, 12],
      w: '100%',
      mx: 0,
    },
  },
  textStyles: {
    smallCaps: {
      fontVariantCaps: 'all-small-caps',
      fontWeight: 'semiBold',
    },
  },
  components: {
    Textarea: {
      variants: {
        default: (props) => ({
          fontWeight: 'medium',
          borderRadius: 'none',
          color: props.colorMode === 'dark' ? 'amethyst.50' : 'amethyst.900',
          background: props.colorMode === 'dark' ? 'amethyst.700' : 'amethyst.5',
          _focus: {
            boxShadow: props.colorMode === 'dark' ? 'darkOutline' : 'outline',
          },
        }),
      },
      sizes: {
        default: (props) => ({
          borderRadius: 'none',
        }),
      },
      defaultProps: {
        variant: 'default',
        sizes: 'default',
      },
    },
    FormLabel: {
      baseStyle: (props) => ({
        color: props.colorMode === 'dark' ? 'amethyst.50-70' : 'amethyst.900-70',
        mb: 1,
        fontSize: 'sm',
        _invalid: {
          color: props.colorMode === 'dark' ? 'red.300' : 'red.500',
        },
      }),
    },
    Input: {
      variants: {
        default: (props) => ({
          field: {
            fontWeight: 'medium',
            borderRadius: 'none',
            color: props.colorMode === 'dark' ? 'amethyst.50' : 'amethyst.900',
            background: props.colorMode === 'dark' ? 'amethyst.700' : 'amethyst.5',
            _invalid: {
              color: 'red.500',
            },
            _focus: {
              boxShadow: props.colorMode === 'dark' ? 'darkOutline' : 'outline',
            },
          },
        }),
      },
      sizes: {
        default: (props) => ({
          field: {
            borderRadius: 'none',
          },
        }),
      },
      defaultProps: {
        variant: 'default',
        sizes: 'default',
      },
    },
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
        galleryHeading: (props) => ({
          ...smallCaps,
          textAlign: 'center',
          color: props.colorMode === 'dark' ? 'amethyst.50-70' : 'amethyst.900-70',
          pb: 4,
          size: 'md',
        }),
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
        error: (props) => ({
          textAlign: 'center',
          color: props.colorMode === 'dark' ? 'red.300' : 'red.500',
          fontSize: 'sm',
        }),
      },
    },
    Link: {
      baseStyle: (props) => ({
        color: props.colorMode === 'dark' ? 'amethyst.400' : 'amethyst.500',
        textDecoration: 'none',
        _hover: {
          textDecoration: 'none',
        },
        _focus: {
          boxShadow: props.colorMode === 'dark' ? 'darkOutline' : 'outline',
        },
      }),
      variants: {
        body: (props) => ({
          color: props.colorMode === 'dark' ? 'amethyst.400' : 'amethyst.500',
          textDecoration: props.colorMode === 'dark' ? 'underline' : 'none',
        }),
        icon: (props) => ({
          color: props.colorMode === 'dark' ? 'amethyst.50' : 'amethyst.900',
          background: 'inherit',
          display: 'block',
          w: 'fit-content',
          h: 'fit-content',
          outline: 'none',
          _focus: {
            outline: 'none',
            boxShadow: 'none',
            background: props.colorMode === 'dark' ? 'amethyst.800' : 'amethyst.200',
          },
          _hover: {
            background: props.colorMode === 'dark' ? 'amethyst.800' : 'amethyst.200',
          },
        }),
        navHover: (props) => ({
          color: props.colorMode === 'dark' ? 'amethyst.50' : 'amethyst.900',
          background: props.colorMode === 'dark' ? 'amethyst.800' : 'amethyst.200',
        }),
        navActive: (props) => ({
          color: props.colorMode === 'dark' ? 'amethyst.900' : 'amethyst.50',
          background: props.colorMode === 'dark' ? 'amethyst.50' : 'amethyst.900',
        }),
        navActiveHover: (props) => ({
          color: props.colorMode === 'dark' ? 'amethyst.900' : 'amethyst.50',
          background: props.colorMode === 'dark' ? 'amethyst.200' : 'amethyst.800',
        }),
        back: (props) => ({
          color: props.colorMode === 'dark' ? 'amethyst.50-70' : 'amethyst.900-70',
          textDecoration: 'none',
          display: 'flex',
          textStyle: 'smallCaps',
          fontSize: 'lg',
          alignItems: 'center',
          _hover: {
            textDecoration: 'none',
            opacity: 0.8,
          },
        }),

        center: {
          display: 'block',
          width: 'fit-content',
          mx: 'auto',
          textAlign: 'center',
        },
        cta: ctaVariant,
        workCta: (props) => ({
          ...workMainLink,
          bg: props.colorMode === 'dark' ? 'amethyst.50' : 'amethyst.900',
          color: props.colorMode === 'dark' ? 'amethyst.900' : 'amethyst.50',
          _hover: {
            textDecoration: 'none',
            bg: props.colorMode === 'dark' ? 'amethyst.200' : 'amethyst.700',
          },
        }),
        workSecondary: (props) => ({
          ...workMainLink,
          outlineWidth: '3px',
          outlineOffset: '-3px',
          outlineColor: props.colorMode === 'dark' ? 'amethyst.50' : 'amethyst.900',
          color: props.colorMode === 'dark' ? 'amethyst.50' : 'amethyst.900',
          _hover: {
            textDecoration: 'none',
            bg: props.colorMode === 'dark' ? 'amethyst.900-50' : 'amethyst.50-50',
          },
        }),
      },
    },
    Button: {
      baseStyle: (props) => ({
        borderRadius: 0,
        _focus: {
          boxShadow: props.colorMode === 'dark' ? 'darkOutline' : 'outline',
        },
      }),
      variants: {
        cta: ctaVariant,
        navHover: (props) => ({
          color: props.colorMode === 'dark' ? 'amethyst.50' : 'amethyst.900',
          background: props.colorMode === 'dark' ? 'amethyst.800' : 'amethyst.200',
        }),
        navButton: (props) => ({
          color: props.colorMode === 'dark' ? 'amethyst.50-50' : 'amethyst.900-50',
          background: 'inherit',
        }),
      },
    },
    List: {
      variants: {
        tagList: (props) => ({
          container: {
            display: 'flex',
            flexWrap: 'wrap',
            listStyleType: 'none',
            justifyContent: 'center',
          },
          item: {
            bg: props.colorMode === 'dark' ? 'amethyst.800' : 'amethyst.100',
            color: props.colorMode === 'dark' ? 'amethyst.50-70' : 'amethyst.900-70',
            fontSize: 'sm',
            w: 'fit-content',
            px: 3,
            py: 1,
            m: 1,
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
      lighter: 'rgba(250, 247, 252, 0.95)',
      darker: 'rgba(75, 50, 100, 0.98)',
      fadeLight: 'rgba(250, 247, 252, 0)',
      fadeDark: 'rgba(75, 50, 100, 0)',
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
        w: '100%',
      },
    }),
  },
})

export default theme
