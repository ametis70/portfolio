import { Box, Divider, Heading, SimpleGrid, useDisclosure } from '@chakra-ui/react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { useState } from 'react'
import useQueryParam from '../hooks/useQueryParam'

import Block from './Block'
import Link from './Link'
import WorkGalleryModal from './WorkGalleryModal'

const WorkGallery: React.VFC<TFunctionProps & { data: WorkPageData }> = ({ t, data }) => {
  const { desktopThumbnails, mobileThumbnails } = data
  const { value, update } = useQueryParam('gallery')

  let _images: DatoCmsImages = []
  if (data.desktopScreenshots.length > 0)
    _images = [..._images, ...data.desktopScreenshots]
  if (data.mobileScreenshots.length > 0) _images = [..._images, ...data.mobileScreenshots]

  const [images] = useState<DatoCmsImages>(_images)

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

        {desktopThumbnails.length > 0 && mobileThumbnails.length > 0 ? (
          <Heading as="h3" variant="galleryHeading" size="galleryHeading">
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

        {desktopThumbnails.length > 0 && mobileThumbnails.length > 0 ? (
          <Heading as="h3" variant="galleryHeading" size="galleryHeading">
            {t('ui.mobile', { ns: 'common' })}
          </Heading>
        ) : null}

        {mobileThumbnails.length > 0 ? (
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
        update={update}
        images={images}
      />
    </Block>
  )
}
export default WorkGallery
