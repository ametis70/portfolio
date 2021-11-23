import { graphql, useStaticQuery } from 'gatsby'

const useI18NextConfig = () => {
  const data = useStaticQuery<{
    site: { siteMetadata: { i18n: { languages: string[]; defaultLanguage: string } } }
  }>(graphql`
    query I18NextConfigQuery {
      site {
        siteMetadata {
          i18n {
            languages
            defaultLanguage
          }
        }
      }
    }
  `)

  return data.site.siteMetadata.i18n
}

export default useI18NextConfig
