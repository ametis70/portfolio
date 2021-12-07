import { useState } from 'react'
import { useFocus, useHover } from '@react-aria/interactions'

const useHoverFocus = (initial?: boolean) => {
  const [eventsStatus, setEventsStatus] = useState<boolean>(initial ?? false)

  const { hoverProps } = useHover({ onHoverChange: (e) => setEventsStatus(e) })
  const { focusProps } = useFocus({ onFocusChange: (e) => setEventsStatus(e) })

  return { eventsStatus, hoverProps, focusProps }
}

export default useHoverFocus
