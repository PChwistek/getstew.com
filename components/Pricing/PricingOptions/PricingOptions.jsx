import PricingBox from '../PricingBox'
import PropTypes from 'prop-types'

const PricingOptions = props => {
  return (
    <div className='pricing__box-row'>
      <PricingBox 
        title='Starter'
        price='$15'
        extra='$2'
        freeUsers='5'
        buttonText='Upgrade Now'
        onSelect={ props.onSelectStarter }
      />
      <PricingBox 
        title='Growing'
        price='$30'
        extra='$3'
        buttonText='Upgrade Now'
        freeUsers={ 10 }
        onSelect={ props.onSelectGrowth }
      />
      <PricingBox 
        title='Enterprise'
        price='Custom'
        buttonText='Contact Us'
        isEnterprise
      />
  </div>
  )
}

PricingOptions.propTypes = {
  onSelectStarter: PropTypes.func,
  onSelectGrowth: PropTypes.func,
}

export default PricingOptions