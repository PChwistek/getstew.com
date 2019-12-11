import PropTypes from 'prop-types'

const SplitPanels = props => {
  return (
    <div>
      { props.children }
    </div>
  )
}

export const Panel = props => {
  return (
    <div className={ props.left ? 'split split__left' : 'split split__right'}>
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