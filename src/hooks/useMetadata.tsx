import { graphql, useStaticQuery } from 'gatsby'

const useMetadata = () => {
  const siteMetadata = useStaticQuery<{
    site: {
      siteMetadata: {
        name: string
        email: string
        siteUrl: string
        description: string
        author: string
        i18n: {
          languages: string[]
        }
      }
    }
  }>(graphql`
    query MetadataQuery {
      site {
        siteMetadata {
          name
          email
          siteUrl
          description
          author
          i18n {
            languages
          }
        }
      }
    }
  `).site.siteMetadata

  return siteMetadata
}

export default useMetadata
