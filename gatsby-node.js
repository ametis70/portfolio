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
    id: createNodeId(`${id} >>> Content`),
    children: [],
    parent: id,
    internal: {
      content: d.data,
      contentDigest: createContentDigest(d.data),
      type: 'Content',
    },
    language: d.language,
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
