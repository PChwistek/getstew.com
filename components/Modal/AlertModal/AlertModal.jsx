import { useState, Fragment } from 'react'
import axios from 'axios'
import ModalBase from '../ModalBase'
import PropTypes from 'prop-types'
import TextField from '../../TextField'
import Button from '../../Button'
import { isValidDisplayName } from '../../../utils/validations'
import getServerHostname from '../../../utils/getServerHostname'

const AlertModal = props => {
  const [displayName, setDisplayName] = useState('')
  const [step, setStep] = useState(0)

  async function handleSubmit() {
    const { isValid } = isValidDisplayName(displayName)
    if(isValid) {
      const { config } = props
      await axios.post(`${getServerHostname()}/account/profile`, { username: displayName }, config)
 
    }
    setStep(1)
  }

  function handleKeyUp(e) {
    e.which = e.which || e.keyCode
    if (e.which == 13) {
        handleSubmit()
    }
  }

  return (
    <ModalBase show={ props.show } closeModal={ props.closeModal } alert>
      {
        step == 0 
          ? <Fragment> 
          <h2 style={{ 'textAlign': 'center' }}> One more step! </h2>
            <div className='account__container content__app'>
              <div style={{ 'textAlign': 'center' }}>
                <p> Give yourself a display name. </p>
              </div>
              <div className='account__add-display-name__field'>
                <TextField 
                  autoFocus={ true }
                  type={ 'text' } 
                  label={ 'Display name' } 
                  setValue={ setDisplayName } 
                  value={ displayName }
                  validate={ isValidDisplayName }
                  handleKeyUp={ handleKeyUp }
                />
              </div>
              <div className='account__add-display-name__button'>
                <Button primary onClick={ handleSubmit }>
                  Next
                </Button>
              </div>
            </div>
          </Fragment>
        : <div>
          <h2 style={{ 'textAlign': 'center' }}> You're all set! </h2>
          <div style={{ 'textAlign': 'center' }}>
            <p> Check out our <a> FAQ.</a> </p>
          </div>
          <div className='account__blast-off__container'>
            <img src='./blast-off.png' className='account__blast-off' />
          </div>
          <div className='account__add-display-name__button'>
            <Button primary onClick={ () => props.closeModal() }>
              Get started!
            </Button>
          </div>
        </div>
      }

    </ModalBase>
  )
}

AlertModal.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  config: PropTypes.shape({ headers: PropTypes.object }),
}


export default AlertModal