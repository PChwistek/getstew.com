import PropTypes from 'prop-types'
import Button from '../Button'
const Modal = props => {
  
  return (
    <div className={ props.show ? "modal" : "modal--hide"}>
      <div className="modal__container">
        <div className="modal__exit" onClick={ props.closeModal }>
        </div>
        <h2>
          Sorry about that!
        </h2>
        <p>
          hermitly is still in development. If you&apos;re interested in being one the first to embrace hermitivity, enter your email for development updates.
        </p>
        <br />
        <div className="modal__form">
          <input className="modal__textfield" placeholder="Your email" type="email" />
          <Button onButtonClick={ () => {} }>
            Submit
          </Button>
        </div>
      </div>
    </div>
  )
}


Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}


export default Modal