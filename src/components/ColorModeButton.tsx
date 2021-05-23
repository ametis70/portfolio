import React from 'react'
import { BiMoon, BiSun } from 'react-icons/bi'
import { IconButton, useColorMode } from '@chakra-ui/react'

const ColorModeButton: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const dark = colorMode === 'dark'
  return (
    <IconButton
      variant="ghost"
      colorScheme="amethyst"
      opacity="0.5"
      fontSize="xl"
      aria-label={dark ? 'Cambiar a colores claros' : 'Cambiar a colores oscuros'}
      onClick={toggleColorMode}
      icon={dark ? <BiMoon /> : <BiSun />}
    />
  )
}

export default ColorModeButton
