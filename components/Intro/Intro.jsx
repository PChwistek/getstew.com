import PropTypes from 'prop-types'
import Content from '../Content'
import Button from '../Button'

const Intro = props => {

  return (
    <div className="content content__intro">
      <Content>
        <h1>
          { props.slogan }
        </h1>
        <div className="content content__intro__desc">
          <p>
            { props.description }
          </p>
        </div>
        {
          props.onButtonClick && 
          <Button primary onClick={ props.onButtonClick }>
            Add to Chrome (it&apos;s free)
          </Button>
        }
      </Content>
    </div>
  )
}

Intro.propTypes = {
  onButtonClick: PropTypes.func,
  browser: PropTypes.string,
  slogan: PropTypes.string,
  description: PropTypes.string,
}

export default Intro