import PropTypes from 'prop-types'

import Content from '../Content'
import Button from '../Button'

export default function CTA(props) {
  return (
    <Content>
      <div className="cta__container">
        <h2>
          { props.title }
        </h2>
        <p>
          { props.body }
        </p>
        <div className="cta__button-wrapper">
          <Button onClick={ props.onButtonClick }>
            Add to { props.browser } (it&apos;s free)
          </Button>
        </div>
      </div>
    </Content>
  )
}

CTA.propTypes = {
  title: PropTypes.string,
  body: PropTypes.string,
  onButtonClick: PropTypes.func,
  browser: PropTypes.string
}