import { useState, createRef, Fragment } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { login, loginNoRedirect } from '../../../utils/auth'
import TextField from '../../TextField'
import Link from 'next/link'
import Button from '../../Button'
import { isValidEmail, isValidPassword } from '../../../utils/validations'
import getServerHostname from '../../../utils/getServerHostname'

const isProd = process.env.environment

const LoginForm = (props) => {

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
      const url = `${getServerHostname()}/auth/login`
      try {
        const response = await axios.post(url, { email: email.toLowerCase(), password })
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

  return (
    <Fragment>
      <img src={ '/stew-logo.png' } className={ 'split__image split__image--mobile' }/>
      <div className={ props.responsive ? 'content__app split__form--responsive' :'content__app split__form'}>
        { !props.hideTitle && <h2> Sign In </h2>}
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
            autoComplete={ isProd ? 'email' : 'off' }
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
            autoComplete={ isProd ? 'current-password' : 'off' }
          />
        </div>
        <div className="split__form-item">
          <Button onClick={ e => handleSubmit(e) }>
            Sign In
          </Button>
        </div>
        <div className="split__form-item">
          <div className="split__text">
            <Link href="/password-reset">
              <a> Forgot password? </a>
            </Link>
          </div>
        </div>
        {
          !props.hideAdditionalLink 
            &&  <div className="split__form-item--extra-space">
            <div className="split__text">
              New to stew? &nbsp;
              <Link href="/sign-up">
                <a className='split__text--bold'>Sign up</a>
              </Link>
            </div>
            </div>
        }
      </div>
    </Fragment>
  )
}

LoginForm.propTypes = {
  responsive: PropTypes.bool,
  hideAdditionalLink: PropTypes.bool,
  hideTitle: PropTypes.bool,
  noRedirect: PropTypes.bool,
}

export default LoginForm
