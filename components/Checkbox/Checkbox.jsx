import PropTypes from 'prop-types'

const Checkbox = props => (

  <label className="checkbox-container">              
    <div className="split__small-text">
      { props.label }        
    </div>
    <input type="checkbox" checked={ props.checked } />
    <span className="checkmark"></span>
  </label>
)

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired
}

export default Checkbox