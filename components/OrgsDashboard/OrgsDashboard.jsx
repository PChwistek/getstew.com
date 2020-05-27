
import axios from 'axios'
import PropTypes from 'prop-types'
import getServerHostname from '../../utils/getServerHostname'
import Button from '../Button'

const OrgsDashboard = (props) => {

  async function handleToPortal() {
    const response = await axios.get(`${getServerHostname()}/org/manage-billing/${props.orgData._id}`, props.config)
    window.open(response.data.url,'_blank')
  }
  const { orgData: { members, isAdmin, numberOfSeats} } = props
  return (
    <div className='teams-dash__layout'>
      <div>
        <div>
          <h2> Your Organization 
            <span> 
                <img src='/cog.png' className='teams-dash__edit' />
              </span>
          </h2>
          <div className='teams-dash__change-container'>
            { isAdmin &&           
              <Button secondary onClick={ handleToPortal }> Payment Details </Button>
            }
          </div>
        </div>
        <div className='teams-dash__item'>
          <div className='teams-dash__members'>
            <h3> 
              Members ({ `${members.length}/${numberOfSeats}` }) 
              <span> 
                <img src='/edit.png' className='teams-dash__edit' />
              </span>
              </h3>
          </div>
          {
            members.map(member => (
              <div key={ member } className='teams-dash__members__item'>
                <img src='./sboy_head.png' className='teams-dash__user'/>
                { member }
              </div>
            ))
          }
        </div>
      </div>
      <div>
        <div className='teams-dash__item'>
          <h3> 
            Repositories 
            <span> 
              <img src='/edit.png' className='teams-dash__edit' />
            </span>
          </h3>
        </div>
      </div>
    </div>
  )
}

OrgsDashboard.propTypes = {
  orgData: PropTypes.shape({
    isAdmin: PropTypes.bool,
    numberOfSeats: PropTypes.number,
    members: PropTypes.array,
  }),
  config: PropTypes.shape({ 
    headers: PropTypes.object,  
  }),
}

export default OrgsDashboard