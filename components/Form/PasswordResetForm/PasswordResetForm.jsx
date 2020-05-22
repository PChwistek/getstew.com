import { useState, createRef, Fragment } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import TextField from '../../TextField'
import Button from '../../Button'
import { isValidPassword } from '../../../utils/validations'
import getServerHostname from '../../../utils/getServerHostname'

const PasswordResetForm = (props) => {

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [error, setError] = useState('')
  const passwordField = createRef()
  const passwordFieldConfirm = createRef()

  async function handleSubmit (event) {
    event.preventDefault()
    const url = `${getServerHostname()}/auth/reset-password`
    const { isValid: validPass } = isValidPassword(password)
    const { isValid: validPassConfirm } = isValidPassword(passwordConfirm)

    if (password !== passwordConfirm) {
      setError('Passwords do not match')
      return
    }

    if(validPassConfirm && validPass) {
      try {
        const response = await axios.post(url, { password, }, props.axiosConfig)
        if (response.data == true) {
          // some action, push to login? 
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

    setError('Passwords not valid')
    return 
  }

  function handleKeyUp(e) {
    e.which = e.which || e.keyCode
    if (e.which == 13) {
      switch (e.target.id) {
        case "passwordField":
          passwordFieldConfirm.current.focus()
          return
        case "passwordFieldConfirm":
          handleSubmit(e)
          return
      }
    } else if (e.which == 40) {
      switch (e.target.id) {
        case "passwordField":
          passwordFieldConfirm.current.focus()
          return
      }
    } else if (e.which == 38) {
      switch (e.target.id) {
        case "passwordFieldConfirm":
          passwordField.current.focus()
          return
      }
    }
  }

  return (
    <Fragment>
      <img src={ '/stew-logo.png' } className={ 'split__image split__image--mobile' }/>
      <div className={ props.responsive ? 'content__app split__form--responsive' :'content__app split__form' }>
      { !props.hideTitle && <h2> New Password </h2> }
        <div className={ 'error-text'}> { error } </div>
        <div className="split__form-item">
          <TextField
            id={ 'passwordField' }
            type={ 'password' } 
            label={ 'PASSWORD' } 
            setValue={ setPassword }
            value={ password } 
            handleKeyUp= { handleKeyUp }
            onEnterValidation={ isValidPassword }
            innerRef={ passwordField }
          /> 
        </div>
        <div className="split__form-item">
          <TextField
            id={ 'passwordFieldConfirm' }
            type={ 'password' } 
            label={ 'PASSWORD CONFIRM' } 
            validate={ isValidPassword }
            handleKeyUp= { handleKeyUp }
            setValue={ setPasswordConfirm }
            value={ passwordConfirm }
            innerRef={ passwordFieldConfirm }
          />
        </div>
        <div className="split__form-item">
          <Button onClick={ handleSubmit }>
            Reset Password
          </Button>
        </div>
        </div>
    </Fragment>
  )
}

PasswordResetForm.propTypes = {
  responsive: PropTypes.bool,
  hideTitle: PropTypes.bool,
  axiosConfig: PropTypes.shape({ headers: PropTypes.object }),
}

export default PasswordResetForm
