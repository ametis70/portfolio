import { Text } from '@chakra-ui/react'

import { Card } from '../Card'
import Link from '../Link'

import useMetadata from '../../hooks/useMetadata'

const AboutCard: React.VFC<TFunctionProps> = ({ t }) => {
  const { email } = useMetadata()

  return (
    <Card.Container pad>
      <Text pb={4}>{t('card_text', { ns: 'contact' })}</Text>
      <Link variant="center" external href={`mailto:${email}`}>
        {email}
      </Link>
    </Card.Container>
  )
}

export default AboutCard
