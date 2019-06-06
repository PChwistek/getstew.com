import PropTypes from 'prop-types'

const Hero = props => {

  function getStyle() {
    const { type } = props

    switch(type) {
      case "grey":
        return "hero hero__grey--main"
      case "grey-mini":
        return "hero hero__grey--mini"
    }

    return "hero hero__white"
  }

  return (
    <div className={ getStyle() }>
        { props.children }
    </div>
  )
}

Hero.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node
}

export default Hero