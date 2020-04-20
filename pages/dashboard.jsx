/* eslint-disable no-console */
import React, { useState }  from 'react'
import Router from 'next/router'
import axios from 'axios'
import nextCookie from 'next-cookies'
import Head from 'next/head'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import TextField from '../components/TextField'
import Button from '../components/Button'
import getServerHostname from '../utils/getServerHostname'
import { isValidDisplayName } from '../utils/validations'
import AuthedAppWrapper from '../components/AuthedAppWrapper'
import Content from '../components/Content'
import { withAuthSync } from '../utils/auth'

import "../style.scss"

const AccountPage = props => {
  const { allowed } = props
  const [displayName, setDisplayName] = useState('')
  const [username, setUsername] = useState(props.username || '')

  async function handleSubmit() {
    const { isValid } = isValidDisplayName(displayName)
    if(isValid) {
      const { config } = props
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
        <link rel="icon" href={ 'favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="my stew account" />
      </Head>
      { allowed && 
        <AuthedAppWrapper>
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
        </AuthedAppWrapper>
      }
    </Layout>
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