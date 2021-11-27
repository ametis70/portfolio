import { Box, Flex, Grid, Heading, Image, Text } from '@chakra-ui/react'
import { useHover } from '@react-aria/interactions'
import { GatsbyImage } from 'gatsby-plugin-image'
import Link from './Link'

const WorksIndexItem: React.VFC<{ data: WorksIndexData }> = ({ data }) => {
  const { title, slug, banner, gradient, logo, finishDate } = data.node

  let { hoverProps, isHovered } = useHover({})

  return (
    <Link to={`/works/${slug}`}>
      <Box
        key={slug}
        position="relative"
        h={32}
        overflow="hidden"
        cursor="pointer"
        {...hoverProps}
      >
        <GatsbyImage
          style={{ height: '100%' }}
          imgStyle={{
            transition: 'transform 0.5s ease-out',
            transform: isHovered ? 'scale(1.25)' : 'scale(1.0)',
          }}
          objectFit="cover"
          alt="replace me"
          image={banner.gatsbyImageData}
        />
        <Box w="full" h="full" bg={gradient} position="absolute" top="0" left="0" />
        <Image
          src={`/datocms/${logo.path}`}
          position="absolute"
          top="50%"
          left="50%"
          height="66%"
          filter="invert()"
          transform="translate(-50%,-50%)"
          opacity={isHovered ? 0 : 1}
          transition="opacity 0.2s ease-in-out"
        />
        <Grid
          gridAutoRows="1fr"
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          opacity={isHovered ? 1 : 0}
          background="rgba(0, 0, 0, 0.40)"
          transition="opacity 0.2s ease-in-out"
          color="white"
        >
          <Box h="100%" />
          <Flex align="center" justify="center">
            <Heading
              as="h3"
              fontSize="md"
              fontWeight="semiBold"
              textTransform="uppercase"
            >
              {title}
            </Heading>
          </Flex>
          <Flex align="center" justify="center">
            <Text fontSize="sm">{new Date(finishDate).getUTCFullYear()}</Text>
          </Flex>
        </Grid>
      </Box>
    </Link>
  )
}

export default WorksIndexItem
