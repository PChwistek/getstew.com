import PropTypes from 'prop-types'

const SplitPanels = props => {
  return (
    <div className='split'>
      { props.children }
    </div>
  )
}

export const Panel = props => {
  return (
    <div className={ props.left ? 'split__left' : 'split__right'}>
      { props.children }
    </div>
  )
}

SplitPanels.propTypes = {
  children: PropTypes.node
}

Panel.propTypes = {
  left: PropTypes.bool.isRequired,
  children: PropTypes.node
}

export default SplitPanels