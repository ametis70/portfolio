import { graphql, useStaticQuery } from 'gatsby'
import useI18Next from './useI18Next'

const useCommonTranslations = () => {
  const { i18n } = useI18Next()

  const data = useStaticQuery(graphql`
    query {
      allTranslation(filter: { ns: { eq: "common" } }) {
        edges {
          node {
            ...TranslationData
          }
        }
      }
    }
  `)

  data.allTranslation.edges.forEach(({ node: { ns, language, data } }) => {
    if (!i18n.getResourceBundle(language, ns)) {
      i18n.addResourceBundle(language, ns, JSON.parse(data))
    }
  })
}

export default useCommonTranslations
