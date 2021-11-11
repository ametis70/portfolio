import { PageProps } from 'gatsby'
import { Heading } from '@chakra-ui/react'

import SEO from '../components/Seo'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'

const AboutPage: React.FC<PageProps> = () => {
  useMoveCamera(cameraPositions.FRONT)
  return (
    <>
      <SEO title="Acerca" />
      <Heading>Acerca</Heading>
    </>
  )
}

export default AboutPage
