import { Flex, Text } from '@chakra-ui/react'

import { Card } from '../Card'
import SocialLinks from '../SocialLinks'

const SocialCard: React.VFC<TFunctionReceiver> = ({ t }) => {
  return (
    <Card.Container pad>
      <Flex align="center">
        <Text pr={4}>{t('also_find_me', { ns: 'contact' })}</Text>
        <SocialLinks t={t} />
      </Flex>
    </Card.Container>
  )
}

export default SocialCard
