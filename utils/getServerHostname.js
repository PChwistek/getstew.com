/* eslint-disable */

function getServerHostname () {
  const isProd = process.env.environment
  if(!isProd) {
    return 'http://localhost:3000'
  } else if (isProd) {
    return 'https://api.getstew.com'
  }
}

export function getWebsiteHostname() {
  const isProd = process.env.environment
  if(!isProd) {
    return 'http://localhost:3009'
  } else if (isProd) {
    return 'https://www.getstew.com'
  }
}

export default getServerHostname