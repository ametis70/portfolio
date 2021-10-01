import { Heading } from '@chakra-ui/react'

import MotionBox from './MotionBox'
import Link from './Link'

const HeaderTitle: React.FC = () => (
  <MotionBox display="block" position="relative" layoutId="headings">
    <Link to="/">
      <Heading
        as="h1"
        textTransform="uppercase"
        fontSize={['xl', '2xl', '5xl']}
        letterSpacing="0.05em"
        fontWeight="normal"
      >
        Ian Mancini
      </Heading>
    </Link>
  </MotionBox>
)

export default HeaderTitle
