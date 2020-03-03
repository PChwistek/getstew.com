import React, { useState } from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import { signUp } from '../utils/auth'
import { isValidEmail, isValidPassword } from '../utils/validations'
import SplitPanels, { Panel } from '../components/ContentLayouts/SplitPanels'
import TextField from '../components/TextField'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import "../style.scss"

const SignUp = () => {
  const [email, setEmail] = useState({ email: '' })
  const [password, setPassword] = useState({ password: '' })
  const [newsletter, setNewsletter] = useState({ newsletter: false})
  // const [agreed, setUserData] = useState({ email: '', password: '', error: '' })

  async function handleSubmit (event) {
    event.preventDefault()
    signUp({ email, password, newsletter })
  }

  return(
    <Layout>
      <Head>
        <title>stew | Sign Up </title>
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
            <h2> Sign Up </h2>
            <div className="split__form-item">
              <TextField type={ 'text' } label={ 'EMAIL' } validate={ isValidEmail } setValue={ setEmail } /> 
            </div>
            <div className="split__form-item">
              <TextField type={ 'password' } label={ 'PASSWORD' } validate={ isValidPassword } setValue={ setPassword } />
            </div>
            <div className="split__form-item">
              <Checkbox label={ 'Subscribe to the stew newsletter' } checked={ newsletter } setValue={ setNewsletter } />
            </div>
            <div className="split__form-item">
              <div className="split__small-text">
                By clicking Sign Up, you agree to our <a> terms of service </a> and <a> privacy policy. </a> 
                You&apos;ll also receive account-related emails that you can opt out of at any time.
              </div>
            </div>
            <div className="split__form-item">
              <Button onClick={ e => handleSubmit(e) }>
                Sign Up
              </Button>
            </div>
            <div className="split__form-item--extra-space">
              <div className="split__small-text">
                Already have an account? &nbsp;
                <Link href="/login">
                  <a className='split__small-text--bold'>Sign in</a>
                </Link>
              </div>
            </div>
          </div>
        </Panel>
      </SplitPanels>
    </Layout> 
  )
}


export default SignUp