// This is not production ready, (except with providers that ensure a secure host, like Now)
// For production consider the usage of environment variables and NODE_ENV

function getServerHostname (req) {
  if (!req) return ''

  // const { host } = req.headers

  // if (host.startsWith('localhost')) {
  //   return `http://${host}`
  // }
  // return `https://${host}`
  return 'https://localhost:3009'
}

export default getServerHostname