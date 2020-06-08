import PropTypes from 'prop-types'

const ModalBase = props => {

  return (
    <div className={ props.show ? "modal" : "modal--hide"}>
      <div className={ props.alert ? 'modal__container modal__container--alert' : "modal__container" }>
        <div className="modal__exit" onClick={ props.closeModal } />
        { props.children }
      </div>
    </div>
  )
}


ModalBase.propTypes = {
  show: PropTypes.bool.isRequired,
  alert: PropTypes.bool,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.node
}


export default ModalBase