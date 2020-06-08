import PropTypes from 'prop-types'
import Content from '../../Content'

const TextWithImage = props => {

  return (
    <div className="text-image__container">
      <Content>
      <div className="text-image__rows">
        <div className="text-image__item text-image--center">
          <img src={ props.image } className="text-image__image"/>
        </div>
        <div className="text-image__item">
          <h2>
            { props.title }
          </h2>
          <div>
            {
              props.children ||      
                <p>
                  { props.body }
                </p>
            }
            <div>
              <img src={ props.auxImage } className="text-image__aux-image" />
            </div>
          </div>
        </div>
      </div>
      </Content>
    </div>
  )
}

TextWithImage.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  auxImage: PropTypes.string,
  children: PropTypes.node,
}

export default TextWithImage