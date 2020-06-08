/* eslint-disable no-console */
import Router from 'next/router'
import axios from 'axios'
import nextCookie from 'next-cookies'
import Head from 'next/head'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import getServerHostname from '../utils/getServerHostname'
import AuthedAppWrapper from '../components/AuthedAppWrapper'
import Content from '../components/Content'
import { withAuthSync } from '../utils/auth'
import Button from '../components/Button'

import "../style.scss"

const PurchaseSuccess = props => {
  const { allowed } = props

  return(
    <Layout>
      <Head>
        <title>stew | Purchase Success </title>
        <link rel="icon" href={ 'favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="stew Support" />
      </Head>
      { allowed && 
        <AuthedAppWrapper>
            <Content>
            <div className='teams__intro'>
              <div className='teams__title'>
                <img src='/sboy_cannons2.png' className='teams__cannons' />
                <h2> You&apos;re all set. </h2>
              </div>
              <div className='teams__button'>
                <Button primary onClick={ () => Router.push('/teams') }>
                  Set up your team.
                </Button>
              </div>
            </div>
            </Content>
        </AuthedAppWrapper>
      }
    </Layout>
  ) 
}

PurchaseSuccess.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx)
  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/login')
      : ctx.res.writeHead(302, { Location: '/login' }).end()

  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    
    const response = await axios.get(`${getServerHostname()}/auth/validate`, config)
    if (response.statusText >= 200 ** response.statusText < 400) {
      return {
        allowed: true,
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

PurchaseSuccess.propTypes = {
  allowed: PropTypes.bool
}

export default withAuthSync(PurchaseSuccess)