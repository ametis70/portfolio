import { useColorMode } from '@chakra-ui/react'
import { useTranslation } from 'react-i18next'
import { BiUser, BiBriefcase, BiMessageDetail } from 'react-icons/bi'

import MotionBox from '../MotionBox'
import Collapsibles from './Collapsibles'

const Nav: React.FC<{ open?: boolean; onClick?: () => void }> = ({
  open = false,
  onClick,
}) => {
  const { t } = useTranslation('common')
  const { colorMode } = useColorMode()

  const defaultProps = { open, onClick, iconSize: 8 }

  return (
    <MotionBox
      as="nav"
      display="flex"
      fontSize="xl"
      flexDirection="column"
      alignItems="flex-start"
      justifyContent="center"
      w="full"
      color={colorMode === 'dark' ? 'amethyst.50' : 'amethyst.900'}
    >
      <Collapsibles.Link
        to="/about"
        Icon={BiUser}
        label={t('sections.about')}
        {...defaultProps}
      />
      <Collapsibles.Link
        to="/works"
        Icon={BiBriefcase}
        label={t('sections.works')}
        {...defaultProps}
      />
      <Collapsibles.Link
        to="/contact"
        Icon={BiMessageDetail}
        label={t('sections.contact')}
        {...defaultProps}
      />
    </MotionBox>
  )
}

export default Nav
