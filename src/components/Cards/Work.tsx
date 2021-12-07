import {
  Box,
  Flex,
  Icon,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList,
} from '@chakra-ui/react'
import { BiCategoryAlt, BiCalendar, BiWrench } from 'react-icons/bi'
import { Card } from '../Card'
import Markdown from '../Markdown'

const WorkCard: React.VFC<TFunctionProps & { data: WorkPageData }> = ({ t, data }) => {
  const SummaryItem: React.FC<{ icon: React.FC; tKey: string; value: number | string }> =
    ({ icon, tKey, value }) => (
      <Flex as="li" justify="space-between" my={1} fontSize="lg">
        <Flex alignItems="center" pr={4} flex="0 0" opacity={0.7}>
          <Icon as={icon} mr={2} />
          <Text lineHeight="1" textAlign="right">
            {t(tKey, { ns: 'common' })}
          </Text>
        </Flex>
        <Text> {value} </Text>
      </Flex>
    )

  return (
    <Card.Container pad>
      <Box as="ul" pb={6}>
        <SummaryItem icon={BiCategoryAlt} tKey="works.category" value={data.category} />
        <SummaryItem
          icon={BiCalendar}
          tKey="works.date"
          value={new Date(data.finishDate).getUTCFullYear()}
        />
        <SummaryItem icon={BiWrench} tKey="works.role" value={data.role} />
      </Box>

      <UnorderedList listStyleType="none" variant="tagList" pb={4}>
        {data.tags.split(',').map((t) => (
          <ListItem key={t}> {t} </ListItem>
        ))}
      </UnorderedList>

      <Card.Title>{t('works.description', { ns: 'common' })}</Card.Title>
      <Card.Divider />
      {data.description.length < 280 ? (
        <Markdown>{data.description}</Markdown>
      ) : (
        <Card.Truncate t={t}>
          <Card.IndentBox>
            <Markdown>{data.description}</Markdown>
          </Card.IndentBox>
        </Card.Truncate>
      )}
    </Card.Container>
  )
}

export default WorkCard
