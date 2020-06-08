
import React, { Fragment } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import Header from '../../components/LandingHeader'
import Layout from '../../components/Layout'
import Head from 'next/head'
import getServerHostname from '../../utils/getServerHostname'
import Content from '../../components/Content'
import "../../style.scss"

const AcceptOrgInvite = (props) => {

  return (
    <Layout>
      <Head>
        <title>stew | Accept Organization Invite </title>
        <link rel="icon" href={ '/favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header heroPhotoPath={ '/stew-title.png' } />
      <Content>
      {
        props.success 
          ? <div style={{ marginTop: '20%' }}> 
            <h2>
              Success!
            </h2> 
            <p>
              You are now a part of an organization. If you have an account, <a href='/login'> login </a>. If not, <a href='/sign-up'> sign up!</a>
            </p>
          </div>
          : <div style={{ marginTop: '20%' }}> 
            <h2> 
              This link is either invalid or inactive. Have your organization admin re-send the organization invite.
            </h2>
          </div>
      }
      </Content>
    </Layout>
  )

}


AcceptOrgInvite.getInitialProps = async ctx => {
  const { res, query } = ctx

  if (res) {
    try {
      const axiosConfig = {
        headers: { Authorization: `Bearer ${query.iid}` }
      }
      const response = await axios.post(`${getServerHostname()}/org/accept-invite`, {}, axiosConfig)
      if (response.data.status === 'accepted') {
        return {
          success: true,
        }
      } else if (response.data.response.statusCode === 403) {
        return {
          success: false,
        }
      } else if (response.data.response.statusCode === 404) {
        return {
          success: false,
        }
      }
    } catch(error) {
      return {
        success: false,
      }
    }
  }
}

AcceptOrgInvite.propTypes = {
  success: PropTypes.bool.isRequired,
}

export default AcceptOrgInvite