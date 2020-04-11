/* eslint-disable no-console */
import React, { useState, useEffect }  from 'react'
import Router from 'next/router'
import Head from 'next/head'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Header from '../components/LandingHeader'
import TextField from '../components/TextField'
import Button from '../components/Button'
import getServerHostname from '../utils/getServerHostname'
import { isValidDisplayName } from '../utils/validations'
import Content from '../components/Content'
import axios from 'axios'
import { getJWT } from '../utils/auth'

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
      <Header heroPhotoPath={ '/stew-logo.png' } hideItems={ true } showLogout={ true } />
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

export function Account() {
  const token = getJWT()
  if(!token) {
    const isClient = typeof document !== 'undefined'
    isClient && Router.replace('/login') 
  }
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }
  
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`${getServerHostname()}/auth/profile`, config)
        setData(result.data)
      } catch(error) {
        setError(error)
      }
    }
    fetchData()
  }, [])

  if(error) {
    const isClient = typeof document !== 'undefined'
    isClient && Router.replace('/login') 
  }
  return (
    <div>
      { data && <AccountPage username={ data.username } allowed={ !!data } config={ config } /> }
    </div>
  )
}

AccountPage.propTypes = {
  config: PropTypes.any,
  allowed: PropTypes.bool,
  username: PropTypes.string
}

export default Account