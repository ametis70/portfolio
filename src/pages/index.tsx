import { PageProps } from 'gatsby'

import SEO from '../components/Seo'
import MotionBox from '../components/MotionBox'
import HeaderTitle from '../components/HeaderTitle'

import useMoveCamera, { cameraPositions } from '../hooks/useMoveCamera'
import useDisplay, { displayStatus, displayContentTypes } from '../hooks/useDisplay'

const IndexPage: React.FC<PageProps> = () => {
  useDisplay(displayStatus.ON, displayContentTypes.BLANK)
  useMoveCamera(cameraPositions.CLOSE)
  return (
    <>
      <SEO />
      <HeaderTitle />
      <MotionBox
        key="subtitle"
        initial={{ opacity: 0, x: '-10%' }}
        exit={{ opacity: 0, x: '10%' }}
        animate={{ opacity: 1, x: '0%' }}
        transition={{ duration: 0.3 }}
        w="100%"
        textAlign="center"
        as="h2"
        textTransform="uppercase"
        fontSize={['xl', '2xl', '2xl']}
        letterSpacing="0.065em"
        fontWeight="300"
        pb="2rem"
      >
        Diseño Multimedial
      </MotionBox>
    </>
  )
}

export default IndexPage
