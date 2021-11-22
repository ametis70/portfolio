import React from 'react'
import { GatsbyLinkProps } from 'gatsby'
import { useTranslation } from 'react-i18next'
import { Link as GatsbyLink } from 'gatsby'
import {
  chakra,
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react'
import useI18NextConfig from '../hooks/useI18NextConfig'

export type LinkProps = { external?: boolean } & Partial<ChakraLinkProps> &
  Partial<GatsbyLinkProps<null>>

const GatsbyExtendedLink = chakra(GatsbyLink)

const Link: React.FC<LinkProps> = ({ external = false, href, to, ...rest }) => {
  const { i18n } = useTranslation()
  const { defaultLanguage } = useI18NextConfig()

  try {
    if (external) {
      if (!href) throw new Error('No href prop provided for external link')
      // @ts-ignore
      return <ChakraLink isExternal href={href} {...rest} />
    } else {
      if (!to) throw new Error('No to prop provided for internal link')
      // @ts-ignore
      const localizedTo =
        i18n.language !== defaultLanguage ? `/${i18n.language}${to}` : to
      return <GatsbyExtendedLink hrefLang={i18n.language} to={localizedTo} {...rest} />
    }
  } catch (e) {
    console.error(e)
    return null
  }
}

export default Link
