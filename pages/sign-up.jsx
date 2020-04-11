import React, { useState, createRef } from 'react'
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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newsletter, setNewsletter] = useState(false)
  const [error, setError] = useState('')
  // const [agreed, setUserData] = useState({ email: '', password: '', error: '' })

  const emailField = createRef()
  const passwordField = createRef()

  async function handleSubmit (event) {
    event.preventDefault()
    const { isValid: validEmail } = isValidEmail(email)
    const { isValid: validPass } = isValidPassword(password)

    if(validEmail && validPass) {
      const response = await signUp({ email, password, newsletter })
      if(response && response.data.error) {
        setError(response.data.message)
      }
    }
  }

  function handleKeyUp(e) {
    e.which = e.which || e.keyCode
    if (e.which == 13) {
      switch (e.target.id) {
        case "emailField":
          passwordField.current.focus()
          return
        case "passwordField":
          handleSubmit(e)
          return
      }
    } else if (e.which == 40) {
      switch (e.target.id) {
        case "emailField":
          passwordField.current.focus()
          return
      }
    } else if (e.which == 38) {
      switch (e.target.id) {
        case "passwordField":
          emailField.current.focus()
          return
      }
    }
  }

  return(
    <Layout>
      <Head>
        <title>stew | Sign Up </title>
        <link rel="icon" href={ '/favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="stew login" />
      </Head>
      <SplitPanels>
        <Panel left={ true }>
          <img src={ '/stew-logo.png' } className={ 'split__image' }/>
        </Panel>
        <Panel left={ false }>
          <img src={ '/stew-logo.png' } className={ 'split__image split__image--mobile' }/>
          <div className={ 'content__app split__form'}>
            <h2> Sign Up </h2>
            <div className={ 'error-text'}> { error } </div>
            <div className="split__form-item">
              <TextField
                id={ 'emailField' }
                type={ 'text' } 
                label={ 'EMAIL' } 
                setValue={ setEmail }
                value={ email } 
                handleKeyUp= { handleKeyUp }
                onEnterValidation={ isValidEmail }
                innerRef={ emailField }
              /> 
            </div>
            <div className="split__form-item">
              <TextField
                id={ 'passwordField' }
                type={ 'password' } 
                label={ 'PASSWORD' } 
                validate={ isValidPassword }
                handleKeyUp= { handleKeyUp }
                setValue={ setPassword }
                value={ password }
                innerRef={ passwordField }
              />
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
              <div className="split__text">
                Already have an account? &nbsp;
                <Link href="/login">
                  <a className='split__text--bold'>Sign in</a>
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