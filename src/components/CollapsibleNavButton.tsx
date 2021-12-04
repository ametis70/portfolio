import { Button, ButtonProps, Icon as ChakraIcon } from '@chakra-ui/react'
import { useState } from 'react'
import { useFocus, useHover } from '@react-aria/interactions'
import useStore from '../store'
import MotionBox from './MotionBox'

const CollapsibleButton: React.FC<{
  ariaLabel: string
  onClick: () => void
  label: string
  Icon: React.FC
}> = ({ ariaLabel, onClick, label, Icon }) => {
  const isHome = useStore((state) => state.isHome)
  const [open, setOpen] = useState<boolean>(isHome ?? false)

  const { hoverProps } = useHover({ onHoverChange: (e) => setOpen(e) })
  const { focusProps } = useFocus({ onFocusChange: (e) => setOpen(e) })

  const ButtonStyles: ButtonProps = {
    position: 'relative',
    width: 'full',
    px: '16px',
    py: 5,
    textTransform: 'uppercase',
    transition: 'all ease-out 0.3s',
    fontWeight: 'medium',
    _focus: { outline: 'none' },
    variant: open ? 'navHover' : 'navButton',
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
        w={0}
        variants={{
          open: {
            width: 'fit-content',
            paddingLeft: '0.5rem',
            paddingRight: '0.5rem',
            transition: {
              initial: false,
              duration: 0.2,
              delay: isHome ? 2 : 0,
            },
          },
          closed: {
            width: 0,
            paddingLeft: 0,
            paddingRight: '0',
          },
        }}
        animate={isHome || open ? 'open' : 'closed'}
        fontSize="sm"
      >
        {label}
      </MotionBox>
    </Button>
  )
}
export default CollapsibleButton
