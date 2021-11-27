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
  lang: string
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

type LocalizedPageProps<T> = import('gatsby').PageProps<
  { allTranslation: AllTranslationQuery } & T,
  { language: string }
>

// Type for work items in /works page
type WorksIndexData = {
  node: {
    title: string
    slug: string
    finishDate: string
    gradient: string
    model: {
      apiKey: string
    }
    logo: {
      path: string
    }
    banner: {
      gatsbyImageData: IGatsbyImageData
    }
  }
}
