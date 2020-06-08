import PropTypes from 'prop-types'

const Button = props => {

  function getButtonStyle() {
    if(props.primary) {
      return 'button button--primary'
    } else if (props.secondary) {
      return 'button button--secondary'
    } else if (props.disabled) {
      return 'button button--disabled'
    } else if (props.plusOrMinus) {
      return 'button button--plusOrMinus'
    }
    return 'button button--smaller'
  }

  return (
    <button className={ getButtonStyle() } onClick={ props.onClick }>
      { props.children }      
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  disabled: PropTypes.bool
}

export default Button