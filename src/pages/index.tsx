import { useIsPresent, Variants } from 'framer-motion'
import { Heading } from '@chakra-ui/react'

import SEO from '../components/Seo'
import MotionBox from '../components/MotionBox'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'
import useDisplay, { displayStatus, displayContentTypes } from '../hooks/useDisplay'
import Link from '../components/Link'

import useI18Next from '../hooks/useI18Next'

const headingVariants: Variants = {
  exit: { x: '10%', opacity: 0, transition: { duration: 0.1 } },
  enter: { x: '0%', opacity: 1, transition: { duration: 0.2, delay: 0.6 } },
}

const IndexPage: React.FC = () => {
  const { t } = useI18Next()
  const isPresent = useIsPresent()

  useDisplay(displayStatus.ON, displayContentTypes.BLANK)
  useMoveCamera(cameraPositions.CLOSE)

  return (
    <>
      <SEO />
      <MotionBox
        layoutId="index-heading"
        display="block"
        position="absolute"
        top="0"
        px={4}
        py={4}
        variants={headingVariants}
        exit="exit"
        animate={isPresent ? 'enter' : 'exit'}
        initial={{ x: '-10%', opacity: 0 }}
        zIndex="1000"
      >
        <Link
          to="/"
          variant="icon"
          background="transparent"
          _hover={{ background: 'transparent' }}
          tabIndex={1}
        >
          <Heading
            as="h1"
            textTransform="uppercase"
            fontSize={['4xl', '4xl', '5xl']}
            letterSpacing="0.05em"
            fontWeight="normal"
          >
            Ian Mancini
          </Heading>
          <Heading
            w="100%"
            as="h2"
            textTransform="uppercase"
            fontSize={['lg', 'lg', 'xl']}
            letterSpacing="0.065em"
            fontWeight="300"
          >
            {t('job', { ns: 'common' })}
          </Heading>
        </Link>
      </MotionBox>
    </>
  )
}

export default IndexPage
