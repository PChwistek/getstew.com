/* eslint-disable no-console */
import React from 'react'
import Head from 'next/head'
import Router from 'next/router'
import fetch from 'isomorphic-unfetch'
import nextCookie from 'next-cookies'

import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Header from '../components/Header'
import { withAuthSync } from '../utils/auth'
// import getHost from '../utils/get-host'

class Account extends React.Component {

  render() {
    return(
      <Layout>
        <Head>
          <title>stew | Account </title>
          <link rel="icon" href={ '../static/favicon.png' } type="image/png" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="my stew account" />
        </Head>
        <Header heroPhotoPath={ '../static/stew-logo.png' } />
        <Hero type="grey">
          this is the account
        </Hero>
      </Layout>
    )
  }
}

Account.getInitialProps = async ctx => {
  const { access_token } = nextCookie(ctx)
  console.log('wrapped', access_token)
  const apiUrl =  'http://localhost:3009/auth/profile/' // getHost(ctx.req) + '/api/profile'

  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/')
      : ctx.res.writeHead(302, { Location: '/' }).end()

  const bearer = 'Bearer ' + access_token;

  try {
    const response = await fetch(apiUrl, {
      withCredentials: true,
      credentials: 'include',
      headers: {
          'Authorization': bearer,
          'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      const js = await response.json()
      console.log('js', js)
      return js
    } else {
      // https://github.com/developit/unfetch#caveats
      return await redirectOnError()
    }
  } catch (error) {
    // Implementation or Network error
    return redirectOnError()
  }
}

export default withAuthSync(Account)