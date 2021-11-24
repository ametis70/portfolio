import {
  Text,
  Box,
  Divider,
  Heading,
  useColorMode,
  OrderedList,
  ListItem,
} from '@chakra-ui/react'

import Hero from './cards/Hero'
import About from './cards/About'
import Experience from './cards/Experience'
import Skills from './cards/Skills'
import Education from './cards/Education'

export const Card: Record<string, React.FC<any>> = {
  Container: ({ children, pad }) => {
    const { colorMode } = useColorMode()
    return (
      <Box px={12} w="100%" my={4}>
        <Box
          bg={colorMode === 'dark' ? 'amethyst.900' : 'amethyst.50'}
          w="100%"
          px={pad ? 8 : 4}
          py={pad ? 6 : 0}
        >
          {children}
        </Box>
      </Box>
    )
  },

  Title: ({ children }) => (
    <Heading size="cardTitle" variant="smallcaps" as="h3">
      {children}
    </Heading>
  ),

  Divider: () => <Divider mt={2} mb={6} />,

  AltText: ({ children }) => (
    <Text fontSize="sm" variant="cardAlt">
      {children}
    </Text>
  ),

  OrderedList: ({ children }) => (
    <OrderedList padding={0} m={0} listStyleType="none">
      {children}
    </OrderedList>
  ),

  ListItem: ({ children }) => <ListItem pb={4}>{children}</ListItem>,

  MainText: ({ children }) => (
    <Heading size="cardTitle" as="h3" pb={0} fontSize="lg">
      {children}
    </Heading>
  ),

  IndentBox: ({ children }) => (
    <Box pl={4} pt={1}>
      {children}
    </Box>
  ),
}

const Cards = {
  Hero,
  About,
  Experience,
  Skills,
  Education,
}

export default Cards
