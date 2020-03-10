/* eslint-disable */
export function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = re.test(String(email).toLowerCase())
  if(!isValid) {
    return { isValid, error: "Not a valid email." }
  }
  return { isValid, error: "" }
}

export function isValidPassword(password) {
  if(password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters long.' }
  }
  return { isValid: true, error: "" }
}