import { graphql } from 'gatsby'
import { Box, Divider, Flex, Heading, Icon, SimpleGrid } from '@chakra-ui/react'

import SEO from '../components/Seo'
import Link from '../components/Link'

import useI18Next from '../hooks/useI18Next'
import Cards from '../components/Cards'
import { BiLeftArrowAlt } from 'react-icons/bi'
import { GatsbyImage } from 'gatsby-plugin-image'

const Work: React.FC<LocalizedPageProps<{ datoCmsWork: WorkPageData }>> = ({
  data,
  pageContext,
}) => {
  const {
    title,
    primaryLink,
    primaryLinkText,
    secondaryLink,
    secondaryLinkText,
    desktopThumbnails,
    mobileThumbnails,
  } = data.datoCmsWork
  const { fixedT: t } = useI18Next(pageContext.language)

  return (
    <>
      <SEO title={title} />
      <Box alignSelf="flex-start" pl={8}>
        <Link to="/works" variant="back">
          <Icon as={BiLeftArrowAlt} w={6} h={6} mr={2} />
          {t('ui.go_back', { ns: 'common' })}
        </Link>
      </Box>

      <Heading size="sectionTitle" py={4}>
        {title}
      </Heading>

      <Flex
        layerStyle="container"
        alignItems="stretch"
        direction="row-reverse"
        justify="center"
        pt={2}
        pb={6}
      >
        <Link external href={primaryLink} variant="workCta">
          {primaryLinkText}
        </Link>
        {secondaryLink && secondaryLinkText ? (
          <>
            <Box flex="0 0 1rem" />
            <Link external href={secondaryLink} variant="workSecondary">
              {secondaryLinkText}
            </Link>
          </>
        ) : null}
      </Flex>

      <Cards.Work t={t} data={data.datoCmsWork} />

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
    </>
  )
}

export const query = graphql`
  query ($language: String!, $slug: String!) {
    datoCmsWork(locale: { eq: $language }, slug: { eq: $slug }) {
      title
      slug
      finishDate
      gradient
      category
      role
      description
      primaryLink
      primaryLinkText
      secondaryLink
      secondaryLinkText
      tags
      desktopScreenshots {
        path
        gatsbyImageData(placeholder: BLURRED, forceBlurhash: true)
      }
      mobileScreenshots {
        path
        gatsbyImageData(placeholder: BLURRED, forceBlurhash: true)
      }
      desktopThumbnails: desktopScreenshots {
        path
        gatsbyImageData(
          width: 300
          imgixParams: { w: "300" }
          placeholder: BLURRED
          forceBlurhash: true
        )
      }
      mobileThumbnails: mobileScreenshots {
        path
        gatsbyImageData(
          height: 300
          imgixParams: { h: "300" }
          placeholder: BLURRED
          forceBlurhash: true
        )
      }
    }
  }
`

export default Work
