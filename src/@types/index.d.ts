declare module '*.inline.svg' {
  import React = require('react')
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>
  export default SVG
}

declare module '*.svg'
declare module '*.jpg'
declare module '*.png'
declare module '*.json'
