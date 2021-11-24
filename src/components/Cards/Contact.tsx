import { graphql, useStaticQuery } from 'gatsby'
import { Text } from '@chakra-ui/react'

import { Card } from '../Card'
import Link from '../Link'

const AboutCard: React.VFC<CardProps> = ({ t }) => {
  const { email } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          email
        }
      }
    }
  `).site.siteMetadata

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
