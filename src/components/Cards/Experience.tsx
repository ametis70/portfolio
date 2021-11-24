import { Text } from '@chakra-ui/react'

import { printAgeRange } from '../../util'
import { Card } from '../Card'
import Link from '../Link'
import Markdown from '../Markdown'

type ExperienceData = {
  items: Array<{
    start: string
    end?: string
    role: string
    company: string
    description: string
  }>
}

const ExperienceCard: React.VFC<TFunctionWithGetProps> = ({ t, get }) => {
  const data = get<ExperienceData>('experience')

  return (
    <Card.Container pad>
      <Card.Title>{t('subtitles.experience', { ns: 'common' })}</Card.Title>
      <Card.Divider />
      <Card.OrderedList>
        {data.items.map((i) => (
          <Card.ListItem key={i.role} pb={4}>
            <Card.AltText>{printAgeRange(t, i.start, i.end, true)}</Card.AltText>
            <Card.IndentBox>
              <Card.MainText>{i.role}</Card.MainText>
              <Text fontSize="sm" pb={4}>
                {i.company}
              </Text>
              <Markdown>{i.description}</Markdown>
            </Card.IndentBox>
          </Card.ListItem>
        ))}
      </Card.OrderedList>
      <Link variant="cta" to="/works">
        {t('ui.works_cta', { ns: 'common' })}
      </Link>
    </Card.Container>
  )
}

export default ExperienceCard
