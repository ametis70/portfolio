import React, { useEffect } from 'react'
import { PageProps } from 'gatsby'

import SEO from '../components/Seo'
import MotionBox from '../components/MotionBox'
import { Flex, Box, Heading } from '@chakra-ui/react'
import HeaderTitle from '../components/HeaderTitle'
import Nav from '../components/Nav'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'

const IndexPage: React.FC<PageProps> = () => {
  useMoveCamera(cameraPositions.CLOSE)
  return (
    <>
      <SEO />
      <Flex direction="column" align="center" justify="center" w="100%" flex="1">
        <HeaderTitle isHome />
        <MotionBox
          key="subtitle"
          initial={{ opacity: 0, x: '-10%' }}
          exit={{ opacity: 0, x: '10%' }}
          animate={{ opacity: 1, x: '0%' }}
          transition={{ duration: 0.3 }}
          w="100%"
          textAlign="center"
          as="h2"
          textTransform="uppercase"
          fontSize={['xl', '2xl', '2xl']}
          letterSpacing="0.065em"
          fontWeight="300"
          pb="2rem"
        >
          Diseño Multimedial
        </MotionBox>
        <Nav />
      </Flex>
    </>
  )
}

export default IndexPage
