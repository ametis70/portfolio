import { graphql } from 'gatsby'
import { Heading } from '@chakra-ui/react'

import SEO from '../components/Seo'
import Cards from '../components/Cards'
import ContactForm from '../components/ContactForm'
import Block from '../components/Block'

import useI18Next from '../hooks/useI18Next'

const ContactPage: React.FC<LocalizedPageProps> = ({ data, pageContext }) => {
  const { fixedT: t } = useI18Next(pageContext.language, data.allTranslation)

  return (
    <>
      <SEO
        title={t('sections.contact', { ns: 'common' })}
        description={t('seo.contact', { ns: 'common' })}
      />
      <Block>
        <Heading variant="smallcaps" size="sectionTitle">
          {t('sections.contact', { ns: 'common' })}
        </Heading>
      </Block>

      <Cards.Contact t={t} />
      <Block>
        <ContactForm t={t} />
      </Block>
      <Cards.Social t={t} />
    </>
  )
}

export const query = graphql`
  query ($language: String!) {
    allTranslation(filter: { ns: { in: ["contact"] }, language: { eq: $language } }) {
      edges {
        node {
          ...TranslationData
        }
      }
    }
  }
`

export default ContactPage
