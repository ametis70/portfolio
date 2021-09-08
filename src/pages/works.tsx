import React, { useEffect } from 'react'
import { PageProps } from 'gatsby'

import SEO from '../components/Seo'

import useStore from '../store'
import { cameraPositions } from '../store/constants'

const WorksPage: React.FC<PageProps> = () => {
  const setCameraPosition = useStore((state) => state.setCameraPosition)
  useEffect(() => {
    setCameraPosition(cameraPositions.FRONT)
  }, [])
  return (
    <>
      <SEO title="Trabajos" />
    </>
  )
}

export default WorksPage
