import PropTypes from 'prop-types'

const Button = props => {

  return (
    <button className="button button--primary" onClick={ props.onButtonClick }>
      { props.children }      
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onButtonClick: PropTypes.func.isRequired
}

export default Button