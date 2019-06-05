import Content from '../Content'

const TextWithImage = props => {

  return (
    <div className="text-image__container">
      <Content>
      <div className="text-image__rows">
        <div className="text-image__item">
          <img src={ props.image } class="text-image__image"/>
        </div>
        <div className="text-image__item">
          <div className="text-image__title">
            { props.title }
          </div>
          <div className="text-image__body">
            { props.body }
            <div text-image__aux>
              <img src={ props.auxImage } className="text-image__aux-image" />
            </div>
          </div>
        </div>
      </div>
      </Content>
    </div>
  )
}

export default TextWithImage