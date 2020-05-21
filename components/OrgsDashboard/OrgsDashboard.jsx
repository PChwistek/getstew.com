
import axios from 'axios'
import PropTypes from 'prop-types'
import getServerHostname from '../../utils/getServerHostname'

const OrgsDashboard = (props) => {

  async function handleToPortal() {
    const response = await axios.get(`${getServerHostname()}/org/manage-billing/${props.orgData._id}`, props.config)
    window.open(response.data.url,'_blank')
  }

  return (
    <div>
      <h2> Organizations...</h2>
      <p onClick={ handleToPortal }> Change plans... </p>
    </div>
  )
}

OrgsDashboard.propTypes = {
  orgData: PropTypes.any,
  config: PropTypes.shape({ headers: PropTypes.object }),
}

export default OrgsDashboard