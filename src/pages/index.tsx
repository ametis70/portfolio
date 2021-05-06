import React from 'react'
import { PageProps, Link } from 'gatsby'

import Image from '../components/Image'
import SEO from '../components/Seo'

const IndexPage: React.FC<PageProps> = () => (
  <>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to &quot;Using TypeScript&quot;</Link>
  </>
)

export default IndexPage
