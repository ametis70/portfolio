import { graphql, useStaticQuery } from "gatsby"

const useMetadata = () => {
  const siteMetadata = useStaticQuery(graphql`
    query MetadataQuery {
      site {
        siteMetadata {
          name
          email
        }
      }
    }
  `).site.siteMetadata

  return siteMetadata
}

export default useMetadata
