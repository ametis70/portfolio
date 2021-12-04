import { BiSquare, BiCube } from 'react-icons/bi'
import shallow from 'zustand/shallow'

import CollapsibleNavButton from './CollapsibleNavButton'

import usePersistentStore from '../store/persistent'
import useI18Next from '../hooks/useI18Next'

const BackgroundSwitcher: React.FC = () => {
  const { t } = useI18Next('common')
  const { use3D, toggleUse3D } = usePersistentStore(
    (state) => ({ use3D: state.use3D, toggleUse3D: state.toggleUse3D }),
    shallow,
  )

  return (
    <CollapsibleNavButton
      onClick={() => toggleUse3D()}
      ariaLabel={t('ui.switch_to', {
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
    />
  )
}

export default BackgroundSwitcher
