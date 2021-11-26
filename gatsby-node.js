const path = require('path')
const axios = require('axios')
const fs = require('fs')
const util = require('util')
const stream = require('stream')
const pipeline = util.promisify(stream.pipeline)

const downloadDatoCmsSvg = async (node) => {
  if (
    node.internal.owner === 'gatsby-source-datocms' &&
    node.internal.type === 'DatoCmsAsset'
  ) {
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

const { siteMetadata } = require('./gatsby-config')
const { i18n } = siteMetadata

const getTypeOfLocalizedCollection = (node) => {
  let type
  const setType = (t) => {
    if (!type) {
      type = t
      return
    }
    throw new Error(
      `Cannot determine type of localized collection in Netlify CMS: ${type} & ${t} `,
    )
  }

  if (i18n.languages.find((l) => node.base.includes(`.${l}.`))) {
    setType('multiple_files')
  }
  if (i18n.languages.find((l) => l === node.relativeDirectory)) {
    setType('multiple_folders')
  }

  if (!type) {
    type = 'single_file'
  }

  return type
}

exports.onCreateNode = async ({
  node,
  actions,
  loadNodeContent,
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  await downloadDatoCmsSvg(node)

  const {
    absolutePath,
    internal: { owner, type, mediaType },
    sourceInstanceName,
    relativeDirectory,
    name,
    id,
  } = node

  if (
    owner !== 'gatsby-source-filesystem' ||
    type !== 'File' ||
    mediaType !== 'application/json' ||
    sourceInstanceName !== i18n.filesystemSourceName
  ) {
    return
  }

  const activity = reporter.activityTimer(
    `Parsing json from Netlify CMS: ${relativeDirectory}/${name}`,
  )
  activity.start()

  const colletionType = getTypeOfLocalizedCollection(node)
  const content = await loadNodeContent(node)

  let parsedContent

  try {
    parsedContent = JSON.parse(content)
  } catch {
    const hint = node.absolutePath ? `file ${node.absolutePath}` : `in node ${node.id}`
    throw new Error(`Unable to parse JSON: ${hint}`)
  }

  let nodesData

  const stringify = (data) => JSON.stringify(data, undefined, '')

  switch (colletionType) {
    case 'single_file':
      singleFileLangs = i18n.languages.filter((l) => parsedContent.hasOwnProperty(l))
      if (singleFileLangs.length === 0) {
        console.warn(
          `File ${absolutePath} was detected as single_file collection but has no top level language key`,
        )
        break
      }
      nodesData = singleFileLangs.map((l) => ({
        language: l,
        data: stringify(parsedContent[l]),
      }))
      break
    case 'multiple_folders':
      nodesData = [{ language: relativeDirectory, data: stringify(parsedContent) }]
      break
    case 'multiple_files':
      const _lang = name.split('.')
      nodesData = [
        {
          language: _lang[_lang.length - 1],
          data: stringify(parsedContent),
          ns: _lang.splice(0, _lang.length - 1).join(''),
        },
      ]
      break
  }

  if (!nodesData) return

  const { createNode, createParentChildLink } = actions

  const contentNodes = nodesData.map((d) => ({
    id: createNodeId(`${id} - ${d.language} >>> Content`),
    children: [],
    parent: id,
    internal: {
      content: d.data,
      contentDigest: createContentDigest(d.data),
      type: 'Content',
    },
    language: d.language,
    collectionType: d.contentType,
    ns: d.ns ?? name,
    data: d.data,
    fileAbsolutePath: absolutePath,
  }))

  contentNodes.forEach((n) => {
    createNode(n)
    createParentChildLink({ parent: node, child: n })
  })

  activity.end()
}

exports.onCreatePage = async ({ page, actions: { createPage, deletePage } }) => {
  await deletePage(page)

  await Promise.all(
    i18n.languages.map(async (language) => {
      const originalPath = page.path
      const localizedPath =
        language === i18n.defaultLanguage ? originalPath : `/${language}${page.path}`

      await createPage({
        ...page,
        path: localizedPath,
        context: {
          ...page.context,
          originalPath,
          language,
        },
      })
    }),
  )
}
