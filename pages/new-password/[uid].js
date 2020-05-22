import React, { Fragment } from 'react'
import axios from 'axios'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Header from '../../components/LandingHeader'
import Layout from '../../components/Layout'
import Head from 'next/head'
import getServerHostname from '../../utils/getServerHostname'
import PasswordResetForm from '../../components/Form/PasswordResetForm'
import SplitPanels, { Panel } from '../../components/ContentLayouts/SplitPanels'
import Content from '../../components/Content'
import "../../style.scss"

const NewPassword = (props) => {

  const { timedOut, axiosConfig } = props

  return (
    <Layout>
      <Head>
        <title>stew | Password Reset </title>
        <link rel="icon" href={ '/favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {
        !timedOut
          ? <SplitPanels>
            <Panel left={ true }>
              <Link href={ '/' }>
                <img src={ '/stew-logo.png' } className={ 'split__image' }/>
              </Link>
            </Panel>
            <Panel left={ false } >
              <PasswordResetForm axiosConfig={ axiosConfig } />
            </Panel>
          </SplitPanels>
          : <Fragment> 
              <Header heroPhotoPath={ '/stew-title.png' } />
            <Content>
              <div style={{ 'marginTop': '30%' }}>
                <h2> Link either timed out or is invalid. </h2>
              </div>
            </Content>
          </Fragment>
      }
      
    </Layout>
  )
}

NewPassword.getInitialProps = async ctx => {
  const { res, query } = ctx

  if (res) {
    try {
      const axiosConfig = {
        headers: { Authorization: `Bearer ${query.uid}` }
      }
      const response = await axios.get(`${getServerHostname()}/auth/validate/`, axiosConfig)

      if (response.data == true) {
        return {
          timedOut: false,
          axiosConfig,
        }
      } else if (response.data.response.statusCode === 403) {
        res.statusCode = 403
        res.end('Forbidden')
        return
      } else if (response.data.response.statusCode === 404) {
        res.statusCode = 404
        res.end('Not found')
        return
      }
    } catch(error) {
      return {
        timedOut: true,
        axiosConfig: {}
      }
    }
  }
}

NewPassword.propTypes = {
  timedOut: PropTypes.bool.isRequired,
  axiosConfig: PropTypes.shape({ headers: PropTypes.object }),
}
 

export default NewPassword