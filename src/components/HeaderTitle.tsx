import React from 'react'
import { Box, Heading } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'

import MotionBox from './MotionBox'
import Link from './Link'

const titleVariants = {}

const subtitleVariants = {
  home: {
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.2,
    },
  },
  top: {
    opacity: 0,
    transition: {
      duration: 1,
      delay: 0,
    },
  },
}

type HeaderTitleProps = {
  isHome?: boolean
}

const HeaderTitle: React.FC<HeaderTitleProps> = ({ isHome = false }) => (
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
