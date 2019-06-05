
const Hero = props => {

  function getStyle() {
    const { color } = props

    switch(color) {
      case "grey":
        return "hero hero__grey--main"
    }

    return "hero hero__white"
  }

  return (
    <div className={ getStyle() }>
        { props.children }
    </div>
  )
}

export default Hero