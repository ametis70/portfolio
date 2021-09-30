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
    description:
      'Kick off your next, great Gatsby project with this starter. It is based on gatsby-default-starter but with a few extra things.',
    author: '@ianmethyst',
  },
  flags: {
    DEV_SSR: true,
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
    LMDB_STORE: true,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-eslint',
      options: {
        test: /\.[tj]sx?$/,
        rulePaths: [gatsbyRequiredRules],
        exclude: /(_this_is_virtual_fs_path_|node_modules|.cache|public)/,
        stages: ['develop'],
        options: {
          emitWarning: true,
          failOnError: false,
        },
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
    '@chakra-ui/gatsby-plugin',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-ianmethyst',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    'gatsby-plugin-robots-txt',
    'gatsby-plugin-sitemap',
    // "gatsby-plugin-offline",
  ],
}
