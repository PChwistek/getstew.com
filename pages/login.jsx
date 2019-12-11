import React, { useState } from 'react'
import Layout from '../components/Layout'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'
import Link from 'next/link'
import { login } from '../utils/auth'
import SplitPanels, { Panel } from '../components/ContentLayouts/SplitPanels'
import TextField from '../components/TextField'
import Button from '../components/Button'
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
        // https://github.com/developit/unfetch#caveats
        let error = new Error(response.statusText)
        error.response = response
        throw error
      }
    } catch (error) {

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
      <SplitPanels>
        <Panel left={ true }>
          <img src={ '../static/stew-logo.png' } className={ 'split__image' }/>
        </Panel>
        <Panel left={ false }>
          <img src={ '../static/stew-logo.png' } className={ 'split__image split__image--mobile' }/>
          <div className={ 'content__app split__form'}>
            <h2> Sign In </h2>
            <div className="split__form-item">
              <TextField type={ 'text' } label={ 'EMAIL' } /> 
            </div>
            <div className="split__form-item">
              <TextField type={ 'password' } label={ 'PASSWORD' } />
            </div>
            <div className="split__form-item">
              <Button onClick={ e => this.handleSubmit(e) }>
                Sign In
              </Button>
            </div>
            <div className="split__form-item">
              <div className="split__small-text">
                <Link href="/password-reset">
                  <a> Forgot password? </a>
                </Link>
              </div>
            </div>
            <div className="split__form-item--extra-space">
              <div className="split__small-text">
                New to stew? &nbsp;
                <Link href="/signup">
                  <a className='split__small-text--bold'>Sign up</a>
                </Link>
              </div>
            </div>
          </div>
        </Panel>
      </SplitPanels>
    </Layout> 
  )
}



export default Login