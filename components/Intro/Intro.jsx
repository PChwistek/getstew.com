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
            hermitly is a task management tool that cuts out the distracting parts of the internet while you work
          </p>
        </div>
        <Button onClick={ props.onButtonClick }>
          Add to { props.browser } (it&apos;s free)
        </Button>
      </Content>
    </div>
  )
}

Intro.propTypes = {
  onButtonClick: PropTypes.func,
  browser: PropTypes.string
}

export default Intro