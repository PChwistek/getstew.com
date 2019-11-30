/* eslint-disable no-console */
import React from 'react'
import Head from 'next/head'
import nextCookie from 'next-cookies'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Header from '../components/LandingHeader'
import { withAuthSync, getAuthorizedContent } from '../utils/auth'
import "../style.scss"

const Account = props => {
  const { allowed } = props
  return(
    <Layout>
      <Hero type="grey">
      { allowed && 
        <div>
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
        </div>
      }
      </Hero>
    </Layout>
  )
  
}

Account.getInitialProps = async ctx => {
  const { access_token } = nextCookie(ctx)
  
  const apiUrl =  'http://localhost:3009/auth/profile/' // getHost(ctx.req) + '/api/profile'
  const response = await getAuthorizedContent(apiUrl, access_token, ctx)

  return {
    allowed: response.ok || false
  }
 
}

Account.propTypes = {
  allowed: PropTypes.bool
}

export default withAuthSync(Account)