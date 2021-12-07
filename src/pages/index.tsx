import { useIsPresent, Variants } from 'framer-motion'
import { Heading } from '@chakra-ui/react'

import SEO from '../components/Seo'
import MotionBox from '../components/MotionBox'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'
import useDisplay, { displayStatus, displayContentTypes } from '../hooks/useDisplay'
import Link from '../components/Link'

import useI18Next from '../hooks/useI18Next'
import Block from '../components/Block'
import Nav from '../components/Header/Nav'
import Settings from '../components/Header/Settings'
import HeaderGrid from '../components/Header/Grid'

const headingVariants: Variants = {
  exit: { x: '10%', opacity: 0, transition: { duration: 0.1 } },
  enter: {
    transition: { delayChildren: 0.3, staggerChildren: 0.1 },
  },
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
        position="absolute"
        display="block"
        top="0"
        px={0}
        py={0}
        variants={headingVariants}
        exit="exit"
        animate={isPresent ? 'enter' : 'exit'}
        zIndex="1000"
        h="100%"
      >
        <HeaderGrid minH="fit-content" h="calc(100 * var(--vh))">
          <Block>
            <Link
              to="/"
              variant="icon"
              background="transparent"
              pl={4}
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
          </Block>

          <Block>
            <Nav open />
          </Block>
          <Block>
            <Settings open />
          </Block>
        </HeaderGrid>
      </MotionBox>
    </>
  )
}

export default IndexPage
