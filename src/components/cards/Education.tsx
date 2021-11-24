import { printAgeRange } from '../../util'
import { Card } from '../Card'

type EducationItemProps = {
  start: string
  end?: string
  name: string
  school: string
  link?: string
}

type EducationData = {
  college: EducationItemProps[]
  certifications: EducationItemProps[]
}

const EducationCard: React.VFC<CardPropsWithGet> = ({ t, get }) => {
  const data = get<EducationData>('education')

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
      <Card.AltText>{t('subtitles.college', { ns: 'common' })}</Card.AltText>
      {data.college.map((item) => (
        <EducationItem item={item} />
      ))}
      <Card.AltText>{t('subtitles.certificates', { ns: 'common' })}</Card.AltText>
      {data.certifications.map((item) => (
        <EducationItem item={item} />
      ))}
    </Card.Container>
  )
}

export default EducationCard
