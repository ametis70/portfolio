/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react'
import { GatsbyLinkProps } from 'gatsby'
import { Link as GatsbyLink } from 'gatsby-plugin-react-i18next'

import {
  chakra,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'

export type LinkProps = { external?: boolean } & Partial<ChakraLinkProps> &
  Partial<GatsbyLinkProps<null>>

const GatsbyExtendedLink = chakra(GatsbyLink)

const Link: React.FC<LinkProps> = ({ external = false, href, to, ...rest }) => {
  try {
    if (external) {
      if (!href) throw new Error('No href prop provided for external link')
      // @ts-ignore
      return <ChakraLink isExternal href={href} {...rest} />
    } else {
      if (!to) throw new Error('No to prop provided for internal link')
      // @ts-ignore
      return <GatsbyExtendedLink to={to} {...rest} />
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

export default Link
