import { Text } from '@chakra-ui/react'
import { Card } from '../Card'

type SkillItem = {
  category: string
  skills: string
}

const SkillsCard: React.VFC<TFunctionProps & { data: SkillItem[] }> = ({ t, data }) => {
  return (
    <Card.Container pad>
      <Card.Title>{t('subtitles.skills', { ns: 'common' })}</Card.Title>
      <Card.Divider />
      <Card.OrderedList>
        {data.map((i) => (
          <Card.ListItem key={i.category}>
            <Card.AltText>{i.category}</Card.AltText>
            <Card.IndentBox>
              <Text>{i.skills.split(',').join(', ')}</Text>
            </Card.IndentBox>
          </Card.ListItem>
        ))}
      </Card.OrderedList>
    </Card.Container>
  )
}
export default SkillsCard
