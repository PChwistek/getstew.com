import { Component } from 'react'
import PropTypes from 'prop-types'

class TextField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: (props.locked && props.active) || false,
      value: props.value || "",
      error: props.error || "",
      label: props.label || "Label"
    }
  }

  changeValue(event) {
    const value = event.target.value;
    this.setState({ value, error: "" })
  }

  handleKeyPress(event) {
    if (event.which === 13) {
      this.setState({ value: this.props.predicted })
    }
  }

  render() {
    const { active, value, error, label } = this.state
    const { predicted, locked, type } = this.props
    const fieldClassName = `field ${(locked ? active : active || value) &&
      "active"} ${locked && !active && "locked"} && ${error && 'error'}`

    return (
      <div className={fieldClassName}>
        {active &&
          value &&
          predicted &&
          predicted.includes(value) && <p className="predicted">{predicted}</p>}
        <input
          id={1}
          type={ type }
          value={value}
          placeholder={label}
          onChange={this.changeValue.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
        />
        <label htmlFor={1} className={error && "error"}>
          {error || label}
        </label>
      </div>
    );
  }
}

TextField.propTypes = {
  locked: PropTypes.bool,
  active: PropTypes.bool,
  predicted: PropTypes.arrayOf.string,
  value: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string
}
  
export default TextField