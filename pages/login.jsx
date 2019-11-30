import React, { useState } from 'react'
import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import Hero from '../components/Hero'
import Header from '../components/LandingHeader'
import { login } from '../utils/auth'
import CenteredPanel from '../components/ContentLayouts/CenteredPanel'
import "../style.scss"

const Login = props => {
  const [userData, setUserData] = useState({ username: '', error: '' })

  async function handleSubmit (event) {
    event.preventDefault()
    setUserData(Object.assign({}, userData, { error: '' }))

    // const username = userData.username
    const username = userData.username
    const password = userData.password
    const url = 'http://localhost:3009/auth/login'

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      if (response.status >= 200 && response.status < 300) {
        const { access_token } = await response.json()
        await login({ access_token })
      } else {
        console.log('Login failed.')
        // https://github.com/developit/unfetch#caveats
        let error = new Error(response.statusText)
        error.response = response
        throw error
      }
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      )

      const { response } = error
      setUserData(
        Object.assign({}, userData, {
          error: response ? response.statusText : error.message
        })
      )
    }
  }

  return(
    <Layout>
      <Head>
        <title>stew | Login </title>
        <link rel="icon" href={ '../static/favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="stew login" />
      </Head>
      <Header heroPhotoPath={ '../static/stew-logo.png' } />
      <Hero type="grey-lg">
        <CenteredPanel>
          Login, baby
        </CenteredPanel>
      </Hero>
    </Layout> 
  )
}



export default Login