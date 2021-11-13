import { PageProps } from 'gatsby'
import { Flex, Box, Text, Heading, Image } from '@chakra-ui/react'

import Card from '../components/Card'
import SEO from '../components/Seo'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'

const AboutPage: React.FC<PageProps> = () => {
  useMoveCamera(cameraPositions.FRONT)
  return (
    <>
      <SEO title="Acerca" />
      <Heading textTransform="uppercase" fontSize="xl">
        Acerca
      </Heading>
      <Card>
        <Flex position="relative" left={-12} top={-8}>
          <Box borderRadius="50%" overflow="hidden" w="fit-content">
            <StaticImage
              src="../images/avatar.jpeg"
              alt="Foto de Ian Mancini"
              placeholder="blurred"
              layout="fixed"
              quality={90}
              width={128}
              height={128}
            />
          </Box>
          <Box position="relative" top={8} px={4} py={4}>
            <Heading textTransform="uppercase" fontSize="3xl">
              Ian Mancini
            </Heading>
            <Text> 23 Años — La Plata, Argentina</Text>
          </Box>
        </Flex>
      </Card>
    </>
  )
}

export default AboutPage
