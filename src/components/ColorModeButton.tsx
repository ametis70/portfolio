import { BiMoon, BiSun } from 'react-icons/bi'
import { Text, Button, useColorMode } from '@chakra-ui/react'

const ColorModeButton: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const dark = colorMode === 'dark'
  return (
    <Button
      variant="ghost"
      colorScheme="amethyst"
      opacity="0.5"
      px={3}
      fontWeight="regular"
      aria-label={dark ? 'Cambiar a colores claros' : 'Cambiar a colores oscuros'}
      onClick={toggleColorMode}
      leftIcon={dark ? <BiMoon /> : <BiSun />}
      iconSpacing={6}
      fontSize="xl"
      textTransform="uppercase"
    >
      <Text fontSize="sm">{dark ? 'Modo noche' : 'Modo día'}</Text>
    </Button>
  )
}

export default ColorModeButton
