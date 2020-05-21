/* eslint-disable no-console */
import { useState, Fragment } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import axios from 'axios'
import Button from '../Button'
import PricingOptions from '../Pricing/PricingOptions'
import getServerHostname from '../../utils/getServerHostname'
import PropTypes from 'prop-types'

const Checkout = (props) => {
  const [step, setStep] = useState(0)
  const [plan, setPlan] = useState('')
  const [numSeats, setNumSeats] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  function handleStarterSelected() {
    setPlan('starter')
    setStep(2)
    setNumSeats(5)
  }

  function handleGrowthSelected() {
    setPlan('growth')
    setStep(2)
    setNumSeats(10)
  }

  async function goToPayment() {
    setStep(3)
    setIsLoading(true)
    const createSession = await axios.post(`${getServerHostname()}/org/purchase`,{
      plan,
      numberOfSeats: numSeats,
    } , props.config)
    const stripe = await loadStripe('pk_test_TsrMd4ytxrhdgj37e7QJsU3300aHtA7Zxr')
    const { error } = await stripe.redirectToCheckout({
      sessionId: createSession.data
    })

    if (error) {
      console.log('error', error)
    }
  }

  function handleSeatChange(isDecrement) {
    const isStarter = plan === 'starter'
    if (isDecrement) {
      if (isStarter && numSeats > 5) {
        setNumSeats(numSeats - 1)
      } else if (!isStarter && numSeats > 10) {
        setNumSeats(numSeats - 1)
      }
    } else {
      if (isStarter && numSeats < 100) {
        setNumSeats(numSeats + 1)
      } else if (!isStarter && numSeats < 500) {
        setNumSeats(numSeats + 1)
      }
    }
  }

  return (
    <Fragment>
       {
        step == 0 &&
          <div className='teams__intro'>
              <div className='teams__title'> 
                <h2> Release the A-Team! </h2>
              </div>
              <div> 
                <img src='/new-team.png' className='teams__explosion' />
              </div> 
              <div className='teams__button'>
                <Button primary onClick={ () => setStep(1) }>
                  Get Started
                </Button>
              </div>
            </div>
        }
        {
          step == 1 &&
            <Fragment>
              <div className='teams__intro' style={{ 'paddingBottom': '20px' }}>
                  <div className='teams__title'> 
                    <h2> Choose a plan </h2>
                  </div>
                  <p> Learn more on our <a href='/pricing'> pricing page. </a> </p>
              </div>
              <PricingOptions 
                onSelectGrowth={ handleGrowthSelected } 
                onSelectStarter={ handleStarterSelected }
              />
            </Fragment>
          }
          {
            step == 2 &&
            <Fragment>
              <div className='teams__intro' style={{ 'paddingBottom': '20px' }}>
                  <div className='teams__title'> 
                    <h2> The { plan === 'starter' ? 'Starter': 'Growth' } plans starts with { plan === 'starter' ? 5 : 10} seats. Do you need more?</h2>
                    <p> You can always add more later. </p>
                  </div>
                  <div className='teams__seats'>
                    <div className='teams__seats__modifier'>
                      <Button plusOrMinus onClick={ () => handleSeatChange(true) }>
                        <img src='/minus.png' className='teams__seats__seat-adjust'/>
                      </Button>
                    </div>
                    <div className='teams__seats__field'>
                      <h2> { numSeats } </h2>
                    </div>
                    <div className='teams__seats__modifier'>
                      <Button
                        plusOrMinus
                        onClick={ () => handleSeatChange(false) }
                      >
                        <img src='/plus.png' className='teams__seats__seat-adjust'/>
                      </Button>
                    </div>
                  </div>
                  <div className='teams__button'>
                  <Button
                    primary
                    onClick={ goToPayment }
                  >
                  Continue
                  </Button>
                  <div style={ {'marginTop': '50px'} }>
                    <Button
                      secondary
                      onClick={ () => setStep(1) }
                    >
                    &#8249; Back
                    </Button>
                  </div>
                </div>
              </div>
            </Fragment>
          }
          {
            step == 3 &&
              <div className='teams__intro'>
              <div className='teams__title'> 
                  <h2> Loading Checkout... </h2>
                </div>
                <div className='teams__seats'>
                  {
                    isLoading 
                      && <div className="loader">
                        <img src={ "/loading-2.gif" } className="spinner"/>
                      </div>
                  }
                </div>
              </div>
          }
    </Fragment>
  )
}

Checkout.propTypes = {
  config: PropTypes.shape({ headers: PropTypes.object }),
}

export default Checkout