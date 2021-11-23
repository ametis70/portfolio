import { StaticImage } from 'gatsby-plugin-image'
import { Suspense } from 'react'
import { graphql, PageProps } from 'gatsby'
import {
  Flex,
  Box,
  Text,
  Heading,
  Stack,
  Divider,
  ListItem,
  OrderedList,
} from '@chakra-ui/react'

import Card from '../components/Card'
import SEO from '../components/Seo'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'
import SocialLinks from '../components/SocialLinks'

import { getAge } from '../util'
import Markdown from '../components/Markdown'
import useI18Next from '../hooks/useI18Next'
import Link from '../components/Link'

type AboutPageProps = PageProps<{ allContent: AllContentQuery }, { language: string }>

const AboutPage: React.FC<AboutPageProps> = ({ data, pageContext }) => {
  useMoveCamera(cameraPositions.FRONT)
  const { fixedT: t, get } = useI18Next(pageContext.language, data.allContent)

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
                {t('name')}
              </Heading>
              <Text>{t('job')}</Text>
              <Box position="relative" left={-2}>
                <SocialLinks />
              </Box>
            </Stack>
          </Flex>
        </Card>
        <Card>
          <Box p={6}>
            <Markdown>{t('about')}</Markdown>
          </Box>
        </Card>

        <Card>
          <Box p={6}>
            <Heading size="cardTitle" variant="smallcaps" as="h3">
              {t('subtitles.experience', { ns: 'common' })}
            </Heading>
            <Divider mt={2} mb={6} />
            <OrderedList padding={0} m={0} listStyleType="none">
              {get<{
                items: Array<{
                  start: string
                  end?: string
                  role: string
                  company: string
                  description: string
                }>
              }>('experience').items.map((i) => (
                <ListItem key={i.role} pb={4}>
                  <Text fontSize="sm" variant="cardSubtitle">
                    {new Date(i.start).getUTCFullYear()}
                    {' — '}
                    {i.end
                      ? new Date(i.end).getFullYear
                      : t('time.present', { ns: 'common' })}{' '}
                  </Text>
                  <Box pl={4} pt={1}>
                    <Heading size="cardTitle" as="h3">
                      {i.role}
                    </Heading>
                    <Text fontSize="sm" pb={4}>
                      {i.company}
                    </Text>
                    <Markdown>{i.description}</Markdown>
                  </Box>
                </ListItem>
              ))}
            </OrderedList>
            <Link variant="cta" to="/works">
              {t('ui.works_cta', { ns: 'common' })}
            </Link>
          </Box>
        </Card>
      </Suspense>
    </>
  )
}

export const query = graphql`
  query ($language: String!) {
    allContent(
      filter: {
        ns: { in: ["about", "experience", "skills", "education"] }
        language: { eq: $language }
      }
    ) {
      edges {
        node {
          ...LocalizedContent
        }
      }
    }
  }
`

export default AboutPage
