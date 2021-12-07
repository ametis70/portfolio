import Collapsible, { CollapsibleBaseProps } from './Base'
import Link, { LinkProps } from '../../Link'

import useHoverFocus from '../../../hooks/useHoverFocus'
import { usePageContext } from '../../../hooks/usePageContext'

type CollapsibleLinkProps = Omit<
  CollapsibleBaseProps,
  'WrapperElement' | 'wrapperProps' | 'hoverProps' | 'focusProps' | 'ariaLabel'
> & { to: string }

const CollapsibleLink: React.FC<CollapsibleLinkProps> = ({
  to,
  onClick,
  label,
  Icon,
  iconSize,
  open = false,
}) => {
  const { eventsStatus, hoverProps, focusProps } = useHoverFocus()

  const { originalPath } = usePageContext()
  const active = originalPath!.includes(to)

  const linkStyles: LinkProps = {
    position: 'relative',
    px: '16px',
    py: 4,
    textTransform: 'uppercase',
    transition: 'all ease-out 0.3s',
    fontWeight: 'medium',
    fontSize: 'xl',
    _focus: { outline: 'none' },
    variant: eventsStatus
      ? active
        ? 'navActiveHover'
        : 'navHover'
      : active
      ? 'navActive'
      : 'icon',
    display: 'flex',
    alignItems: 'center',
  }

  return (
    <Collapsible
      WrapperElement={Link}
      hoverProps={hoverProps}
      focusProps={focusProps}
      wrapperProps={{ ...linkStyles, to }}
      onClick={onClick}
      label={label}
      Icon={Icon}
      iconSize={iconSize}
      open={open || eventsStatus}
    />
  )
}

export default CollapsibleLink
