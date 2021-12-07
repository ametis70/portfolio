import { useEffect } from 'react'

const useLockScroll = (lock: boolean) => {
  useEffect(() => {
    const value = lock ? 'hidden' : ''
    document.documentElement.style.overflow = value
    document.body.style.overflow = value
    return () => {
      document.documentElement.style.overflow = ''
      document.body.style.overflow = ''
    }
  }, [lock])

  return null
}

export default useLockScroll
