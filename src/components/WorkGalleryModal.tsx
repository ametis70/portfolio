import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { GatsbyImage } from 'gatsby-plugin-image'
import useQueryParam from '../hooks/useQueryParam'

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
      <ModalContent bg="transparent">
        <ModalHeader
          bg="amethyst.50"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          {`${data.title} — ${t('ui.gallery', { ns: 'common' })}`}
          <ModalCloseButton position="static" borderRadius="none" />
        </ModalHeader>
        <ModalBody>
          {query && query[0] ? (
            <GatsbyImage
              alt={t('ui.screenshot_of', { ns: 'common', project: data.title })}
              image={images.find((i) => i.basename === query[0])!.gatsbyImageData}
            />
          ) : null}
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default WorkGalleryModal
