import PropTypes from 'prop-types'

const Button = props => {
  const buttonStyle = props.primary ? 'button button--primary' : "button button--smaller"
  return (
    <button className={ buttonStyle } onClick={ props.onClick }>
      { props.children }      
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired,
  primary: PropTypes.bool,
}

export default Button