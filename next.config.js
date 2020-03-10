/* eslint-disable */
const withSass = require('@zeit/next-sass')

const isProd = process.env.NODE_ENV === 'production'

module.exports = withSass({
  target: 'serverless',
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  env: {
    // Will be available on both server and client
    environment: isProd
  },
})