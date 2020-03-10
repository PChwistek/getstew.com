/* eslint-disable */
import getConfig from 'next/config'

function getServerHostname () {
  const { publicRuntimeConfig: { isProd } } = getConfig()
  if(!isProd) {
    return 'http://873053a3.ngrok.io'
  } else if (isProd) {
    return 'stew-server-env.eba-qya3jp33.us-west-1.elasticbeanstalk.com'
  }
}

export default getServerHostname