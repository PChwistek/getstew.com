
import MailchimpSubscribe from "react-mailchimp-subscribe"
import PropTypes from 'prop-types'
import SubscriptionForm from '../Form'

const Modal = props => {
  const url = "https://getstew.us4.list-manage.com/subscribe/post?u=354711416b98e94318e76705e&amp;id=c65f16bba9"

  return (
    <div className={ props.show ? "modal" : "modal--hide"}>
      <div className="modal__container">
        <div className="modal__exit" onClick={ props.closeModal }>
        </div>
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
      </div>
    </div>
  )
}


Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired
}


export default Modal