import PropTypes from 'prop-types'
import Content from '../../Content'

const ImageRow = props => {
  const { imageList } = props
  return (
    <div className="image-row__container">
      <Content>
        <h2>
          { props.title }
        </h2>
        <p>
          { props.body }
        </p>
        <div className="image-row__row">
        {
          imageList.map((image, index) => (
            <div key={ index } className="image-row__item">
              <figure>
                  <img src={ image.image } className="image-row__image"/>
                  <figcaption className="image-row__caption">{ image.caption } </figcaption>
              </figure> 
            </div>
          ))
        }
        </div>
      </Content>
    </div>
  )
}

ImageRow.propTypes = {
  imageList: PropTypes.arrayOf({ image: PropTypes.string, caption: PropTypes.string }),
  title: PropTypes.string,
  body: PropTypes.string
}


export default ImageRow