import React from 'react'
import { GatsbyLinkProps } from 'gatsby'
import { Link as GatsbyLink } from 'gatsby'
import { Link as ChakraLink, LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import { usePageContext } from '../hooks/usePageContext'

export type LinkProps = { external?: boolean } & Partial<ChakraLinkProps> &
  Partial<GatsbyLinkProps<null>>

const Link: React.FC<LinkProps> = ({ external = false, href, to, onClick, ...rest }) => {
  const { language, defaultLanguage } = usePageContext()

  try {
    if (external) {
      if (!href) throw new Error('No href prop provided for external link')
      // @ts-ignore
      return <ChakraLink isExternal href={href} {...rest} />
    } else {
      if (!to) throw new Error('No to prop provided for internal link')
      const localizedTo = language !== defaultLanguage ? `/${language}${to}` : to
      return (
        <ChakraLink
          // @ts-ignore
          as={GatsbyLink}
          hrefLang={language}
          onClick={(e) => {
            if (onClick) onClick(e)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          to={localizedTo}
          {...rest}
        />
      )
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

export default Link
