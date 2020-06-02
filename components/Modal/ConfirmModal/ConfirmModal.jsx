import PropTypes from 'prop-types'
import Button from '../../Button'
import ModalBase from '../ModalBase'

export const ConfirmModal = (props) => {
  return (
    <ModalBase show={ props.show } closeModal={ props.closeModal } >
      <h2> { props.title } </h2> 
      <p> { props.desc } </p>
      <p className='error-text'> { props.error } </p>
      <div className={ 'confirm-modal__buttons' }>
        <div className={ 'confirm-modal__button'}>
          <Button onClick={ props.onYesClick } type='secondary'> Yes </Button>
        </div>
        <div className={ 'confirm-modal__button'}>
          <Button onClick={ props.onNoClick } type='secondary'> No </Button>
        </div>
      </div>
    </ModalBase>
  )
}

ConfirmModal.propTypes = {
  show: PropTypes.bool,
  desc: PropTypes.string,
  error: PropTypes.string,
  closeModal: PropTypes.func,
  onYesClick: PropTypes.func,
  onNoClick: PropTypes.func,
  title: PropTypes.string
}

export default ConfirmModal