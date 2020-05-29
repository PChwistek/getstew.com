
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

const AcceptOrgInvite = (props) => {

  return (
    <div>
      Hi
    </div>
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
      console.log('response', response.data)
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

export default AcceptOrgInvite