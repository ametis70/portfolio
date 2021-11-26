import { Card } from '../Card'
import Markdown from '../Markdown'

const AboutCard: React.VFC<TFunctionProps> = ({ t }) => (
  <Card.Container pad>
    <Markdown>{t('about', { ns: 'about' })}</Markdown>
  </Card.Container>
)

export default AboutCard
