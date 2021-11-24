import { graphql, PageProps } from 'gatsby'
import { Heading } from '@chakra-ui/react'

import Cards from '../components/Card'
import SEO from '../components/Seo'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'
import useI18Next from '../hooks/useI18Next'

type AboutPageProps = PageProps<{ allContent: AllContentQuery }, { language: string }>

const AboutPage: React.FC<AboutPageProps> = ({ data, pageContext }) => {
  useMoveCamera(cameraPositions.FRONT)
  const { fixedT: t, get } = useI18Next(pageContext.language, data.allContent)

  return (
    <>
      <SEO title="Acerca" />
      <Heading variant="smallcaps" size="sectionTitle">
        Acerca
      </Heading>

      <Cards.Hero t={t} />
      <Cards.About t={t} />
      <Cards.Experience t={t} get={get} />
      <Cards.Skills t={t} get={get} />
      <Cards.Education t={t} get={get} />
    </>
  )
}

export const query = graphql`
  query ($language: String!) {
    allContent(
      filter: {
        ns: { in: ["about", "experience", "skills", "education"] }
        language: { eq: $language }
      }
    ) {
      edges {
        node {
          ...LocalizedContent
        }
      }
    }
  }
`

export default AboutPage
