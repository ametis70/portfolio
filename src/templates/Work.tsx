import { graphql } from 'gatsby'
import { Box, Heading, ListItem, UnorderedList } from '@chakra-ui/react'

import SEO from '../components/Seo'
import Link from '../components/Link'

import useI18Next from '../hooks/useI18Next'
import Cards from '../components/Cards'

const Work: React.FC<LocalizedPageProps<{ datoCmsWork: WorkPageData }>> = ({
  data,
  pageContext,
}) => {
  const { title, tags } = data.datoCmsWork
  const { fixedT: t } = useI18Next(pageContext.language)

  return (
    <>
      <SEO title={title} />
      <Box alignSelf="flex-start" pl={8}>
        <Link to="/works">{t('ui.go_back', { ns: 'common' })}</Link>
      </Box>

      <Heading size="sectionTitle" py={4}>
        {title}
      </Heading>

      <UnorderedList listStyleType="none" variant="tagList">
        {tags.split(',').map((t) => (
          <ListItem key={t}> {t} </ListItem>
        ))}
      </UnorderedList>

      <Cards.Work t={t} data={data.datoCmsWork} />
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
        gatsbyImageData
      }
      mobileScreenshots {
        gatsbyImageData
      }
    }
  }
`

export default Work
