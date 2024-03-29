import { Grid } from '@chakra-ui/react'
import WorksIndexItem from './WorksIndexItem'

const WorksIndex: React.VFC<{ data: WorksIndexData[] }> = ({ data }) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4} layerStyle="container">
      {data.map((item) => (
        <WorksIndexItem key={item.node.slug} data={item} />
      ))}
    </Grid>
  )
}

export default WorksIndex
