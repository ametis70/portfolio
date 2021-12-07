import { Text, Box, Flex, Heading } from '@chakra-ui/react'
import { StaticImage } from 'gatsby-plugin-image'

import { Card } from '../Card'
import SocialLinks from '../SocialLinks'

import useMetadata from '../../hooks/useMetadata'

const HeroCard: React.VFC<TFunctionProps> = ({ t }) => {
  const { name } = useMetadata()

  return (
    <Card.Container>
      <Flex py={4} position="relative">
        <Box
          position="relative"
          flexBasis={['calc(128px - 2rem)', 'calc(128px - 2rem)', 'calc(128px - 3rem)']}
          flexGrow="0"
          flexShrink="0"
        >
          <Box
            left={[-6, -6, -12]}
            top={[-12, -12, -16]}
            position="absolute"
            w="128px"
            _before={{ content: '""', float: 'left', pt: '100%' }}
          >
            <StaticImage
              imgStyle={{ borderRadius: '50%' }}
              src="../../images/avatar.jpeg"
              alt={t('ui.picture_of', { ns: 'common', name })}
              placeholder="blurred"
              layout="constrained"
              quality={90}
              width={128}
              height={128}
            />
          </Box>
        </Box>
        <Flex position="relative" pl={6} direction="column">
          <Heading textTransform="uppercase" fontSize={['2xl', '2xl', '3xl']} mb={0}>
            {name}
          </Heading>
          <Text mb={2}>{t('job', { ns: 'common' })}</Text>
          <Box position="relative" left={-2}>
            <SocialLinks t={t} />
          </Box>
        </Flex>
      </Flex>
    </Card.Container>
  )
}

export default HeroCard
