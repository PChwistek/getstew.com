/* eslint-disable */
const withSass = require('@zeit/next-sass')

module.exports = withSass({
  target: 'serverless',
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  }
})