import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import PrismaZoom from 'react-prismazoom'

const WorkGalleryModal: React.VFC<
  TFunctionProps & {
    data: WorkPageData
    onClose: () => void
    isOpen: boolean
    query: string[] | null
  }
> = ({ t, data, onClose, isOpen, query }) => {
  let images: DatoCmsImages = []
  if (data.desktopScreenshots) images = [...images, ...data.desktopScreenshots]
  if (data.mobileScreenshots) images = [...images, ...data.mobileScreenshots]

  return (
    <Modal onClose={onClose} size="full" isOpen={isOpen}>
      <ModalOverlay backdropFilter="blur(40px)" />
      <ModalContent bg="transparent" h="100vh" display="flex" flexDirection="column">
        <ModalHeader
          bg="amethyst.50"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          flex="0 0 64px"
        >
          {`${data.title} — ${t('ui.gallery', { ns: 'common' })}`}
          <ModalCloseButton position="static" borderRadius="none" />
        </ModalHeader>
        <ModalBody flex="1 1 100%" overflow="hidden">
          {query && query[0] ? (
            <PrismaZoom style={{ width: '100%', height: '100%' }}>
                <GatsbyImage
                  objectFit="contain"
                  style={{ width: '100%', height: '100%' }}
                  imgStyle={{ width: '100%', height: '100%' }}
                  alt={t('ui.screenshot_of', { ns: 'common', project: data.title })}
                  image={images.find((i) => i.basename === query[0])!.gatsbyImageData}
                />
            </PrismaZoom>
          ) : null}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default WorkGalleryModal
