import { useState } from 'react'
import LoginForm from '../Form/LoginForm'
import RegistrationForm from '../Form/RegistrationForm/RegistrationForm'

export const LoginPrompt = () => {

  const [isSignUp, setIsSignUp] = useState(true)

  function signUpToggled() {
    setIsSignUp(false)
  }

  function signInToggled() {
    setIsSignUp(true)
  }


  return (
    <div className={ 'login-prompt'}>
      <p> Please login or sign up to view this recipe. </p>
      <div className='login-prompt__toggle'>
        <div onClick={ signInToggled } className={ isSignUp ? 'login-prompt__toggle__selection login-prompt__toggle__selection--selected' : 'login-prompt__toggle__selection '} >
          Sign In
        </div>
        <div onClick={ signUpToggled } className={ !isSignUp ? 'login-prompt__toggle__selection login-prompt__toggle__selection--selected' : 'login-prompt__toggle__selection '}>
          Sign Up
        </div>
      </div>
      <div className='login-prompt__body'> 
      {
        isSignUp
          ? <LoginForm responsive hideAdditionalLink hideTitle noRedirect />
          : <RegistrationForm responsive hideAdditionalLink hideTitle noRedirect />
      }
      </div>
    </div>
  )
}

export default LoginPrompt