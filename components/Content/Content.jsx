import PropTypes from 'prop-types'

const Content = props => {

  return (
    <div className={ "content" }>
      { props.children }
    </div>
  )
}

Content.propTypes = {
  children: PropTypes.node
}


export default Content