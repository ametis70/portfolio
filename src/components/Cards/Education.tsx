import { Box } from '@chakra-ui/react'
import { printAgeRange } from '../../util'
import { Card } from '../Card'

type EducationItemProps = {
  start: string
  end?: string
  name: string
  school: string
  link?: string
}

type EducationGroup = {
  category: string
  items: EducationItemProps[]
}

const EducationCard: React.VFC<TFunctionProps & { data: EducationGroup[] }> = ({
  t,
  data,
}) => {
  const EducationItem: React.FC<{ item: EducationItemProps }> = ({ item }) => (
    <Card.OrderedList>
      <Card.ListItem key={item.name}>
        <Card.IndentBox>
          <Card.MainText>{item.name}</Card.MainText>
          <Card.AltText>{item.school}</Card.AltText>
          <Card.AltText>{printAgeRange(t, item.start, item.end)}</Card.AltText>
        </Card.IndentBox>
      </Card.ListItem>
    </Card.OrderedList>
  )

  return (
    <Card.Container pad>
      <Card.Title>{t('subtitles.education', { ns: 'common' })}</Card.Title>
      <Card.Divider />
      {data.map((e) => (
        <Box key={e.category}>
          <Card.AltText>{e.category}</Card.AltText>
          {e.items.map((item) => (
            <EducationItem key={item.name} item={item} />
          ))}
        </Box>
      ))}
    </Card.Container>
  )
}

export default EducationCard
