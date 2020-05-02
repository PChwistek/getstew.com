/* eslint-disable no-console */
import React, { useState }  from 'react'
import Router from 'next/router'
import axios from 'axios'
import nextCookie from 'next-cookies'
import Head from 'next/head'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import getServerHostname from '../utils/getServerHostname'
import AuthedAppWrapper from '../components/AuthedAppWrapper'
import Content from '../components/Content'
import AlertModal from '../components/Modal/AlertModal'
import { withAuthSync } from '../utils/auth'

import "../style.scss"

const AccountPage = props => {
  const { allowed, config, username} = props
  const [showUsernameModal, setShowUsernameModal] = useState(props.username.length > 2 ? false: true)

  return(
  <div>
    <Layout>
      <Head>
        <title>stew | Account </title>
        <link rel="icon" href={ 'favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="my stew account" />
      </Head>
      { allowed && 
          <AuthedAppWrapper>
              <Content>
              <div style={ { textAlign: 'center', paddingTop: '20%' }}>
                  <h2> { username ? `Welcome, ${username}.` : 'Welcome.' } </h2>
                  <div>
                    <p> Imagine a nice dashboard here :D </p>
                    <div className='account__whisper'> psst... you can use the extension now... </div>
                  </div>
              </div>
            </Content>
          </AuthedAppWrapper>
      }
      </Layout>
      <AlertModal show={ showUsernameModal } closeModal={ () => setShowUsernameModal(false) } config={ config } />
    </div>
  ) 
}

AccountPage.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx)
  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/login')
      : ctx.res.writeHead(302, { Location: '/login' }).end()

  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    
    const response = await axios.get(`${getServerHostname()}/auth/profile`, config)
    console.log('response', response)
    if (response.statusText >= 200 ** response.statusText < 400) {
      return {
        config,
        allowed: true,
        username: response.data.username
      }
    } else {
      // https://github.com/developit/unfetch#caveats
      return await redirectOnError()
    }

  } catch (error) {
    // Implementation or Network error
    return redirectOnError()
  }
}

AccountPage.propTypes = {
  config: PropTypes.any,
  allowed: PropTypes.bool,
  username: PropTypes.string
}

export default withAuthSync(AccountPage)