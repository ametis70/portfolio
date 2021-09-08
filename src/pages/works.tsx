import React from 'react'
import { PageProps } from 'gatsby'

import SEO from '../components/Seo'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'

const WorksPage: React.FC<PageProps> = () => {
  useMoveCamera(cameraPositions.GENERAL)
  return (
    <>
      <SEO title="Trabajos" />
    </>
  )
}

export default WorksPage
