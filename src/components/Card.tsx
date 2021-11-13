import { Box } from '@chakra-ui/react'

const Card: React.FC = ({ children }) => {
  return (
    <Box px={12} w="100%" my={8}>
      <Box bg="amethyst.50" w="100%" px={4}>
        {children}
      </Box>
    </Box>
  )
}

export default Card
