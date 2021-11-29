import {
  Text,
  Box,
  Divider,
  Heading,
  useColorMode,
  OrderedList,
  ListItem,
  useDisclosure,
  Button,
  Collapse,
  useColorModeValue,
} from '@chakra-ui/react'

import Block from './Block'

export const Card: Record<string, React.FC<any>> = {
  Container: ({ children, pad }) => {
    const { colorMode } = useColorMode()
    return (
      <Block
        px={12}
        w="100%"
        my={4}
      >
        <Box
          bg={colorMode === 'dark' ? 'amethyst.900' : 'amethyst.50'}
          w="100%"
          px={pad ? 8 : 4}
          py={pad ? 6 : 0}
        >
          {children}
        </Box>
      </Block>
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

  Truncate: ({ children, t }) => {
    const { isOpen, onToggle } = useDisclosure()
    const gradient = useColorModeValue(
      'amethyst.light-gradient',
      'amethyst.dark-gradient',
    )

    return (
      <>
        <Collapse startingHeight="6em" in={isOpen} style={{ position: 'relative' }}>
          {children}
          <Box
            position="absolute"
            bottom="0%"
            w="100%"
            h="4.5em"
            bg={gradient}
            opacity={isOpen ? 0 : 1}
            transition="opacity 0.3s ease-out"
          />
        </Collapse>
        <Button my={5} onClick={onToggle} display="block" mx="auto">
          {t(isOpen ? 'ui.show_less' : 'ui.show_more', { ns: 'common' })}
        </Button>
      </>
    )
  },
}

export default Card
