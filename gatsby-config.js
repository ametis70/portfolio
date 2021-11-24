const name = 'Ian Mancini'

module.exports = {
  siteMetadata: {
    title: name,
    name,
    birthday: '1998-04-24T00:00:00.000Z',
    email: 'contacto@ianmancini.com.ar',
    siteUrl: 'https://ianmancini.com.ar',
    description: 'Ian Mancini is a web designer/developer',
    author: '@ametis70',
    i18n: {
      filesystemSourceName: 'content',
      languages: ['en', 'es'],
      defaultLanguage: 'en',
    },
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
    'gatsby-transformer-sharp',
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
