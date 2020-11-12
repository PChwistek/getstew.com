
import { Fragment, useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import getServerHostname from '../../utils/getServerHostname'
import Button from '../Button'
import Textfield from '../TextField'
import { isValidEmail } from '../../utils/validations'
import Router from 'next/router'

const OrgsDashboard = (props) => {

  const [memberEmail, setMemberEmail] = useState('')
  const [toInviteEmails, setToInviteEmails] = useState([])
  const [editingMembers, setEditingMembers] = useState(false)
  const [editingRepos, setEditingRepos] = useState(false)
  console.log(props)
  function addEmailToInvite() {
    const temp = toInviteEmails
    temp.push(memberEmail)
    setToInviteEmails(temp)
  }

  async function handleInvites() {
    try {
      const response = await axios.post(`${getServerHostname()}/org/add-member`, { orgId: props._id, newMembers: toInviteEmails }, props.config)
      if (response.data === true) Router.reload()
    } catch(error) {
      console.log(error)
      
    }
  }

  async function resendInvite(theMemberEmail) {
    try {
      await axios.post(`${getServerHostname()}/org/resend-group-invite`, { orgId: props._id, email: theMemberEmail }, props.config)
      props.afterEmailResend(null)
    } catch (error) {
      props.afterEmailResend(error.response.data.message)
    }
  }
  
  function removeFromInvite(theEmail) {
    const temp = toInviteEmails.filter(email => email !== theEmail)
    setToInviteEmails(temp)
  }

  function handleOnEnterValidation(entered) {

    const { isValid, error } = isValidEmail(entered)
    
    if (!isValid) return { isValid: false, error }

    if(toInviteEmails.length >= props.numberOfSeats - 1) {
      return { isValid: false, error: 'Reached seat limit' }
    }
    
    if(toInviteEmails.find(aEmail => entered === aEmail) || props.members.find(aMember => aMember.email === entered)) {
      return { isValid: false, error: 'Email already listed' }
    } 
    
    return { isValid: true, error: ''}
  }

  async function handleToPortal() {
    const response = await axios.get(`${getServerHostname()}/org/manage-billing/${props._id}`, props.config)
    window.open(response.data.url,'_blank')
  }


  const { members, isAdmin, numberOfSeats} = props
  return (
    <div className='teams-dash__layout'>
      <div className='teams-dash__layout__body'>
        <div>
          <h2> Your Organization 
            <span> 
                <img src='/cog.png' className='teams-dash__edit' />
              </span>
          </h2>
          <p> Plan: { props.plan } </p>
          <div className='teams-dash__change-container'>
            { isAdmin &&           
              <Button secondary onClick={ handleToPortal }> { props.plan === 'free' ? 'Upgrade' : 'Payment Details' } </Button>
            }
          </div>
        </div>
        <div className='teams-dash__item'>
          <div className='teams-dash__members'>
            <div className='teams-dash__title'> 
              Members ({ `${members.length}/${numberOfSeats}` }) 
              {
                !editingMembers 
                  ? <div className='teams-dash__toggle' onClick={ () => setEditingMembers(true) }> 
                      <img src='/edit.png' className='teams-dash__edit' />
                   </div>
                  : <div className='teams-dash__toggle'>
                    <div className='teams-dash__done' onClick={ () => setEditingMembers(false) }>Done</div> 
                  </div>
              }
              </div>
          </div>
          {
            editingMembers && 
              <Fragment>
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
                        <div className={ 'tag__remove' } onClick={ () => removeFromInvite(email) }>
                          <img src={ './remove-white.png' } />
                        </div>
                      </div>
                    )
                  })
                }
                </div>
                <div style={{ 'marginTop': '15px' }}>
                  <Button primary onClick={ handleInvites }>
                    Invite
                  </Button>
                </div>
              </div>
            </Fragment>
          }
          {
            members.map(member => (
              <div key={ member } className='teams-dash__members__item'>
                <img src='./sboy_head.png' className='teams-dash__user'/>
                { member.email } 
                { member.status === 'invited' && <Fragment>
                  <span className='tag'> Awaiting Response </span>
                  <span onClick={ () => resendInvite(member.email) } style={{ 'marginLeft': '5px', 'cursor': 'pointer' }}> <u> Resend </u></span>
                </Fragment>
                }
                { editingMembers && 
                  <img 
                    src='./remove-red.png' 
                    className='teams-dash__remove'
                    onClick={ () => props.onRemoveClick(true, member.email) }
                  /> 
                }
              </div>
            ))
          }
        </div>
      </div>
      <div className='teams-dash__layout__body'>
        <div className='teams-dash__item'>
          <div className='teams-dash__title'> 
            Repositories 
            {
            !editingRepos 
              ? <div className='teams-dash__toggle' onClick={ () => setEditingRepos(true) }> 
                  <img src='/edit.png' className='teams-dash__edit' />
                </div>
              : <div className='teams-dash__toggle'>
                <div className='teams-dash__done' onClick={ () => setEditingRepos(false) }>Done</div> 
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

OrgsDashboard.propTypes = {
  _id: PropTypes.string,
  isAdmin: PropTypes.bool,
  numberOfSeats: PropTypes.number,
  members: PropTypes.arrayOf(PropTypes.string),
  plan: PropTypes.string,
  config: PropTypes.shape({ 
    headers: PropTypes.object,  
  }),
  onRemoveClick: PropTypes.func,
  afterEmailResend: PropTypes.func,
}

export default OrgsDashboard