import { BiSquare, BiCube } from 'react-icons/bi'
import shallow from 'zustand/shallow'

import CollapsibleNavButton, { CollapsibleButtonProps } from './CollapsibleNavButton'

import usePersistentStore from '../store/persistent'
import useI18Next from '../hooks/useI18Next'

const BackgroundSwitcher: React.FC<Partial<CollapsibleButtonProps>> = ({
  alwaysOpen = false,
}) => {
  const { t } = useI18Next('common')
  const { use3D, toggleUse3D } = usePersistentStore(
    (state) => ({ use3D: state.use3D, toggleUse3D: state.toggleUse3D }),
    shallow,
  )

  if (process.env.GATSBY_DISABLE_3D === 'true') {
    return null
  }

  return (
    <CollapsibleNavButton
      onClick={() => toggleUse3D()}
      ariaLabel={t('ui.switch_to', {
        ns: 'common',
        what: use3D
          ? t('ui.3d_background', { ns: 'common' })
          : t('ui.2d_background', { ns: 'common' }),
      })}
      Icon={use3D ? BiCube : BiSquare}
      label={
        use3D
          ? t('ui.3d_background', { ns: 'common' })
          : t('ui.2d_background', { ns: 'common' })
      }
      alwaysOpen={alwaysOpen}
    />
  )
}

export default BackgroundSwitcher
