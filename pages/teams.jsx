/* eslint-disable no-console */
import { useState } from 'react'
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
import CreateOrg from '../components/CreateOrg'
import "../style.scss"
import OrgsDashboard from '../components/OrgsDashboard'
import ConfirmModal from '../components/Modal/ConfirmModal'
import TimedAlert from '../components/Modal/TimedAlert'

const defaultModalState = { active: false, email: '', error: '' }

const Teams = props => {
  const { allowed, config } = props

  const [showConfirmMemberRemove, setShowConfirmMemberRemove] = useState(defaultModalState)
  const [members, setMembers] = useState(props.orgData.members)
  const [showResendAlert, setResendAlert] = useState({ show: false, error: '' })

  function triggerResendAlert(error) {
    setResendAlert({ show: true, error })
    setTimeout(() => setResendAlert({show: false, error: '' }), 3000)
  }

  async function removeMember() {
    try {
      const response = await axios.post(`${getServerHostname()}/org/remove-member`, {
        orgId: props.orgData._id,
        email: showConfirmMemberRemove.email,
      }, config)

      if (response.data === true) {
        const newMembers = members.filter(member => member.email !== showConfirmMemberRemove.email)
        setMembers([...newMembers])
        setShowConfirmMemberRemove(defaultModalState)
      } 

    } catch (error) {
      setShowConfirmMemberRemove({ 
        active: true, 
        email: showConfirmMemberRemove.email, 
        error: error.response.data.message 
      })
    }
   
  }

  return(
    <Layout>
      <Head>
        <title>stew | Teams </title>
        <link rel="icon" href={ 'favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="my stew teams" />
      </Head>
      <ConfirmModal 
        show={ showConfirmMemberRemove.active } 
        closeModal={ () => setShowConfirmMemberRemove(defaultModalState)}
        onNoClick={ () => setShowConfirmMemberRemove(defaultModalState)}
        onYesClick={ () => removeMember() }
        desc={ `Are you sure you want to remove ${showConfirmMemberRemove.email} from this organization?`}
        title='Are you sure?'
        error= { showConfirmMemberRemove.error }
      />
      <TimedAlert show={ showResendAlert.show } error={ showResendAlert.error }>
        <h3> { showResendAlert.error ? `${showResendAlert.error}` : 'Invite re-sent.' } </h3>
      </TimedAlert>
      { allowed && 
        <AuthedAppWrapper>
          <Content isDashboard>
            {
              props.orgData.hasOrg 
              ? <OrgsDashboard 
                  members={ members }
                  _id={ props.orgData._id }
                  isAdmin={ props.orgData.hasOrg }
                  numberOfSeats= { props.orgData.numberOfSeats }
                  config={ config } 
                  onRemoveClick={ (active, email) => setShowConfirmMemberRemove({ active, email }) }
                  afterEmailResend= { triggerResendAlert }
                />
              : <CreateOrg config={ config } />
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
    _id: PropTypes.string,
    isAdmin: PropTypes.bool,
    numberOfSeats: PropTypes.number,
    members: PropTypes.array,
  }),
}

export default withAuthSync(Teams)