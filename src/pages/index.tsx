import { graphql, PageProps } from 'gatsby'

import SEO from '../components/Seo'
import MotionBox from '../components/MotionBox'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'
import useDisplay, { displayStatus, displayContentTypes } from '../hooks/useDisplay'
import React from 'react'
import { Heading } from '@chakra-ui/react'
import Link from '../components/Link'

const IndexPage: React.FC<PageProps> = () => {
  useDisplay(displayStatus.ON, displayContentTypes.BLANK)
  useMoveCamera(cameraPositions.CLOSE)
  return (
    <>
      <SEO />
      <MotionBox
        key="home-heading"
        display="block"
        position="absolute"
        top="0"
        left="-64px"
        px={4}
        py={4}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Link to="/" variant="icon">
          <Heading
            as="h1"
            textTransform="uppercase"
            fontSize={['xl', '2xl', '5xl']}
            letterSpacing="0.05em"
            fontWeight="normal"
          >
            Ian Mancini
          </Heading>
          <Heading
            w="100%"
            as="h2"
            textTransform="uppercase"
            fontSize={['xl', '2xl', 'xl']}
            letterSpacing="0.065em"
            fontWeight="300"
            pb="2rem"
          >
            Diseño y desarrollo web
          </Heading>
        </Link>
      </MotionBox>
    </>
  )
}

export default IndexPage
