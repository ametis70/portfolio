/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { Helmet } from 'react-helmet'
import useI18Next from '../hooks/useI18Next'
import useMetadata from '../hooks/useMetadata'
import { usePageContext } from '../hooks/usePageContext'

type SEOProps = {
  description?: string
  title?: string
  image?: string
  meta?: ConcatArray<
    { name: string; content: string } | { property: string; content: string }
  >
}

const SEO: React.FC<SEOProps> = ({ title, description, image, meta = [] }) => {
  const { t } = useI18Next()
  const metadata = useMetadata()
  const pageContext = usePageContext()

  const computedTitle = title ? `${title} | ${metadata.name}` : metadata.name
  const computedDescription =
    description ?? t('seo.about', { lng: pageContext.language, ns: 'common' })

  return (
    <Helmet
      htmlAttributes={{
        lang: pageContext.language,
      }}
      title={computedTitle}
      meta={[
        {
          name: 'description',
          content: computedDescription,
        },
        {
          property: 'og:title',
          content: computedTitle,
        },
        {
          property: 'og:description',
          content: computedDescription,
        },
        {
          property: 'og:locale',
          content: pageContext.language,
        },
        {
          property: 'og:image',
          content: image ?? `${metadata.siteUrl}/og.jpg`,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: metadata.author || '',
        },
        {
          name: 'twitter:title',
          content: computedTitle,
        },
        {
          name: 'twitter:description',
          content: computedDescription,
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
