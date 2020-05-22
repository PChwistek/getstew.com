import React, { createRef, useState } from 'react'
import axios from 'axios'
import Layout from '../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import SplitPanels, { Panel } from '../components/ContentLayouts/SplitPanels'
import TextField from '../components/TextField'
import Button from '../components/Button'
import { isValidEmail } from '../utils/validations'
import getServerHostname from '../utils/getServerHostname'
import Content from '../components/Content'
import "../style.scss"
import Router from 'next/router'

const PasswordReset = () => {
  const [email, setUserEmail] = useState('')
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const emailField = createRef()

  async function handleReset() {
    const { isValid: validEmail } = isValidEmail(email)
    const url = `${getServerHostname()}/auth/reset-request`

    if (validEmail) {
      try {
        await axios.post(url, { email })
        setSuccess(true)
        return
      } catch (error) {
        const { response } = error
        setSuccess(true)
        return response
      }
    } 
    setError(validEmail)
  }

  function handleKeyUp(e) {
    e.which = e.which || e.keyCode
    if (e.which == 13) {
      switch (e.target.id) {
        case "emailField":
          handleReset()
          return
      }
    }
  }

  return(
    <Layout>
      <Head>
        <title>stew | Password Change </title>
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
          {
            success 
              ? <Content>
              <div className='split__form__message'>
                <h2> We&apos;ve sent you an email with instructions to reset your password. </h2>
                <div style={{ 'marginTop': '30px' }}>
                  <Button onClick={ () => Router.push('/login') }>
                    Go to login
                  </Button>
                </div>
              </div>
              </Content>
              : <div className={ 'content__app split__form'}>
                  <h2> Let&apos;s get your stew back! </h2>
                  <div className={ 'split__form-item split__text' }>
                    We&apos;ll send you an email with instructions to reset your password if you have an email associated with an account.
                  </div>
                  <div className="split__form-item">
                    <div className={ 'error-text'}> { error } </div>
                    <TextField 
                      type={ 'text' }
                      id='emailField' 
                      label={ 'EMAIL' } 
                      value={ email } 
                      setValue={ setUserEmail }
                      onEnterValidation={ isValidEmail }
                      validate={ isValidEmail } 
                      handleKeyUp={ handleKeyUp }
                      innerRef={ emailField }
                    /> 
                  </div>
                  <div className="split__form-item">
                    <Button onClick={ () => handleReset() }>
                      Reset
                    </Button>
                  </div>
                  <div className="split__form-item--extra-space">
                    <div className="split__text">
                      Know your password? &nbsp;
                      <Link href="/login">
                        <a className='split__small-text--bold'>Sign in</a>
                      </Link>
                    </div>
                  </div>
              </div>
          }
        </Panel>
      </SplitPanels>
    </Layout> 
  )
}


export default PasswordReset