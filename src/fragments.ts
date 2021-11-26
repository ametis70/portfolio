import { graphql } from 'gatsby'

export const query = graphql`
  fragment TranslationData on Translation {
    ns
    language
    data
  }
`
