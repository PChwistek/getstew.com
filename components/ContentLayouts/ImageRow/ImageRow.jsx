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
          imageList.map(image => (
            <div className="image-row__item">
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

export default ImageRow