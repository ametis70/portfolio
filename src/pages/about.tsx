import { graphql, PageProps } from 'gatsby'
import { Flex, Box, Text, Heading, Image, Stack } from '@chakra-ui/react'

import Card from '../components/Card'
import SEO from '../components/Seo'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import SocialLinks from '../components/SocialLinks'
import { getAge } from '../util'

type I18NProps<T> = {
  en: T
  es: T
}

type AboutData = {
  about: string
  birthday: string
  city: string
  fullname: string
}

type AboutPageData = {
  about: I18NProps<AboutData>
}

const AboutPage: React.FC<PageProps<AboutPageData>> = ({ data }) => {
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
              {data.about.en.fullname}
            </Heading>
            <Text>
              {getAge(data.about.en.birthday)} Años — {data.about.en.city}
            </Text>
            <Box position="relative" left={-2}>
              <SocialLinks />
            </Box>
          </Stack>
        </Flex>
      </Card>
      <Card>
        <Box p={6}>
          <Text fontSize="md">{data.about.es.about}</Text>
        </Box>
      </Card>
    </>
  )
}

export const query = graphql`
  query {
    about: aboutJson {
      en {
        about
        birthday
        city
        fullname
      }
      es {
        about
      }
    }
  }
`
export default AboutPage
