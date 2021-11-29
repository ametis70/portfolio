import ReactMarkdown, { Options } from 'react-markdown'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { Text } from '@chakra-ui/react'
import Link from './Link'

const defaultStyles = {
  p: ({ children }) => (
    <Text fontSize="md" mb={4}>
      {children}
    </Text>
  ),
  a: ({ children, ...props }) => (
    <Link external fontSize="md" variant="body" {...props}>
      {children}
    </Link>
  ),
}

const Markdown: React.FC<
  { children: string; styles?: Record<string, React.FC> } & Options
> = ({ children, styles = {}, ...rest }) => {
  return (
    <ReactMarkdown
      components={ChakraUIRenderer({ ...defaultStyles, ...styles })}
      {...rest}
    >
      {children}
    </ReactMarkdown>
  )
}

export default Markdown
