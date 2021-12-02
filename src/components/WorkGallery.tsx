import { Box, Divider, Heading, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import useQueryParam from '../hooks/useQueryParam'

import Block from './Block'
import WorkGalleryModal from './WorkGalleryModal'

const WorkGallery: React.VFC<TFunctionProps & { data: WorkPageData }> = ({ t, data }) => {
  const { desktopThumbnails, mobileThumbnails } = data
  const { value, update } = useQueryParam('gallery')

  const { isOpen, onClose } = useDisclosure({
    isOpen: value !== null,
    onClose: () => {
      update(null)
    },
  })

  const Thumbnail: React.VFC<{ image: DatoCmsImage }> = ({ image }) => (
    <Link
      to={`?gallery=${image.basename}`}
      onClick={(e) => {
        e.preventDefault()
        update([image.basename])
      }}
    >
      <GatsbyImage
        alt={t('ui.thumbnail_of', { ns: 'common', project: data.title })}
        image={image.gatsbyImageData}
      />
    </Link>
  )

  return (
    <Block>
      <Box layerStyle="container" py={4}>
        <Heading as="h3" size="cardTitle" variant="smallcaps">
          {t('ui.gallery', { ns: 'common' })}
        </Heading>
        <Divider w="100%" mt={2} mb={6} />

        {desktopThumbnails && mobileThumbnails ? (
          <Heading
            color="amethyst.900-70"
            as="h3"
            variant="galleryHeading"
            size="galleryHeading"
          >
            {t('ui.desktop', { ns: 'common' })}
          </Heading>
        ) : null}

        {desktopThumbnails ? (
          <SimpleGrid columns={2} spacing={4} pb={4}>
            {desktopThumbnails.map((s) => (
              <Thumbnail key={s.path} image={s} />
            ))}
          </SimpleGrid>
        ) : null}

        {desktopThumbnails && mobileThumbnails ? (
          <Heading
            color="amethyst.900-70"
            as="h3"
            variant="galleryHeading"
            size="galleryHeading"
          >
            {t('ui.mobile', { ns: 'common' })}
          </Heading>
        ) : null}

        {mobileThumbnails ? (
          <SimpleGrid columns={3} spacing={4}>
            {mobileThumbnails.map((s) => (
              <Thumbnail key={s.path} image={s} />
            ))}
          </SimpleGrid>
        ) : null}
      </Box>

      <WorkGalleryModal
        t={t}
        data={data}
        onClose={onClose}
        isOpen={isOpen}
        query={value}
      />
    </Block>
  )
}
export default WorkGallery
