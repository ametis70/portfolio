import { Box, Divider, Heading, SimpleGrid } from '@chakra-ui/react'
import { GatsbyImage } from 'gatsby-plugin-image'

import Block from './Block'

const WorkGallery: React.VFC<TFunctionProps & { data: WorkPageData }> = ({ t, data }) => {
  const { desktopThumbnails, mobileThumbnails } = data
  return (
    <Block>
      <Box layerStyle="container" py={4}>
        <Heading as="h3" size="cardTitle" variant="smallcaps">
          gallery
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
              <GatsbyImage key={s.path} alt="wea" image={s.gatsbyImageData} />
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
              <GatsbyImage key={s.path} alt="wea" image={s.gatsbyImageData} />
            ))}
          </SimpleGrid>
        ) : null}
      </Box>
    </Block>
  )
}
export default WorkGallery
