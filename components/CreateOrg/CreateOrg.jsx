import axios from 'axios'
import Router from 'next/router'
import Button from '../Button'
import getServerHostname from '../../utils/getServerHostname'

import PropTypes from 'prop-types'

const CreateOrg = (props) => {

  async function createOrg() {
    const response = await axios.post(`${getServerHostname()}/org/`,{
      plan: 'free',
      numberOfSeats: 4,
      name: 'My first org'
    } , props.config)
    if (response.data && response.data._id) {
      Router.reload()
    }
  }

  return (
    <div className='teams__intro'>
    <div className='teams__title'> 
      <h2> Release the A-Team! </h2>
    </div>
    <div> 
      <img src='/new-team.png' className='teams__explosion' />
    </div> 
    <div className='teams__button'>
      <Button primary onClick={ createOrg }>
        Create your Stew organization
      </Button>
    </div>
  </div>
  )
}

CreateOrg.propTypes = {
  config: PropTypes.shape({ headers: PropTypes.object }),
}

export default CreateOrg