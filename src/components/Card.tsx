import { Box, useColorMode } from '@chakra-ui/react'

const Card: React.FC = ({ children }) => {
  const { colorMode } = useColorMode()
  return (
    <Box px={12} w="100%" my={8}>
      <Box bg={colorMode === 'dark' ? 'amethyst.900' : 'amethyst.50'} w="100%" px={4}>
        {children}
      </Box>
    </Box>
  )
}

export default Card
