import { PageProps } from 'gatsby'

import SEO from '../components/Seo'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'
import useDisplay, { displayStatus } from '../hooks/useDisplay'

const WorksPage: React.FC<PageProps> = () => {
  useDisplay(displayStatus.OFF)
  useMoveCamera(cameraPositions.GENERAL)
  return (
    <>
      <SEO title="Trabajos" />
    </>
  )
}

export default WorksPage
