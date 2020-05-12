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
    const value = event.target.value
    const { validate, setValue } = this.props

    if(validate) {
      const { isValid, error } = validate(value)
      if(isValid) {
        this.setState({ value, error })
        setValue(value)
      } else {
        this.setState({ error })
        setValue(value)
      }

    } else {
      setValue(value)
      this.setState({ value, error: "" })
    }
    
  }

  handleKeyPress(event) {
    this.props.handleKeyUp(event)

    const { onEnter, clearOnEnter, onEnterValidation } = this.props
    if(onEnter || onEnterValidation || clearOnEnter) {
      if (event.which === 13) {
        const { isValid, error } = onEnterValidation(this.state.value)
        if(isValid) {
          if(onEnter) {
            onEnter()
          }
          if(clearOnEnter) {
            this.setState({ value: '' })
          }
        } else {
          this.setState({ error })
        }     
      }
    }
  }

  render() {
    const { active, error, label } = this.state
    const { locked, type, value, autoFocus, innerRef } = this.props
    const fieldClassName = `field ${(locked ? active : active || value) &&
      "active"} ${locked && !active && "locked"} && ${error && 'error'}`

    return (
      <div className={fieldClassName}>
        <input
          id={ this.props.id }
          type={ type }
          value={value}
          autoFocus={ autoFocus }
          placeholder={label}
          onChange={this.changeValue.bind(this)}
          onKeyUp={ this.handleKeyPress.bind(this)}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: false })}
          ref={ innerRef }
          autoComplete="off"       
        />
        <label htmlFor={1} className={error && "error"}>
          {error || label}
        </label>
      </div>
    );
  }
}

TextField.propTypes = {
  clearOnEnter: PropTypes.bool,
  id: PropTypes.string,
  locked: PropTypes.bool,
  onEnter: PropTypes.func,
  onEnterValidation: PropTypes.func,
  active: PropTypes.bool,
  handleKeyUp: PropTypes.func,
  autoFocus: PropTypes.bool,
  value: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.string,
  validate: PropTypes.func,
  setValue: PropTypes.func.isRequired,
  innerRef: PropTypes.any,
}
  
export default TextField