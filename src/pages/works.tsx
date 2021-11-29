import { graphql } from 'gatsby'
import { Heading } from '@chakra-ui/react'

import SEO from '../components/Seo'
import Cards from '../components/Cards'
import Block from '../components/Block'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'
import useDisplay, { displayStatus, displayContentTypes } from '../hooks/useDisplay'
import useI18Next from '../hooks/useI18Next'
import WorksIndex from '../components/WorksIndex'

type WorksPageProps = LocalizedPageProps<{
  allDatoCmsWork: { edges: Array<WorksIndexData> }
}>

const WorksPage: React.FC<WorksPageProps> = ({ data, pageContext }) => {
  const { fixedT: t } = useI18Next(pageContext.language, data.allTranslation)
  useDisplay(
    displayStatus.ON,
    displayContentTypes.IMAGE,
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/800px-Wikipedia-logo-v2.svg.png',
  )
  useMoveCamera(cameraPositions.GENERAL)

  return (
    <>
      <SEO title="Trabajos" />
      <Block>
        <Heading variant="smallcaps" size="sectionTitle">
          {t('sections.works', { ns: 'common' })}
        </Heading>
      </Block>

      <Cards.WorksIndex t={t} />
      <Block>
        <WorksIndex data={data.allDatoCmsWork.edges} />
      </Block>
    </>
  )
}

export const query = graphql`
  query ($language: String!) {
    allTranslation(filter: { ns: { in: ["works"] }, language: { eq: $language } }) {
      edges {
        node {
          ...TranslationData
        }
      }
    }
    allDatoCmsWork(filter: { locale: { eq: $language } }) {
      edges {
        node {
          title
          slug
          finishDate
          gradient
          logo {
            path
          }
          banner {
            gatsbyImageData(
              width: 300
              imgixParams: { w: "300" }
              placeholder: BLURRED
              forceBlurhash: true
            )
          }
        }
      }
    }
  }
`

export default WorksPage
