import { PageProps } from 'gatsby'

import SEO from '../components/Seo'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'
import useDisplay, { displayStatus, displayContentTypes } from '../hooks/useDisplay'

const WorksPage: React.FC<PageProps> = () => {
  useDisplay(
    displayStatus.ON,
    displayContentTypes.IMAGE,
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/800px-Wikipedia-logo-v2.svg.png',
  )
  useMoveCamera(cameraPositions.GENERAL)
  return (
    <>
      <SEO title="Trabajos" />
    </>
  )
}

export default WorksPage
