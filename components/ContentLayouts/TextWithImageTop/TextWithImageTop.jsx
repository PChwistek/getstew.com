import PropTypes from 'prop-types'
import Content from '../../Content'

const TextWithImageTop = props => {

  return (
    <div className="text-image__container">
      <Content>
        <div>
          <div className="text-image__item text-image--center">
            <img src={ props.imagePath } className="text-image__image text-image--center-photo"/>
            <div className="text-image__item">
              <h2>
                { props.title }
              </h2>
              <div>
                <p>
                  { props.body }
                </p>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </div>
  )
}

TextWithImageTop.propTypes = {
  imagePath: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
}

export default TextWithImageTop