import { Button, ButtonProps } from '@chakra-ui/react'

import Collapsible, { CollapsibleBaseProps } from './Base'

import useHoverFocus from '../../../hooks/useHoverFocus'

type CollapsibleButtonProps = Omit<
  CollapsibleBaseProps,
  'WrapperElement' | 'wrapperProps' | 'hoverProps' | 'focusProps' | 'iconSize'
>

const CollapsibleButton: React.FC<CollapsibleButtonProps> = ({
  ariaLabel,
  onClick,
  label,
  Icon,
  open = false,
}) => {
  const { eventsStatus, hoverProps, focusProps } = useHoverFocus()

  const ButtonStyles: ButtonProps = {
    position: 'relative',
    width: open || eventsStatus ? 'full' : '16px',
    px: '32px',
    py: 5,
    textTransform: 'uppercase',
    transition: 'all ease-out 0.3s',
    fontWeight: 'medium',
    _focus: { outline: 'none' },
    variant: open || eventsStatus ? 'navHover' : 'navButton',
    display: 'flex',
    alignItems: 'center',
    fontSize: 'sm',
  }

  return (
    <Collapsible
      WrapperElement={Button}
      wrapperProps={ButtonStyles}
      focusProps={focusProps}
      hoverProps={hoverProps}
      ariaLabel={ariaLabel}
      onClick={onClick}
      label={label}
      Icon={Icon}
      iconSize={6}
      open={open || eventsStatus}
    />
  )
}

export default CollapsibleButton
