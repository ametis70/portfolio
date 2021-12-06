import { Button, ButtonProps, Icon as ChakraIcon } from '@chakra-ui/react'
import { useState } from 'react'
import { useFocus, useHover } from '@react-aria/interactions'

import MotionBox from './MotionBox'

import useStore from '../store'
import usePersistentStore from '../store/persistent'

export type CollapsibleButtonProps = {
  ariaLabel: string
  onClick: () => void
  label: string
  Icon: React.FC
  alwaysOpen?: boolean
}

const CollapsibleButton: React.FC<CollapsibleButtonProps> = ({
  ariaLabel,
  onClick,
  label,
  Icon,
  alwaysOpen = false,
}) => {
  const isHome = useStore((state) => state.isHome)
  const [open, setOpen] = useState<boolean>(isHome ?? false)
  const use3D = usePersistentStore((state) => state.use3D)

  const { hoverProps } = useHover({ onHoverChange: (e) => setOpen(e) })
  const { focusProps } = useFocus({ onFocusChange: (e) => setOpen(e) })

  const ButtonStyles: ButtonProps = {
    position: 'relative',
    width: alwaysOpen ? '16px' : 'full',
    px: '32px',
    py: 5,
    textTransform: 'uppercase',
    transition: 'all ease-out 0.3s',
    fontWeight: 'medium',
    _focus: { outline: 'none' },
    variant: open && !alwaysOpen ? 'navHover' : 'navButton',
    display: 'flex',
    alignItems: 'center',
    fontSize: 'xl',
  }

  return (
    <Button
      // @ts-ignore
      {...hoverProps}
      {...focusProps}
      {...ButtonStyles}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <ChakraIcon boxSize={6} as={Icon} />
      <MotionBox
        display="flex"
        position="absolute"
        left="100%"
        h="100%"
        alignItems="center"
        overflow="hidden"
        bg="inherit"
        variants={{
          open: {
            width: alwaysOpen ? '100vw' : 'fit-content',
            paddingLeft: 8,
            paddingRight: 16,
            transition: {
              initial: false,
              duration: 0.2,
              delay: isHome && use3D ? 2 : 0,
            },
          },
          closed: {
            width: 0,
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}
        animate={alwaysOpen || isHome || open ? 'open' : 'closed'}
        fontSize="sm"
      >
        {label}
      </MotionBox>
    </Button>
  )
}
export default CollapsibleButton
