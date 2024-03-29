import { ButtonProps, Icon as ChakraIcon, useBreakpointValue } from '@chakra-ui/react'
import { HTMLAttributes } from 'react'
import { LinkProps } from '../../Link'
import MotionBox from '../../MotionBox'

export type CollapsibleBaseProps = {
  WrapperElement: React.FC<any>
  wrapperProps: ButtonProps | LinkProps
  hoverProps: HTMLAttributes<HTMLElement>
  focusProps: HTMLAttributes<HTMLElement>
  ariaLabel?: string
  onClick?: () => void
  label: string
  Icon: React.FC
  iconSize: number
  open?: boolean
}

const CollapsibleBase: React.FC<CollapsibleBaseProps> = ({
  WrapperElement,
  wrapperProps,
  focusProps,
  hoverProps,
  ariaLabel,
  onClick,
  label,
  Icon,
  iconSize,
  open,
}) => {
  const width = useBreakpointValue({ base: '100vw', md: '100vw', lg: 'fit-content' })

  return (
    <WrapperElement
      {...wrapperProps}
      {...hoverProps}
      {...focusProps}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      <ChakraIcon boxSize={iconSize} as={Icon} />
      <MotionBox
        display="flex"
        position="absolute"
        left="100%"
        h="100%"
        alignItems="center"
        overflow="hidden"
        bg="inherit"
        initial={false}
        variants={{
          open: {
            width,
            paddingLeft: 8,
            paddingRight: 16,
            transition: {
              initial: false,
              duration: 0.2,
            },
          },
          closed: {
            width: 0,
            paddingLeft: 0,
            paddingRight: 0,
            transition: {
              duration: 0.2,
            },
          },
        }}
        animate={open ? 'open' : 'closed'}
      >
        {label}
      </MotionBox>
    </WrapperElement>
  )
}

export default CollapsibleBase
