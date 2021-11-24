import { Text, Box, Flex, Heading, Stack } from '@chakra-ui/react'
import { StaticImage } from 'gatsby-plugin-image'

import { Card } from '../Card'
import SocialLinks from '../SocialLinks'

const HeroCard: React.VFC<CardProps> = ({ t }) => {
  return (
    <Card.Container>
      <Flex position="relative" left={-14} top={-8}>
        <Box borderRadius="50%" overflow="hidden" w="fit-content" h="fit-content">
          <StaticImage
            src="../../images/avatar.jpeg"
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
    </Card.Container>
  )
}

export default HeroCard
