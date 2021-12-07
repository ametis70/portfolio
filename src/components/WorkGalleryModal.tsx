import { useEffect, useRef } from 'react'
import {
  Box,
  Flex,
  Grid,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorMode,
  Text,
} from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { useKeyboard } from '@react-aria/interactions'
import { GatsbyImage } from 'gatsby-plugin-image'
import PrismaZoom from 'react-prismazoom'

import Link from './Link'

const WorkGalleryModal: React.VFC<
  TFunctionProps & {
    data: WorkPageData
    onClose: () => void
    isOpen: boolean
    query: string[] | null
    update: (newValue: string[]) => void
    images: DatoCmsImages
  }
> = ({ t, data, onClose, isOpen, query, update, images }) => {
  const { colors } = useTheme()
  const { colorMode } = useColorMode()

  const selectedImage = useRef<HTMLAnchorElement>(null)

  let currentIndex: number | null = null
  let currentImage: DatoCmsImage | null = null
  if (query && query[0]) {
    currentImage =
      images.find((image, index) => {
        if (image.basename === query[0]) {
          currentIndex = index
          return true
        }
        return false
      }) ?? null
  }

  useEffect(() => {
    if (selectedImage.current) {
      selectedImage.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      })
    }
  }, [selectedImage, selectedImage.current])

  let { keyboardProps } = useKeyboard({
    onKeyDown: (e) => {
      if (currentIndex === null) return

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case 'j':
        case 'l':
          if (currentIndex === images.length - 1) {
            update([images[0].basename])
          } else {
            update([images[currentIndex + 1].basename])
          }

          break

        case 'ArrowLeft':
        case 'ArrowUp':
        case 'k':
        case 'h':
          if (currentIndex - 1 === -1) {
            update([images[images.length - 1].basename])
          } else {
            update([images[currentIndex - 1].basename])
          }
          break
        default:
          e.continuePropagation()
      }
    },
  })

  return (
    <Modal onClose={onClose} size="full" isOpen={isOpen} scrollBehavior="outside">
      <ModalOverlay
        backdropFilter={['none', 'none', 'blur(40px)']}
        backgroundColor="rgba(0, 0, 0, 0.90)"
        h="100vh"
      />
      <ModalContent
        bg="transparent"
        display="flex"
        flexDirection="column"
        h="100vh"
        {...keyboardProps}
      >
        <ModalHeader bg={colorMode === 'dark' ? 'amethyst.900' : 'amethyst.50'}>
          <Grid templateColumns="2fr 1fr" alignItems="center">
            <Heading as="h3" fontSize="xl">
              {`${data.title} — ${t('ui.gallery', { ns: 'common' })}`}
            </Heading>
            <Flex justify="flex-end">
              <Text
                fontSize="sm"
                lineHeight="2.5"
                color={colorMode === 'dark' ? 'amethyst.50-70' : 'amethyst.900-70'}
                pr={4}
              >
                {currentIndex !== null ? `${currentIndex + 1} / ${images.length}` : null}
              </Text>

              <ModalCloseButton position="static" borderRadius="none" fontSize="lg" />
            </Flex>
          </Grid>
        </ModalHeader>
        <ModalBody flex="1 1 100%" overflow="hidden" position="relative">
          <Box
            display="flex"
            flexDirection={['row', 'row', 'column']}
            py={4}
            w={['100%', '100%', 32]}
            position="absolute"
            left="0"
            top="0"
            h={[32, 32, '100%']}
            overflow={['scroll hidden', 'scroll hidden', 'hidden scroll']}
            zIndex={100}
            bg={colorMode === 'dark' ? 'amethyst.900' : 'amethyst.50'}
            px={4}
            sx={{
              '&': {
                scrollbarColor:
                  colorMode === 'dark'
                    ? `${colors.amethyst['400']} ${colors.amethyst['800']}`
                    : `${colors.amethyst['500']} ${colors.amethyst['200']}`,
              },
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                width: '8px',
                background: colorMode === 'dark' ? 'amethyst.800' : 'amethyst.200',
              },
              '&::-webkit-scrollbar-thumb': {
                background: colorMode === 'dark' ? 'amethyst.400' : 'amethyst.500',
              },
            }}
          >
            {images.map((i) => (
              <Link
                variant="icon"
                mx={2}
                mb={2}
                key={i.path}
                to={`?gallery=${i.basename}`}
                onClick={(e) => {
                  e.preventDefault()
                  update([i.basename])
                }}
              >
                <Box
                  mx="auto"
                  bg={colorMode === 'dark' ? 'amethyst.800' : 'amethyst.100'}
                  borderStyle="solid"
                  borderWidth="2px"
                  opacity={currentImage?.basename === i.basename ? 1 : 0.75}
                  borderColor={
                    currentImage?.basename === i.basename
                      ? colorMode === 'dark'
                        ? 'amethyst.50'
                        : 'amethyst.900'
                      : colorMode === 'dark'
                      ? 'amethyst.700'
                      : 'amethyst.200'
                  }
                  w={20}
                  h={20}
                  transition="opacity 0.2s ease-out"
                  _hover={{ opacity: 1 }}
                  ref={currentImage?.basename === i.basename ? selectedImage : null}
                >
                  <GatsbyImage
                    objectFit="contain"
                    style={{ width: '100%', height: '100%' }}
                    imgStyle={{ width: '100%', height: '100%' }}
                    alt={t('ui.thumbnail_of', { ns: 'common', project: data.title })}
                    image={i.gatsbyImageData}
                  />
                </Box>
              </Link>
            ))}
          </Box>
          <Box pt={[32, 32, 0]} pb={[16, 16, 0]} pl={[0, 0, 32]} w="100%" h="100%">
            {currentImage ? (
              <PrismaZoom style={{ width: '100%', height: '100%' }} maxZoom={3}>
                <GatsbyImage
                  objectFit="contain"
                  style={{ width: '100%', height: '100%' }}
                  imgStyle={{ width: '100%', height: '100%' }}
                  alt={t('ui.screenshot_of', { ns: 'common', project: data.title })}
                  image={currentImage.gatsbyImageData}
                />
              </PrismaZoom>
            ) : null}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default WorkGalleryModal
