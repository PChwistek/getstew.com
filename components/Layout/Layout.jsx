import React from 'react'
import PropTypes from 'prop-types'
import { initGA, logPageView } from '../../utils/analytics'

export default class Layout extends React.Component {
  componentDidMount () {
    /* eslint-disable */
    const isProduction = process.env.NODE_ENV === 'production'

    if (!window.GA_INITIALIZED && isProduction) {
      initGA()
      window.GA_INITIALIZED = true
    }
    if (isProduction) {
      logPageView()
    }
  }
  render () {
    return (
      <div>
        { this.props.children }
      </div>
    )
  }
}

Layout.propTypes = {
  children: PropTypes.node
}
