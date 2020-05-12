import PropTypes from 'prop-types'

import Content from "../../Content"

const Banner = props => {
  return (
    <div className="banner__container banner--grey">
      <Content>
        <div className={ props.children ? 'banner__rows--centered-row' : "banner__rows"}>
        {
          props.children 
          || <div className="banner__item">
            <h2> { props.title } </h2>
            <p className="banner__body">  { props.body } </p>
          </div>
        }
          <div className="banner__item banner--center">
            <img src={ props.image } className="banner__image" />
          </div>
        </div>
      </Content>
    </div>
  )
}

Banner.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  image: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default Banner