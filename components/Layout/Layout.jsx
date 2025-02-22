import React from 'react'
import PropTypes from 'prop-types'
import { initGA, logPageView } from '../../utils/analytics'

export default class Layout extends React.Component {
  componentDidMount () {
    /* eslint-disable */
    
    if (!window.GA_INITIALIZED) {
      initGA()
      window.GA_INITIALIZED = true
    }
    logPageView()
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
