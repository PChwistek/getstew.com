import PropTypes from 'prop-types'
import Content from "../../Content"

const CenteredPanel = props => {
  return (
    <Content>
      <div className='centered-panel centered-panel--white'>
        { props.children }
      </div>
    </Content>
  )
}

CenteredPanel.propTypes = {
  children: PropTypes.node
}

export default CenteredPanel