import PropTypes from 'prop-types'

const Modal = props => {
  
  return (
    <div className={ props.show ? "modal" : "modal--hide"}>
      this is a modal...
    </div>
  )
}


Modal.propTypes = {
  show: PropTypes.string.isRequired,
}


export default Modal