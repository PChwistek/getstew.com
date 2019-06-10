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
      {status === "sending" && <div>sending...</div>}
      {status === "error" && <div dangerouslySetInnerHTML={{__html: message}}/>}
      {status === "success" && <div>Confirmation email Sent !</div>}
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