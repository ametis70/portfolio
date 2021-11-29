/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { Helmet } from 'react-helmet'
import useMetadata from '../hooks/useMetadata'
import { usePageContext } from '../hooks/usePageContext'

type SEOProps = {
  description?: string
  meta?: ConcatArray<
    | { name: string; content: string; property?: undefined }
    | { property: string; content: string; name?: undefined }
  >
  title?: string
}

const SEO: React.FC<SEOProps> = ({ title = undefined, meta = [], description = '' }) => {
  const metadata = useMetadata()
  const pageContext = usePageContext()

  const metaDescription = description ?? metadata.description
  const metaTitle = title ?? metadata.name

  return (
    <Helmet
      htmlAttributes={{
        lang: pageContext.language,
      }}
      title={metaTitle}
      titleTemplate={title ? `%s | ${metadata.name}` : '%s'}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: metaTitle,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:locale`,
          content: pageContext.language,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: metadata.author || ``,
        },
        {
          name: `twitter:title`,
          content: metaTitle,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
      link={[
        {
          rel: 'canonical',
          href: `${metadata.siteUrl}/${pageContext.language}${pageContext.originalPath}`,
        },
        {
          rel: 'alternate',
          hrefLang: 'x-default',
          href: `${metadata.siteUrl}/${pageContext.originalPath}`,
        },
        ...metadata.i18n.languages.map((language) => ({
          rel: 'alternate',
          hrefLang: language,
          href: `${metadata.siteUrl}/${language}${pageContext.originalPath}`,
        })),
      ]}
    />
  )
}

export default SEO
