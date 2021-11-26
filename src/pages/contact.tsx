import { graphql } from 'gatsby'
import { Heading } from '@chakra-ui/react'

import SEO from '../components/Seo'
import Cards from '../components/Cards'
import ContactForm from '../components/ContactForm'

import useI18Next from '../hooks/useI18Next'

const ContactPage: React.FC<LocalizedPageProps> = ({ data, pageContext }) => {
  const { fixedT: t } = useI18Next(pageContext.language, data.allContent)

  return (
    <>
      <SEO title="Contacto" />
      <Heading variant="smallcaps" size="sectionTitle">
        {t('sections.contact')}
      </Heading>

      <Cards.Contact t={t} />
      <ContactForm t={t} />
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
