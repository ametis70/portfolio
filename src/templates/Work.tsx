import { graphql } from 'gatsby'
import { Box, Flex, Heading, Icon } from '@chakra-ui/react'
import { BiLeftArrowAlt } from 'react-icons/bi'

import SEO from '../components/Seo'
import Link from '../components/Link'

import useI18Next from '../hooks/useI18Next'
import Cards from '../components/Cards'
import Block from '../components/Block'
import WorkGallery from '../components/WorkGallery'

const Work: React.FC<LocalizedPageProps<{ datoCmsWork: WorkPageData }>> = ({
  data,
  pageContext,
}) => {
  const { title, primaryLink, primaryLinkText, secondaryLink, secondaryLinkText } =
    data.datoCmsWork
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

      <Block>
        <Heading size="sectionTitle" py={4}>
          {title}
        </Heading>
      </Block>

      <Block w="100%">
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
      </Block>

      <Cards.Work t={t} data={data.datoCmsWork} />
      <WorkGallery t={t} data={data.datoCmsWork} />
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
