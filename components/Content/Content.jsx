import PropTypes from 'prop-types'

const Content = props => {

  return (
    <div className={ props.isDashboard ? 'content content__dashboard': "content"  }>
      { props.children }
    </div>
  )
}

Content.propTypes = {
  children: PropTypes.node,
  isDashboard: PropTypes.bool,
}


export default Content