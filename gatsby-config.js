const siteUrl = 'https://ianmancini.com.ar'

module.exports = {
  siteMetadata: {
    title: 'Ian Mancini',
    siteUrl,
    description: 'Ian Mancini is a web designer/developer',
    author: '@ametis70',
  },
  plugins: [
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-svgr-svgo',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/static/images/uploads`,
        ignore: ['**/.*'], // ignore files starting with a dot
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/cms`,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-json',
    'gatsby-transformer-sharp',
    '@chakra-ui/gatsby-plugin',
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/Layout.tsx'),
      },
    },
    {
      resolve: '@ianmethyst/gatsby-plugin-react-i18next',
      options: {
        localeJsonSourceName: 'content',
        languages: ['en', 'es'],
        defaultLanguage: 'en',
        siteUrl,
        i18nextOptions: {
          interpolation: {
            escapeValue: false,
          },
          keySeparator: '.',
          nsSeparator: false,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Ian Mancini',
        short_name: 'ametis70',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-netlify',
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sitemap',
    // "gatsby-plugin-offline",
  ],
}
