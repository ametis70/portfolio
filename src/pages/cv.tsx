import { PageProps } from 'gatsby'

import SEO from '../components/Seo'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'
import useDisplay, { displayStatus, displayContentTypes } from '../hooks/useDisplay'

const CVPage: React.FC<PageProps> = () => {
  useDisplay(
    displayStatus.ON,
    displayContentTypes.IMAGE,
    'https://upload.wikimedia.org/wikipedia/commons/5/56/Celeste_screenshot_08.png',
  )
  useMoveCamera(cameraPositions.GENERAL)
  return (
    <>
      <SEO title="CV" />
    </>
  )
}

export default CVPage
