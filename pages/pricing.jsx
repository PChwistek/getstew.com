import React from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'

class Pricing extends React.Component {

  render() {
    return(
      <Layout>
        <Head>
          <title>stew | Pricing </title>
          <link rel="icon" href={ '../static/favicon.png' } type="image/png" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="stew pricing" />
        </Head>
      </Layout>
    )
  }
}

export default Pricing