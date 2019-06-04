const Button = props => {

  return (
    <button className="button button--primary">
      { props.children }      
    </button>
  )
}

export default Button