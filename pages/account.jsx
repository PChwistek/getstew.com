/* eslint-disable no-console */
import React, { useState }  from 'react'
import Head from 'next/head'
import nextCookie from 'next-cookies'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Header from '../components/LandingHeader'
import TextField from '../components/TextField'
import { redirectOnError } from '../utils/auth'
import getServerHostname from '../utils/getServerHostname'
import { isValidDisplayName } from '../utils/validations'
import Content from '../components/Content'
import Button from '../components/Button'

import axios from 'axios'

import { withAuthSync } from '../utils/auth'
import "../style.scss"

const Account = props => {
  const { allowed } = props
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState(props.username || '')

  async function handleSubmit() {
    const { isValid } = isValidDisplayName(displayName)
    if(isValid) {
      const { access_token } = props
    
      const config = {
        headers: { Authorization: `Bearer ${access_token}` }
      }
  
      const response = await axios.post(`${getServerHostname()}/account/profile`, { username: displayName }, config)
  
      if(response.data) {
        setUsername(displayName)
      }
    }
  }


  function handleKeyUp(e) {
    e.which = e.which || e.keyCode
    if (e.which == 13) {
        handleSubmit()
    }
  }


  return(
    <Layout>
      <Head>
        <title>stew | Account </title>
        <link rel="icon" href={ '../static/favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="my stew account" />
      </Head>
      <Header heroPhotoPath={ '../static/stew-logo.png' } hideItems={ true } showLogout={ true } />
      { allowed && 
        <div>
          <Hero type="grey">
            <Content>
            { username.length > 2
                ? <div style={ { textAlign: 'center', paddingTop: '20%' }}>
                    <h2> { `Welcome, ${username}.` } </h2>
                    <div>
                      <p> Imagine a nice dashboard here :D </p>
                      <div className='account__whisper'> psst... you can use the extension now... </div>
                    </div>
                </div>
                : <div className='account__container content__app'>
                  <div className='account__add-display-name'>
                    <div className='account__add-display-name__prompt'>
                      <h2> One more step!  </h2>
                    </div>
                    <div className='account__add-display-name__prompt--sub'> 
                      <p> Give yourself a display name. </p> 
                    </div>
                    <div className='account__add-display-name__field'>
                      <TextField 
                        autoFocus={ true }
                        type={ 'text' } 
                        label={ 'Display name' } 
                        setValue={ setDisplayName } 
                        value={ displayName }
                        validate={ isValidDisplayName }
                        handleKeyUp={ handleKeyUp }
                      /> 
                    </div>
                    <div className='account__add-display-name__button'>
                      <Button primary onClick={ handleSubmit }>
                        Submit
                      </Button>
                    </div>
                  </div>
                </div>
            }
            </Content>
          </Hero>
        </div>
      }
    </Layout>
  )
  
}

Account.getInitialProps = async ctx => {
  const { access_token } = nextCookie(ctx)
  const config = {
    headers: { Authorization: `Bearer ${access_token}` }
  }
  if(!access_token) {
    redirectOnError(ctx)
  }
  
  const apiUrl =  `${getServerHostname()}/auth/profile/` // getHost(ctx.req) + '/api/profile'
  try {
    const response = await axios.get(apiUrl, config)
    console.log(response)
    return {
      access_token,
      allowed: !!response || false,
      username: response.data.username
    }
  } catch(error) {
    redirectOnError(ctx)
  }
}

Account.propTypes = {
  access_token: PropTypes.string,
  allowed: PropTypes.bool,
  username: PropTypes.string
}

export default withAuthSync(Account)