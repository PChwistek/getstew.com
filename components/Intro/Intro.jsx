import PropTypes from 'prop-types'
import Content from '../Content'
import Button from '../Button'

const Intro = props => {

  return (
    <div className="content content__intro">
      <Content>
        <h1>
          hermits get s*** done
        </h1>
        <div className="content content__intro__desc">
          <p>
            hermitly squashes digital distractions and helps you get your projects done — all from inside your browser. 
          </p>
        </div>
        <Button onButtonClick={ props.onButtonClick }>
          Add to Chrome (it&apos;s free)
        </Button>
      </Content>
    </div>
  )
}

Intro.propTypes = {
  onButtonClick: PropTypes.func
}

export default Intro