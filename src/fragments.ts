import { graphql } from 'gatsby'

export const query = graphql`
  fragment TranslationData on Translation {
    ns
    language
    data
  }
  fragment CommonImageFields on DatoCmsFileField {
    basename
    path
  }

  fragment MobileThumbnails on DatoCmsFileField {
    ...CommonImageFields
    gatsbyImageData(
      height: 300
      imgixParams: { h: "300" }
      placeholder: BLURRED
      forceBlurhash: true
    )
  }
  fragment DesktopThumbnails on DatoCmsFileField {
    ...CommonImageFields
    gatsbyImageData(
      width: 300
      imgixParams: { w: "300" }
      placeholder: BLURRED
      forceBlurhash: true
    )
  }
  fragment DesktopScreenshots on DatoCmsFileField {
    ...CommonImageFields
    gatsbyImageData(placeholder: BLURRED, forceBlurhash: true)
  }
  fragment MobileScreenshots on DatoCmsFileField {
    ...CommonImageFields
    gatsbyImageData(placeholder: BLURRED, forceBlurhash: true)
  }
`
