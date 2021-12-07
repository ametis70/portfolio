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
    width: open || eventsStatus ? 'fit-content' : 4,
    px: 5,
    py: 2,
    textTransform: 'uppercase',
    transition: 'all ease-out 0.3s',
    fontWeight: 'medium',
    _focus: { outline: 'none' },
    variant: eventsStatus ? 'navHover' : 'navButton',
    display: 'flex',
    justifyContent: 'flex-start',
    fontSize: 'sm',
    h: 'fit-content',
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
