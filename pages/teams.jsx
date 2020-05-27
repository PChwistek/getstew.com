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
import Checkout from '../components/Checkout'
import "../style.scss"
import OrgsDashboard from '../components/OrgsDashboard'

const Teams = props => {
  const { allowed, config, orgData } = props
  console.log('orgs', orgData)
  return(
    <Layout>
      <Head>
        <title>stew | Teams </title>
        <link rel="icon" href={ 'favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="my stew teams" />
      </Head>
      { allowed && 
        <AuthedAppWrapper>
          <Content isDashboard>
            {
              orgData.hasOrg 
              ? <OrgsDashboard orgData={ orgData } config={ config } />
              : <Checkout config={ config } />
            }
          </Content>
        </AuthedAppWrapper>
      }
    </Layout>
  ) 
}

Teams.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx)
  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/login')
      : ctx.res.writeHead(302, { Location: '/login' }).end()

  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    
    const response = await axios.get(`${getServerHostname()}/org/dashboard`, config)
    if (response.statusText >= 200 ** response.statusText < 400) {
      return {
        allowed: true,
        orgData: response.data,
        config,
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

Teams.propTypes = {
  allowed: PropTypes.bool,
  config: PropTypes.shape({ headers: PropTypes.object }),
  orgData: PropTypes.shape({
    hasOrg: PropTypes.bool,
  })
}

export default withAuthSync(Teams)