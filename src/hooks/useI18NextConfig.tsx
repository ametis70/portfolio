import { graphql, useStaticQuery } from 'gatsby'

const useI18NextConfig = () => {
  const data = useStaticQuery<{
    sitePlugin: { pluginOptions: { languages: string[]; defaultLanguage: string } }
  }>(graphql`
    query I18NextConfigQuery {
      sitePlugin(name: { eq: "@ianmethyst/gatsby-plugin-react-i18next" }) {
        pluginOptions
      }
    }
  `)

  return data.sitePlugin.pluginOptions
}

export default useI18NextConfig
