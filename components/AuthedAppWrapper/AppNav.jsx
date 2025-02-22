import PropTypes from 'prop-types'
import Link from 'next/link'
import { logout } from '../../utils/auth'

const AuthedAppWrapper = props => {
  return (
    <div className={ 'authed-app-wrapper' }>
      <div className={ 'authed-app-wrapper__nav'}>
        <div className='authed-app-wrapper__nav__logo'>
          <img src={ props.logoSrc || './stew-logo-white.png' } className="header header__logo "/>
        </div>
        <div className="authed-app-wrapper__nav__items">
          <div>
            <Link href={ '/dashboard' }>
              <div className="authed-app-wrapper__nav__item">
                <a> Dashboard </a>
              </div>
            </Link>
          </div>
          <div>
            <Link href={ '/teams' }>
              <div className="authed-app-wrapper__nav__item">
                <a> Teams </a>
              </div>
            </Link>
          </div>
          <div>
            <Link href={ '/support' }>
              <div className="authed-app-wrapper__nav__item">
                <a> Support </a>
              </div>
            </Link>
          </div>
        </div>
        <div className='authed-app-wrapper__nav__support' >
          <Link href={ '/login' }>
              <div className="authed-app-wrapper__nav__item" onClick={ logout }>
                <a> Logout </a>
              </div>
            </Link>
        </div>
      </div>
      <div className={ 'authed-app-wrapper__content'}>
        { props.children }
      </div>
    </div>
  )
}

AuthedAppWrapper.propTypes = {
 children: PropTypes.node,
 logoSrc: PropTypes.string,
}

export default AuthedAppWrapper