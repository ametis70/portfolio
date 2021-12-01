declare module '*.inline.svg' {
  import React = require('react')
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
  export default SVG
}

declare module '*.svg'
declare module '*.jpg'
declare module '*.png'
declare module '*.json'

// Types

type DisplayContent = {
  status: number
  contentType?: number
  data?: string
}

type PageContext = {
  originalPath: string
  language: string
  defaultLanguage: string
}

type AllTranslationQuery = {
  edges: Array<{
    node: {
      ns: string
      language: string
      data: string
    }
  }>
}

type BundleGetFunction = <T>(namespace: string) => T

type TFunctionProps = {
  t: import('i18next').TFunction
}

type TFunctionWithGetProps = TFunctionProps & {
  get: BundleGetFunction
}

type LocalizedPageProps<T = {}> = import('gatsby').PageProps<
  { allTranslation: AllTranslationQuery } & T,
  { language: string }
>

type DatoCmsEducationItem = {
  start: string
  end?: string
  name: string
  school: string
  link?: string
}

type IGatsbyImageData = import('gatsby-plugin-image').IGatsbyImageData

type DatoCmsImages = Array<{
  path: string
  gatsbyImageData: IGatsbyImageData
}>

// Type for work items in /works page
type WorksIndexData = {
  node: {
    title: string
    slug: string
    finishDate: string
    gradient: string
    logo: {
      // SVG
      path: string
    }
    banner: DatoCmsImages
  }
}

type WorkPageData = {
  title: string
  slug: string
  finishDate: string
  gradient: string
  category: string
  role: string
  description: string
  primaryLink: string
  primaryLinkText: string
  secondaryLink: string
  secondaryLinkText: string
  tags: string
  desktopScreenshots: DatoCmsImages
  mobileScreenshots: DatoCmsImages
  desktopThumbnails: DatoCmsImages
  mobileThumbnails: DatoCmsImages
}
