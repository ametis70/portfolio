import { Text } from '@chakra-ui/react'

import { Card } from '../Card'

const WorksIndex: React.VFC<TFunctionProps> = ({ t }) => {
  return (
    <Card.Container pad>
      <Text>{t('section_card', { ns: 'works' })}</Text>
    </Card.Container>
  )
}

export default WorksIndex
