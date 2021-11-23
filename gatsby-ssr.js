import Root from './src/components/Root'
import Layout from './src/components/Layout'

export const wrapRootElement = ({ element }) => {
  return <Root element={element} />
}

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}
