import Content from '../../Content'

const TextWithImage = props => {

  return (
    <div className="text-image__container">
      <Content>
      <div className="text-image__rows">
        <div className="text-image__item text-image--center">
          <img src={ props.image } class="text-image__image"/>
        </div>
        <div className="text-image__item">
          <h2>
            { props.title }
          </h2>
          <div>
            <p>
              { props.body }
            </p>
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