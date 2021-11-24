import { Text } from '@chakra-ui/react'
import { Card } from '../Card'

type SkillsData = {
  categories: Array<{
    name: string
    items: Array<{ item: string }>
  }>
}

const SkillsCard: React.VFC<TFunctionWithGetProps> = ({ t, get }) => {
  const data = get<SkillsData>('skills')
  return (
    <Card.Container pad>
      <Card.Title>{t('subtitles.skills', { ns: 'common' })}</Card.Title>
      <Card.Divider />
      <Card.OrderedList>
        {data.categories.map((c) => (
          <Card.ListItem key={c.name}>
            <Card.AltText>{c.name}</Card.AltText>
            <Card.IndentBox>
              <Text>
                {c.items.map(
                  (item, index) =>
                    `${item.item}${index !== c.items.length - 1 ? ', ' : ''}`,
                )}
              </Text>
            </Card.IndentBox>
          </Card.ListItem>
        ))}
      </Card.OrderedList>
    </Card.Container>
  )
}
export default SkillsCard
