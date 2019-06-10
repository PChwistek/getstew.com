import PropTypes from 'prop-types'

const Button = props => {

  return (
    <button className="button button--primary" onClick={ props.onClick }>
      { props.children }      
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired
}

export default Button