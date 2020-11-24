/* eslint-disable no-console */
import PropTypes from 'prop-types'
import Link from 'next/link'
import { logout } from '../../utils/auth'

export default function landingHeader(props) {
  return(
    <nav>
      <div className="header header__container">
        <div className="header header__body">
          {
          !props.hideItems &&
            <Link href={ '/' }>
              <img src={ props.heroPhotoPath } className="header header__logo "/>
            </Link>
          }
          {
            !props.hideItems &&
              <div className="header header__items">
              <Link href={ '/blog' }>
                <div className="header header__item">
                  <a> Blog </a>
                </div>
              </Link>
              <Link href={ '/faq' }>
                <div className="header header__item">
                  <a> FAQ </a>
                </div>
              </Link>
              <Link href={'/dashboard' }>
                <div className="header header__item">
                  <a> Account </a> 
                </div>
              </Link>
            </div>
          }
          {
            props.showLogout &&
              <div className="header header__items">
                <Link href={ '/login' }>
                  <div className="header header__item" onClick={ logout }>
                    <a> Logout </a>
                  </div>
                </Link>
              </div>
          }
        </div>
      </div>
    </nav>
  )
}

landingHeader.propTypes = {
  heroPhotoPath: PropTypes.string,
  showLogout: PropTypes.bool,
  hideItems: PropTypes.bool
}