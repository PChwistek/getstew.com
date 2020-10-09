import { useState, createRef, Fragment } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { login, loginNoRedirect, auth } from '../../../utils/auth'
import TextField from '../../TextField'
import Link from 'next/link'
import Button from '../../Button'
import Checkbox from '../../Checkbox'
import { isValidEmail, isValidPassword } from '../../../utils/validations'
import { GoogleLogin } from 'react-google-login'
import getServerHostname from '../../../utils/getServerHostname'

const isProd = process.env.environment

const RegistrationForm = (props) => {

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
      const url = `${getServerHostname()}/auth/register`
      try {
        const response = await axios.post(url, { email: email.toLowerCase(), password, newsletter })
        if (response.data) {
          const { data: { access_token } } = response
          if(!props.noRedirect) {
            await login({ token: access_token })
          } else{
            await loginNoRedirect({ token: access_token })
          }
        } else {
          let error = new Error(response.statusText)
          error.response = response
          throw error
        }
        return response
      } catch (error) {
        const { response } = error
        setError(response.data.message)
        return response
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

  async function onSuccessOAuth (response) {
    const { profileObj: { email }, tokenId } = response
    const url = `${getServerHostname()}/auth/oauth`
      try {
        const response = await axios.post(url, { email: email.toLowerCase(), tokenId, newsletter: false })
        if (response.status >= 200 && response.status < 400) {
          const { access_token } = response.data
          if(!props.noRedirect) {
            await login({ token: access_token })
          } else{
            await loginNoRedirect({ token: access_token })
          }
        } 
      } catch(err) {
        setError(err.status === 401 || 'No account with these credentials exists.')        
      }
  }

  async function onFailureOAuth (err) {
    console.log('error', err)
    setError('Could not connect to selected Google OAuth account.')        
  }


  return (
    <Fragment>
      <img src={ '/stew-logo.png' } className={ 'split__image split__image--mobile' }/>
      <div className={ props.responsive ? 'content__app split__form--responsive' :'content__app split__form' }>
      { !props.hideTitle && <h2> Sign Up </h2> }
        <div>
          <GoogleLogin
            clientId='804631623349-i35rpqa3p5b6vfj3c9kohunbutcg9g6d.apps.googleusercontent.com'
            buttonText='Register with Google'
            onSuccess={ (response) => onSuccessOAuth(response) }
            onFailure={ (response) => onFailureOAuth(response) }
            cookiePolicy={ 'single_host_origin' }
            className={ 'split__form-oauth'}
          />
        </div>
        <p className={ 'split__form-or'}> Or </p>
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
            autoComplete={ isProd ? 'email' : 'off' }
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
            autoComplete={ isProd ? 'new-password' : 'off' }
          />
        </div>
        <div className="split__form-item  split__form-item--checkbox">
          <Checkbox label={ 'Subscribe to the stew newsletter' } checked={ newsletter } setValue={ setNewsletter } />
        </div>
        <div className="split__form-item  split__form-item--left-align">
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
        {
          !props.hideAdditionalLink 
            && <div className="split__form-item--extra-space">
                <div className="split__text">
                  Already have an account? &nbsp;
                  <Link href="/login">
                    <a className='split__text--bold'>Sign in</a>
                  </Link>
                </div>
              </div>
        }
        </div>
    </Fragment>
  )
}

RegistrationForm.propTypes = {
  responsive: PropTypes.bool,
  hideAdditionalLink: PropTypes.bool,
  hideTitle: PropTypes.bool,
  noRedirect: PropTypes.bool,
}

export default RegistrationForm
