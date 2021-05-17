import React from 'react'
import { Link as GatsbyLink, GatsbyLinkProps } from 'gatsby'
import {
  chakra,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'

type LinkProps = { external?: boolean } & ChakraLinkProps & GatsbyLinkProps<null>

const GatsbyExtendedLink = chakra(GatsbyLink)

const Link: React.FC<LinkProps> = ({ external = false, href, to, ...rest }) => {
  try {
    if (external) {
      if (!href) throw new Error('No href prop provided for external link')
      return <ChakraLink href={href} {...rest} />
    } else {
      if (!to) throw new Error('No to prop provided for internal link')
      return <GatsbyExtendedLink to={to} {...rest} />
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

export default Link
