import { Stack } from '@chakra-ui/react'

import MotionBox from './MotionBox'
import Link from './Link'

const navVariants = {
  home: {
    transition: {
      delayChildren: 0.5,
      ease: 'easeInOut',
      duration: 0.5,
    },
  },
  top: {
    y: 0,
    x: 0,
    transition: {
      when: 'afterChildren',
      ease: 'easeInOut',
      duration: 0.5,
    },
  },
}

const Nav: React.FC = () => {
  return (
    <Stack
      as={MotionBox}
      layoutId="nav"
      variants={navVariants}
      px={[2, 4, 4]}
      direction="row"
      spacing="2rem"
      fontSize="xl"
      fontWeight="200"
      opacity="0.82"
    >
      <Link to="/services"> Servicios </Link>
      <Link to="/works"> Trabajos </Link>
      <Link to="/cv"> CV </Link>
      <Link to="/contact"> Contacto </Link>
    </Stack>
  )
}

export default Nav
