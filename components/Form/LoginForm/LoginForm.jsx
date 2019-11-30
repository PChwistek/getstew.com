import { Component } from 'react'

class LoginForm extends Component {

  state = {
    step: 1,
    email: '',
    username: '',
    password: ''
}

  nextStep = () => {
      const { step } = this.state
      this.setState({
          step : step + 1
      })
  }

  prevStep = () => {
      const { step } = this.state
      this.setState({
          step : step - 1
      })
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }

}

export default LoginForm