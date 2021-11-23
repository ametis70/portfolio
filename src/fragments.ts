import { graphql } from 'gatsby'

export const query = graphql`
  fragment LocalizedContent on Content {
    ns
    language
    data
  }
`
