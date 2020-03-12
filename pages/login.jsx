import React, { useState, createRef } from 'react'
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
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const emailField = createRef()
  const passwordField = createRef()

  async function handleSubmit (event) {
    event.preventDefault()
    const { isValid: validEmail} = isValidEmail(email)
    const { isValid: validPass } = isValidPassword(password)

    if(validEmail && validPass) {
      const response = await login({ email, password })
      if(response.data.error) {
        setError('No account matches these credentials')
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
            <div className={ 'error-text'}> { error } </div>
            <div className="split__form-item">
              <TextField 
                type={ 'text' }
                id={ 'emailField' }
                label={ 'EMAIL' } 
                setValue={ setEmail }
                value={ email }
                handleKeyUp={ handleKeyUp }
                setPassword={ setPassword }
                onEnterValidation={ isValidEmail }
                innerRef={ emailField }
              /> 
            </div>
            <div className="split__form-item">
              <TextField
                id={ 'passwordField' }
                type={ 'password' } 
                label={ 'PASSWORD' }
                handleKeyUp={ handleKeyUp }
                setValue={ setPassword }
                value={ password }
                validate={ isValidPassword } 
                innerRef={ passwordField }
              />
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
              <div className="split__text">
                New to stew? &nbsp;
                <Link href="/sign-up">
                  <a className='split__text--bold'>Sign up</a>
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