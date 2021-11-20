import { PageProps } from 'gatsby'
import { Flex, Box, Text, Heading, Image, Stack } from '@chakra-ui/react'

import Card from '../components/Card'
import SEO from '../components/Seo'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import SocialLinks from '../components/SocialLinks'

const AboutPage: React.FC<PageProps> = () => {
  useMoveCamera(cameraPositions.FRONT)
  return (
    <>
      <SEO title="Acerca" />
      <Heading variant="smallcaps" size="sectionTitle">
        Acerca
      </Heading>
      <Card>
        <Flex position="relative" left={-14} top={-8}>
          <Box borderRadius="50%" overflow="hidden" w="fit-content" h="fit-content">
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
          <Stack position="relative" top={8} pl={4} py={4} spacing={1}>
            <Heading textTransform="uppercase" fontSize="3xl">
              Ian Mancini
            </Heading>
            <Text> 23 Años — La Plata, Argentina</Text>
            <Box position="relative" left={-2}>
              <SocialLinks />
            </Box>
          </Stack>
        </Flex>
      </Card>
      <Card>
        <Box p={6}>
          <Text fontSize="md">
            Licenciado en Diseño Multimedial con 4+ años de experiencia desarrollando
            sitios web principalmente con React de manera remota. Mi formación
            interdisciplinaria me permite llevar a cabo productos que son fieles a los
            procesos creativos.
            <br /> <br />
            Siempre estoy buscando algo nuevo para aprender o algún proyecto DIY para
            realizar. Soy un entusiasta del software libre, y en mi tiempo libre me gusta
            ver películas, series, leer libros o jugar videojuegos.
          </Text>
        </Box>
      </Card>
    </>
  )
}

export default AboutPage
