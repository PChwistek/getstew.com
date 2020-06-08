import ModalBase from '../ModalBase'
import MailchimpSubscribe from "react-mailchimp-subscribe"
import PropTypes from 'prop-types'
import SubscriptionForm from '../../Form/SubscriptionForm'

const MailModal = props => {
  const url = "https://getstew.us4.list-manage.com/subscribe/post?u=354711416b98e94318e76705e&amp;id=c65f16bba9"

  return (
    <ModalBase show={ props.show } closeModal={ props.closeModal } >
        <h2>
          Sorry about that!
        </h2>
        <p>
          stew is still in development. If you&apos;re interested, enter your email below to receive an update when we launch.
        </p>
        <br />
        <MailchimpSubscribe
          url={url}
          render={({ subscribe, status, message }) => (
            <SubscriptionForm
              status={status}
              message={message}
              onValidated={formData => subscribe(formData)}
            />
          )}
        />
    </ModalBase>
  )
}

MailModal.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}


export default MailModal