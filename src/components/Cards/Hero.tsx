import { Text, Box, Flex, Heading, Stack } from '@chakra-ui/react'
import { StaticImage } from 'gatsby-plugin-image'

import { Card } from '../Card'
import SocialLinks from '../SocialLinks'

import useMetadata from '../../hooks/useMetadata'

const HeroCard: React.VFC<CardProps> = ({ t }) => {
  const { name } = useMetadata()

  return (
    <Card.Container>
      <Flex position="relative" left={-14} top={-8}>
        <Box borderRadius="50%" overflow="hidden" w="fit-content" h="fit-content">
          <StaticImage
            src="../../images/avatar.jpeg"
            alt={t('ui.picture_of', { ns: 'common', name })}
            placeholder="blurred"
            layout="fixed"
            quality={90}
            width={128}
            height={128}
          />
        </Box>
        <Stack position="relative" top={8} pl={4} py={4} spacing={1}>
          <Heading textTransform="uppercase" fontSize="3xl">
            {name}
          </Heading>
          <Text>{t('job', { ns: 'about' })}</Text>
          <Box position="relative" left={-2}>
            <SocialLinks t={t} />
          </Box>
        </Stack>
      </Flex>
    </Card.Container>
  )
}

export default HeroCard
