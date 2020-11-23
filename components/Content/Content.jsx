import PropTypes from 'prop-types'

const Content = props => {

  function getProperStyle() {
    if (props.isDashboard) {
      return 'content content__dashboard'
    } else if (props.isBlog) {
      return 'content content__blog'
    }

    return 'content'
  }

  return (
    <div className={ getProperStyle() }>
      { props.children }
    </div>
  )
}

Content.propTypes = {
  children: PropTypes.node,
  isDashboard: PropTypes.bool,
  isBlog: PropTypes.bool,
}


export default Content