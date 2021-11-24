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

type AllContentQuery = {
  edges: Array<{
    node: {
      ns: string
      language: string
      data: string
    }
  }>
}

type BundleGetFunction = <T>(namespace: string) => T

type CardProps = {
  t: import('i18next').TFunction
}

type CardPropsWithGet = CardProps & {
  get: BundleGetFunction
}
