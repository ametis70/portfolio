import { Stack, Icon } from '@chakra-ui/react'
import { TFunction } from 'i18next'
import { BsTwitter, BsLinkedin, BsGithub } from 'react-icons/bs'
import useMetadata from '../hooks/useMetadata'

import Link from './Link'

type SocialLinkProps = { website: string; href: string; icon: React.FC }

const links: SocialLinkProps[] = [
  {
    website: 'GitHub',
    icon: BsGithub,
    href: 'https://github.com/ametis70',
  },
  {
    website: 'LinkedIn',
    icon: BsLinkedin,
    href: 'https://www.linkedin.com/in/ian-mancini/',
  },
  {
    website: 'Twitter',
    icon: BsTwitter,
    href: 'https://twitter.com/ametis70',
  },
]

const SocialLink: React.FC<{ t: TFunction } & SocialLinkProps> = ({
  t,
  href,
  icon,
  website,
}) => {
  const { name } = useMetadata()

  return (
    <Link
      external
      href={href}
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="36px"
      h="36px"
      variant="icon"
      target="_blank"
      aria-label={t('ui.social_link', {
        name,
        website,
        in: t('connectors.in', { ns: 'common' }),
        ns: 'common',
      })}
    >
      <Icon as={icon} fontSize="xl" lineHeight="1" />
    </Link>
  )
}

const SocialLinks: React.FC<{ t: TFunction }> = ({ t }) => {
  return (
    <Stack direction="row" spacing={2}>
      {links.map((link) => (
        <SocialLink
          t={t}
          key={link.website}
          website={link.website}
          href={link.href}
          icon={link.icon}
        />
      ))}
    </Stack>
  )
}

export default SocialLinks
