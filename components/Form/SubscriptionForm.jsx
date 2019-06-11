import PropTypes from 'prop-types'
import Button from '../Button'

const SubscriptionForm = ({ status, message, onValidated }) => {
  let email
  const submit = () =>
    email &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
  })

  return (
    <div>
      {status === "sending" && <div className="submission-form__status">sending...</div>}
      {status === "error" && <div className="submission-form__status" dangerouslySetInnerHTML={{__html: message}}/>}
      {status === "success" && <div className="submission-form__status">Confirmation email sent!</div>}
      <input
        className={ "modal__textfield" }
        ref={node => (email = node)}
        type="email"
        placeholder="Your email"
      />
      <Button onClick={submit}>
        Submit
      </Button>
    </div>
  );
}

SubscriptionForm.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string,
  onValidated: PropTypes.func
}

export default SubscriptionForm