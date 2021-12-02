import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useColorMode,
} from '@chakra-ui/react'
import { useTheme } from '@emotion/react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

import PrismaZoom from 'react-prismazoom'

const WorkGalleryModal: React.VFC<
  TFunctionProps & {
    data: WorkPageData
    onClose: () => void
    isOpen: boolean
    query: string[] | null
    update: (newValue: string[]) => void
  }
> = ({ t, data, onClose, isOpen, query, update }) => {
  const { colors } = useTheme()
  const { colorMode } = useColorMode()

  let images: DatoCmsImages = []
  if (data.desktopScreenshots) images = [...images, ...data.desktopScreenshots]
  if (data.mobileScreenshots) images = [...images, ...data.mobileScreenshots]

  return (
    <Modal onClose={onClose} size="full" isOpen={isOpen}>
      <ModalOverlay backdropFilter="blur(40px)" />
      <ModalContent bg="transparent" h="100vh" display="flex" flexDirection="column">
        <ModalHeader
          bg={colorMode === 'dark' ? 'amethyst.900' : 'amethyst.50'}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flex="0 0 64px"
        >
          {`${data.title} — ${t('ui.gallery', { ns: 'common' })}`}
          <ModalCloseButton position="static" borderRadius="none" />
        </ModalHeader>
        <ModalBody flex="1 1 100%" overflow="hidden" position="relative">
          <Box
            py={4}
            w={32}
            position="absolute"
            left="0"
            top="0"
            h="100%"
            overflowY="scroll"
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
                  opacity={query && query[0] && query[0] === i.basename ? 1 : 0.75}
                  borderColor={
                    query && query[0] && query[0] === i.basename
                      ? colorMode === 'dark'
                        ? 'amethyst.50'
                        : 'amethyst.900'
                      : colorMode === 'dark'
                      ? 'amethyst.700'
                      : 'amethyst.200'
                  }
                  w={20}
                  h={20}
                  mb={2}
                  transition="opacity 0.2s ease-out"
                  _hover={{ opacity: 1 }}
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
          <Box pl={32} w="100%" h="100%">
            {query && query[0] ? (
              <PrismaZoom style={{ width: '100%', height: '100%' }} maxZoom={2}>
                <GatsbyImage
                  objectFit="contain"
                  style={{ width: '100%', height: '100%' }}
                  imgStyle={{ width: '100%', height: '100%' }}
                  alt={t('ui.screenshot_of', { ns: 'common', project: data.title })}
                  image={images.find((i) => i.basename === query[0])!.gatsbyImageData}
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
