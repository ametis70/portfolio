import React from 'react'
import { PageProps } from 'gatsby'
import { Flex, Heading, Stack } from '@chakra-ui/react'

import SEO from '../components/Seo'
import Canvas from '../components/Canvas'
import Link from '../components/Link'

const IndexPage: React.FC<PageProps> = () => (
  <>
    <SEO title="Home" />
    <Flex
      maxW="1280px"
      mx="auto"
      align="center"
      direction="column"
      justify="center"
      minHeight="100vh"
    >
      <Canvas />
      <Heading
        as="h1"
        textTransform="uppercase"
        fontSize={['xl', '2xl', '6xl']}
        opacity="0.82"
        letterSpacing="0.05em"
        fontWeight="normal"
      >
        Ian Mancini
      </Heading>
      <Heading
        textTransform="uppercase"
        fontSize={['xl', '2xl', '2xl']}
        opacity="0.54"
        letterSpacing="0.065em"
        fontWeight="300"
        pb="3rem"
      >
        Diseño Multimedial
      </Heading>
      <Stack
        direction="row"
        spacing="2.5rem"
        fontSize="3xl"
        fontWeight="200"
        opacity="0.82"
      >
        <Link to="/"> Servicios </Link>
        <Link to="/"> Trabajos </Link>
        <Link to="/"> CV </Link>
        <Link to="/"> Contacto </Link>
      </Stack>
    </Flex>
  </>
)

export default IndexPage
