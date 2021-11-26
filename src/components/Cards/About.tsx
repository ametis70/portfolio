import { Card } from '../Card'
import Markdown from '../Markdown'

const AboutCard: React.VFC<{ text: string }> = ({ text }) => (
  <Card.Container pad>
    <Markdown>{text}</Markdown>
  </Card.Container>
)

export default AboutCard
