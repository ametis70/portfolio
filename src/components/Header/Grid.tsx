import { Grid, GridProps } from '@chakra-ui/react'

const HeaderGrid: React.FC<GridProps> = ({ children, ...props }) => {
  return (
    <Grid
      templateRows="1fr 2fr 1fr"
      templateColumns="100%"
      justifyContent="start"
      h={['fit-content', 'fit-content', '100%']}
      {...props}
    >
      {children}
    </Grid>
  )
}

export default HeaderGrid
