/* eslint-disable no-console */
import { useState, Fragment } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import Router from 'next/router'
import axios from 'axios'
import nextCookie from 'next-cookies'
import Head from 'next/head'
import PropTypes from 'prop-types'
import Layout from '../components/Layout'
import getServerHostname from '../utils/getServerHostname'
import AuthedAppWrapper from '../components/AuthedAppWrapper'
import Content from '../components/Content'
import { withAuthSync } from '../utils/auth'
import Button from '../components/Button'
import PricingOptions from '../components/Pricing/PricingOptions'

import "../style.scss"

const Teams = props => {
  const { allowed } = props

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
    console.log('createSession', createSession.data)
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

  return(
    <Layout>
      <Head>
        <title>stew | Teams </title>
        <link rel="icon" href={ 'favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="my stew teams" />
      </Head>
      { allowed && 
        <AuthedAppWrapper>
          <Content>
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
          </Content>
        </AuthedAppWrapper>
      }
    </Layout>
  ) 
}

Teams.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx)
  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.push('/login')
      : ctx.res.writeHead(302, { Location: '/login' }).end()

  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    }
    
    const response = await axios.get(`${getServerHostname()}/auth/validate`, config)
    if (response.statusText >= 200 ** response.statusText < 400) {
      return {
        allowed: true,
        config,
      }
    } else {
      // https://github.com/developit/unfetch#caveats
      return await redirectOnError()
    }

  } catch (error) {
    // Implementation or Network error
    return redirectOnError()
  }
}

Teams.propTypes = {
  allowed: PropTypes.bool,
  config: PropTypes.shape({ headers: PropTypes.object }),
}

export default withAuthSync(Teams)