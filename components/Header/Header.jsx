import PropTypes from 'prop-types'

export default function header(props) {
  return(
    <nav>
      <div className="header header__container">
        <div className="header header__body">
          <div>
            <img src={ "../static/hermitly 2-01.png" } className="header header__logo"/>
          </div>
          <div className="header header__items">
              <div className="header header__item" onClick={ props.onLoginClick }>
                Log In
              </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

header.propTypes = {
  onLoginClick: PropTypes.func
}