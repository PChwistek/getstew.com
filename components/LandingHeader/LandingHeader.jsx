/* eslint-disable no-console */
import PropTypes from 'prop-types'
import Link from 'next/link'
// import fetch from 'isomorphic-unfetch'
// import { login } from '../../utils/auth'

export default function landingHeader(props) {
  return(
    <nav>
      <div className="header header__container">
        <div className="header header__body">
          <Link href={ '/' }>
            <img src={ props.heroPhotoPath } className="header header__logo "/>
          </Link>
          <div className="header header__items">
            <Link href={ '/pricing' }>
              <div className="header header__item">
                    <a> Pricing </a>
              </div>
            </Link>
            <Link href={ '/account' }>
              <div className="header header__item">
                  <a> Account </a> 
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

landingHeader.propTypes = {
  heroPhotoPath: PropTypes.string
}