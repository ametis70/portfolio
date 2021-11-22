import ReactMarkdown, { Options } from 'react-markdown'
import ChakraUIRenderer from 'chakra-ui-markdown-renderer'
import { Text } from '@chakra-ui/react'

const defaultStyles = {
  p: ({ children }) => <Text mb={4}>{children}</Text>,
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
