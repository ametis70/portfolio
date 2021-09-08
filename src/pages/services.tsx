import React from 'react'
import { PageProps } from 'gatsby'

import SEO from '../components/Seo'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'

const ServicesPage: React.FC<PageProps> = () => {
  useMoveCamera(cameraPositions.FRONT)
  return (
    <>
      <SEO title="Servicios" />
    </>
  )
}

export default ServicesPage
