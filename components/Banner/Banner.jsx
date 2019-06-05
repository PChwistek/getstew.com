import Content from "../Content"

const Banner = props => {
  return (
    <div className="banner banner--grey">
      <Content>
        <div className="banner banner__rows">
          <div className="banner__item">
            <div className="banner__title"> { props.title } </div>
            <div className="banner__body">  { props.body } </div>
          </div>
          <div className="banner__item--right">
            <img src={ props.image } className="banner__image" />
          </div>
        </div>
      </Content>
    </div>
  )
}

export default Banner