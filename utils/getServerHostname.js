/* eslint-disable */

function getServerHostname () {
  const isProd = process.env.environment
  if(!isProd) {
    return 'http://f5bed178.ngrok.io'
  } else if (isProd) {
    return 'https:/api.getstew.com'
  }
}

export default getServerHostname