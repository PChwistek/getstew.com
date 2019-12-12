import React, { useState } from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { login } from '../utils/auth'
import { isValidEmail, isValidPassword } from '../utils/validations'
import SplitPanels, { Panel } from '../components/ContentLayouts/SplitPanels'
import TextField from '../components/TextField'
import Button from '../components/Button'
import "../style.scss"

const Login = () => {
  const [email, setEmail] = useState({ email: '' })
  const [password, setPassword] = useState({ password: '' })

  async function handleSubmit (event) {
    event.preventDefault()
    login({ email, password })
    // const username = userData.username
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
              <TextField type={ 'text' } label={ 'EMAIL' } setValue={ setEmail } setPassword={ setPassword } validate={ isValidEmail } /> 
            </div>
            <div className="split__form-item">
              <TextField type={ 'password' } label={ 'PASSWORD' } setValue={ setPassword } validate={ isValidPassword } />
            </div>
            <div className="split__form-item">
              <Button onClick={ e => handleSubmit(e) }>
                Sign In
              </Button>
            </div>
            <div className="split__form-item">
              <div className="split__small-text">
                <Link href="/passwordreset">
                  <a> Forgot password? </a>
                </Link>
              </div>
            </div>
            <div className="split__form-item--extra-space">
              <div className="split__small-text">
                New to stew? &nbsp;
                <Link href="/sign-up">
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