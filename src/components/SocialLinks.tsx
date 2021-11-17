import { Stack, Icon } from '@chakra-ui/react'
import { BsTwitter, BsLinkedin, BsGithub } from 'react-icons/bs'

import Link from './Link'

type SocialLinkProps = { key: string; href: string; icon: React.FC }

const links: SocialLinkProps[] = [
  {
    key: 'github',
    icon: BsGithub,
    href: 'https://github.com/ametis70',
  },
  {
    key: 'linkedin',
    icon: BsLinkedin,
    href: 'https://www.linkedin.com/in/ian-mancini/',
  },
  {
    key: 'twitter',
    icon: BsTwitter,
    href: 'https://twitter.com/ametis70',
  },
]

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon }) => {
  return (
    <Link
      external
      href={href}
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="36px"
      h="36px"
      _hover={{ background: 'amethyst.100' }}
    >
      <Icon as={icon} fontSize="xl" lineHeight="1" />
    </Link>
  )
}

const SocialLinks: React.FC = () => {
  return (
    <Stack direction="row" spacing={2}>
      {links.map((link) => (
        <SocialLink key={link.key} href={link.href} icon={link.icon} />
      ))}
    </Stack>
  )
}

export default SocialLinks
