const Hero = props => {

  return (
    <div className={ "hero hero__grey--main" }>
      { props.children }
    </div>
  )
}

export default Hero