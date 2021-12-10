import { useEffect } from 'react'
import { useSpring } from 'framer-motion'
import { Image } from '@chakra-ui/react'

import LogoImage from '../images/logo.inline.svg'
import Block from './Block'

const Logo: React.FC = () => {
  const x = useSpring(0, { stiffness: 15 })
  const y = useSpring(0, { stiffness: 15 })

  useEffect(() => {
    const { matches } = window.matchMedia('(pointer: coarse)')

    if (matches) {
      return
    }

    const mouseMoveHandler = (e: MouseEvent) => {
      x.set(e.screenX * -0.1)
      y.set(e.screenY * -0.1)
    }

    window.addEventListener('pointermove', mouseMoveHandler)

    return () => {
      window.removeEventListener('pointermove', mouseMoveHandler)
    }
  }, [x, y])

  return (
    <Block
      style={{ x, y }}
      right={['-80%', '-80%', '-10%']}
      bottom="-5%"
      pointerEvents="none"
      position="fixed"
      zIndex="1000"
    >
      <Image as={LogoImage} h={['90vh']} opacity={['0.2', '0.2', '0.4']} />
    </Block>
  )
}

export default Logo
