import PropTypes from 'prop-types'
import Button from '../Button'

const PricingBox = props => {

  return (
    <div className={ "pricing__box-container" }>
      <div className='pricing__box-container__title-container'> 
        <h3> { props.title } </h3>
      </div>
      {
        props.isEnterprise 
          ? <div className='pricing__box-container__price pricing__box-container__price--custom'>
            { props.price }
          </div>
          : <div> 
            <div className='pricing__box-container__pricing'>
            starting at
            <div className='pricing__box-container__price'>
              { props.price }
            </div>
            { props.freeUsers } free users
          </div>
          <div className='pricing__box-container__extra'>
            { props.extra } for every additional user
          </div>
        </div>
      }
      <div className='pricing__box-container__button'>
        <div>
          <Button primary onClick={ () => {} }>
            { props.buttonText }
          </Button>
        </div>
      </div>
    </div>
  )
}

PricingBox.propTypes = {
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  price: PropTypes.string,
  extra: PropTypes.string,
  freeUsers: PropTypes.string,
  isEnterprise: PropTypes.bool,
}


export default PricingBox