import { StaticImage } from 'gatsby-plugin-image'
import { Suspense } from 'react'
import { graphql, PageProps } from 'gatsby'
import { Flex, Box, Text, Heading, Image, Stack } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { I18NextContext } from '@ianmethyst/gatsby-plugin-react-i18next/dist/types'

import Card from '../components/Card'
import SEO from '../components/Seo'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'
import SocialLinks from '../components/SocialLinks'

import { getAge } from '../util'
import Markdown from '../components/Markdown'

type AboutPageProps = PageProps<{
  content: {
    language: string
    ns: string
    data: string
  }
}>

const AboutPage: React.FC<AboutPageProps> = ({ data }) => {
  useMoveCamera(cameraPositions.FRONT)
  const { i18n } = useTranslation('about')

  const l = data.content
  if (!i18n.getResourceBundle(l.language, l.ns)) {
    i18n.addResourceBundle(l.language, l.ns, JSON.parse(l.data), false, false)
  }

  const t = i18n.getFixedT(l.language, l.ns)

  return (
    <>
      <SEO title="Acerca" />
      <Suspense fallback={null}>
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
                {t('general.fullname')}
              </Heading>
              <Text>
                {getAge(t('general.birthday'))} Años — {t('general.city')}
              </Text>
              <Box position="relative" left={-2}>
                <SocialLinks />
              </Box>
            </Stack>
          </Flex>
        </Card>
        <Card>
          <Box p={6}>
            <Markdown>{t('general.about')}</Markdown>
          </Box>
        </Card>
      </Suspense>
    </>
  )
}

export const query = graphql`
  query ($language: String!) {
    content(ns: { in: ["about"] }, language: { eq: $language }) {
      ns
      data
      language
    }
  }
`

export default AboutPage
