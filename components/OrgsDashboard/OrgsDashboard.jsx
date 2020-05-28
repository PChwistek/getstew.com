
import { Fragment, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import getServerHostname from '../../utils/getServerHostname'
import Button from '../Button'
import Textfield from '../TextField'
import { isValidEmail } from '../../utils/validations'

const OrgsDashboard = (props) => {

  const [memberEmail, setMemberEmail] = useState('')
  const [toInviteEmails, setToInviteEmails] = useState([])

  function addEmailToInvite() {
    const temp = toInviteEmails
    temp.push(memberEmail)
    setToInviteEmails(temp)
  }

  function handleOnEnterValidation(entered) {
    if(toInviteEmails.length >= props.orgData.numberOfSeats) {
      return { isValid: false, error: 'Hit seat limit' }
    }
    
    if(toInviteEmails.find(tag => entered == tag)) {
      return { isValid: false, error: 'Email already listed' }
    } 
    
    return { isValid: true, error: ''}
  }

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
          <div className='teams-dash__invite-members'>
            <div className='teams-dash__invite-members__input'>
              <Textfield
                type={ 'text' }
                setValue={ setMemberEmail }
                value={ memberEmail }
                clearOnEnter={ true }
                validate={ isValidEmail }
                handleKeyUp={() => {}}
                onEnter={ addEmailToInvite }
                onEnterValidation={ handleOnEnterValidation }
                label='MEMBER EMAIL'
              />
            </div>
            <div className='teams-dash__invite-members__container'>
            {
              toInviteEmails && 
                toInviteEmails.map(email => {
                return (
                  <div key={ email } className={ 'tag' }>
                    { email }
                    <div className={ 'tag__remove' } onClick={ () => {} }>
                      <img src={ './remove-white.png' } />
                    </div>
                  </div>
                )
              })
            }
            </div>
            <div style={{ 'marginTop': '15px' }}>
              <Button primary>
                Invite
              </Button>
            </div>
          </div>
          {
            members.map(member => (
              <div key={ member } className='teams-dash__members__item'>
                <img src='./sboy_head.png' className='teams-dash__user'/>
                { member.email } 
                { member.status === 'invited' && <Fragment>
                  <span className='tag'> Awaiting Response </span>
                  <span> <u> Resend </u></span>
                </Fragment>
                }
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