import { Text } from '@chakra-ui/react'

import { Card } from '../Card'
import Link from '../Link'

import useMetadata from '../../hooks/useMetadata'

const AboutCard: React.VFC<TFunctionReceiver> = ({ t }) => {
  const { email } = useMetadata()

  return (
    <Card.Container pad>
      <Text pb={4}>{t('contact_text')}</Text>
      <Link variant="center" external href={`mailto:${email}`}>
        {email}
      </Link>
    </Card.Container>
  )
}

export default AboutCard
