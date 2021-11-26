import { graphql, PageProps } from 'gatsby'

import SEO from '../components/Seo'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'
import useDisplay, { displayStatus, displayContentTypes } from '../hooks/useDisplay'

const WorksPage: React.FC<PageProps> = ({ data }) => {
  useDisplay(
    displayStatus.ON,
    displayContentTypes.IMAGE,
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/800px-Wikipedia-logo-v2.svg.png',
  )
  useMoveCamera(cameraPositions.GENERAL)
  console.log(data)
  return (
    <>
      <SEO title="Trabajos" />
    </>
  )
}

export const query = graphql`
  query ($language: String!) {
    allDatoCmsWork(filter: { locale: { eq: $language } }) {
      edges {
        node {
          title
          slug
          finishDate
          model {
            apiKey
          }
          logo {
            path
          }
          banner {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export default WorksPage
