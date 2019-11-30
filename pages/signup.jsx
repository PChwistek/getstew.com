import React from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'
import "../style.scss"

class SignUp extends React.Component {

  render() {
    return(
      <Layout>
        <Head>
          <title>stew | Sign Up </title>
          <link rel="icon" href={ '../static/favicon.png' } type="image/png" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="stew sign up" />
        </Head>
        <div>
          Login, baby
        </div>
      </Layout>
    )
  }
}

export default SignUp