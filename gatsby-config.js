const path = require('path')
// Get paths of Gatsby's required rules, which as of writing is located at:
// https://github.com/gatsbyjs/gatsby/tree/fbfe3f63dec23d279a27b54b4057dd611dce74bb/packages/
// gatsby/src/utils/eslint-rules
const gatsbyRequiredRules = path.join(
  process.cwd(),
  'node_modules',
  'gatsby',
  'dist',
  'utils',
  'eslint-rules',
)

module.exports = {
  siteMetadata: {
    title: 'Ian Mancini',
    siteUrl: 'https://ianmancini.com.ar',
    description: 'Ian Mancini is a web designer/developer',
    author: '@ametis70',
  },
  flags: {
    DEV_SSR: true,
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
    LMDB_STORE: true,
  },
  plugins: [
    `gatsby-plugin-netlify-cms`,
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        extensions: ['ts', 'tsx', 'js', 'jsx'],
        rulePaths: [gatsbyRequiredRules],
        exclude: ['node_modules', '.cache', 'public'],
        stages: ['develop'],
        emitWarning: true,
        failOnError: false,
      },
    },
    'gatsby-plugin-typescript',
    'gatsby-plugin-svgr-svgo',
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-plugin-layout',
      options: {
        component: require.resolve('./src/components/Layout.tsx'),
      },
    },
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    '@chakra-ui/gatsby-plugin',
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
