/* eslint-disable no-console */
import PropTypes from 'prop-types'
import Link from 'next/link'
import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'
import { login } from '../../utils/auth'

export default function header(props) {
  const [userData, setUserData] = useState({ username: 'test2', error: '' })

  async function handleSubmit (event) {
    event.preventDefault()
    setUserData(Object.assign({}, userData, { error: '' }))

    // const username = userData.username
    const url = 'http://localhost:3009/auth/login'

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: 'test2', password: 'test2' })
      })
      if (response.status >= 200 && response.status < 300) {
        const { access_token } = await response.json()
        await login({ access_token })
      } else {
        console.log('Login failed.')
        // https://github.com/developit/unfetch#caveats
        let error = new Error(response.statusText)
        error.response = response
        throw error
      }
    } catch (error) {
      console.error(
        'You have an error in your code or there are Network issues.',
        error
      )

      const { response } = error
      setUserData(
        Object.assign({}, userData, {
          error: response ? response.statusText : error.message
        })
      )
    }
  }

  return(
    <nav>
      <div className="header header__container">
        <div className="header header__body">
          <div>
            <img src={ props.heroPhotoPath } className="header header__logo"/>
          </div>
          <div className="header header__items">
              <div className="header header__item">
                <div onClick={ handleSubmit }>
                  Pricing
                </div>
              </div>
              <div className="header header__item">
                <Link href={ '/account' }> 
                  <a> Account </a>
                </Link>
              </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

header.propTypes = {
  heroPhotoPath: PropTypes.string
}