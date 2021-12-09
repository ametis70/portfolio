const path = require('path')
const axios = require('axios')
const fs = require('fs')
const util = require('util')
const stream = require('stream')
const pipeline = util.promisify(stream.pipeline)

const { siteMetadata } = require('./gatsby-config')
const { i18n } = siteMetadata

const downloadDatoCmsSvg = async (node) => {
  const {
    internal: { owner, type },
  } = node

  if (owner === 'gatsby-source-datocms' && type === 'DatoCmsAsset') {
    const { entityPayload } = node
    if (entityPayload) {
      const { attributes } = entityPayload

      if (attributes.mime_type !== 'image/svg+xml') {
        return
      }

      const p = path.join(process.cwd(), 'public', 'datocms', attributes.path)

      if (fs.existsSync(p)) {
        return
      }

      try {
        pathParts = p.split('/')
        dir = pathParts.splice(0, pathParts.length - 1).join('/')

        if (!fs.existsSync(dir))
          fs.mkdirSync(dir, {
            recursive: true,
          })
      } catch (e) {
        console.error(e)
      }

      try {
        const request = await axios({
          method: 'get',
          url: attributes.url,
          responseType: 'stream',
        })
        await pipeline(request.data, fs.createWriteStream(p))
        console.log(`Downloaded ${p}`)
      } catch (e) {
        console.error(e)
      }
    }
  }
}

const separateDatoCmsTranslations = async (
  node,
  actions,
  createNodeId,
  createContentDigest,
  reporter,
) => {
  const {
    internal: { owner, type },
    id,
  } = node

  if (owner !== 'gatsby-source-datocms' || type !== 'DatoCmsTranslation') {
    return
  }

  const { entityPayload, locale } = node

  if (!entityPayload || !locale || locale !== i18n.defaultLanguage) {
    return
  }

  const { attributes } = entityPayload

  if (!attributes.namespace || !attributes.data) {
    return
  }

  const activity = reporter.activityTimer(
    `Separating translations from DatoCMS: ${attributes.namespace}`,
  )
  activity.start()

  let parsedContent
  try {
    parsedContent = JSON.parse(attributes.data)
  } catch {
    throw new Error(`Unable to parse JSON for namespace: ${namespace}`)
  }

  const singleFileLangs = i18n.languages.filter((l) => parsedContent.hasOwnProperty(l))

  if (singleFileLangs.length === 0) {
    console.warn(
      `Translation for namespace ${attributes.namespace} doesn't have any top level language key`,
    )
  }
  const nodesData = singleFileLangs.map((l) => ({
    language: l,
    data: JSON.stringify(parsedContent[l], undefined, ''),
    ns: attributes.namespace,
  }))

  if (!nodesData) return

  const { createNode, createParentChildLink } = actions

  const contentNodes = nodesData.map((d) => ({
    id: createNodeId(`${id} - ${d.language} >>> Translation`),
    children: [],
    parent: id,
    internal: {
      content: d.data,
      contentDigest: createContentDigest(d.data),
      type: 'Translation',
    },
    language: d.language,
    ns: d.ns,
    data: d.data,
  }))

  contentNodes.forEach((n) => {
    createNode(n)
    createParentChildLink({ parent: node, child: n })
  })

  activity.end()
}

exports.onCreateNode = async ({
  node,
  actions,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  downloadDatoCmsSvg(node)
  separateDatoCmsTranslations(node, actions, createNodeId, createContentDigest, reporter)
}

const createLocalizedPage = async (page, createPage, createRedirect) => {
  await Promise.all(
    i18n.languages.map(async (language) => {
      const originalPath = page.path
      const localizedPath =
        language === i18n.defaultLanguage ? originalPath : `/${language}${page.path}`

      // createRedirect({
      //   fromPath: originalPath,
      //   toPath: localizedPath,
      //   Language: language,
      //   isPermanent: false,
      //   // redirectInBrowser: process.env.NODE_ENV === 'development',
      //   statusCode: 302,
      // })

      await createPage({
        ...page,
        path: localizedPath,
        context: {
          ...page.context,
          originalPath,
          language,
          defaultLanguage: i18n.defaultLanguage,
          isHome: originalPath === '/',
        },
      })
    }),
  )
}

exports.onCreatePage = async ({
  page,
  actions: { createPage, deletePage, createRedirect },
}) => {
  await deletePage(page)
  await createLocalizedPage(page, createPage, createRedirect)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions

  const result = await graphql(`
    query {
      allDatoCmsWork(filter: { locale: { eq: "${i18n.defaultLanguage}" } }) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  // Create pages for each markdown file.
  const WorkTemplate = path.resolve(`src/templates/Work.tsx`)
  result.data.allDatoCmsWork.edges.forEach(async ({ node: { slug } }) => {
    const path = `/works/${slug}`

    await createLocalizedPage(
      {
        path,
        component: WorkTemplate,
        context: {
          slug,
        },
      },
      createPage,
      createRedirect,
    )
  })
}
