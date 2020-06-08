import PropTypes from 'prop-types'

const TimedAlert = props => {

  function getProperStyle() {
    const { show, error } = props
    if (!show) {
      return 'alert--hide'
    } else if (show && !error) {
      return 'alert'
    } else {
      return 'alert alert--error'
    }
  }

  return (
    <div className={ getProperStyle() }>
      <div>
        <img src='./bell.png' className='alert__icon' />
      </div>
      <div>
        { props.children }
      </div>
    </div>
  )
}


TimedAlert.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node,
  error: PropTypes.string,
}


export default TimedAlert