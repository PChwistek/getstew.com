import PropTypes from 'prop-types'

import Content from '../Content'
import Button from '../Button'

export default function CTA(props) {
  return (
    <Content>
      <div className="cta__container">
        <h2>
          Embrace Hermitivity
        </h2>
        <p>
          (productivity + being an internet hermit)
        </p>
        <div className="cta__button-wrapper">
          <Button onButtonClick={ props.onButtonClick }>
            Add to Chrome (it&apos;s free)
          </Button>
        </div>
      </div>
    </Content>
  )
}

CTA.propTypes = {
  onButtonClick: PropTypes.func
}