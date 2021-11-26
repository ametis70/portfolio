import { graphql } from 'gatsby'
import { Heading } from '@chakra-ui/react'

import Cards from '../components/Cards'
import SEO from '../components/Seo'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'
import useI18Next from '../hooks/useI18Next'

const AboutPage: React.FC<LocalizedPageProps> = ({ data, pageContext }) => {
  useMoveCamera(cameraPositions.FRONT)
  const { fixedT: t } = useI18Next(pageContext.language, data.allTranslation)

  return (
    <>
      <SEO title="Acerca" />
      <Heading variant="smallcaps" size="sectionTitle">
        {t('sections.about', { ns: 'common' })}
      </Heading>

      <Cards.Hero t={t} />
      <Cards.About text={data.datoCmsAbout.about} />
      <Cards.Experience t={t} data={data.datoCmsAbout.experience} />
      <Cards.Skills t={t} data={data.datoCmsAbout.skills} />
      <Cards.Education t={t} data={data.datoCmsAbout.education} />
    </>
  )
}

export const query = graphql`
  query ($language: String!) {
    allTranslation(filter: { ns: { in: ["about"] }, language: { eq: $language } }) {
      edges {
        node {
          ...TranslationData
        }
      }
    }
    datoCmsAbout(locale: { eq: $language }) {
      education {
        category
        items {
          link
          end
          start
          school
          name
        }
      }
      experience {
        role
        start
        end
        company
        description
      }
      about
      city
      skills {
        skills
        category
      }
    }
  }
`

export default AboutPage
