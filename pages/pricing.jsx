import React from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'
import Hero from '../components/Hero'
import Header from '../components/LandingHeader'
import Content from '../components/Content'
import Intro from '../components/Intro'
import Footer from '../components/Footer'
import PricingBox from '../components/PricingBox'
import Banner from '../components/ContentLayouts/Banner'
import "../style.scss"

class Pricing extends React.Component {

  render() {
    return(
      <Layout>
        <Head>
          <title>stew | Pricing </title>
          <link rel="icon" href={ '/favicon.png' } type="image/png" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="stew pricing" />
        </Head>
        <Header heroPhotoPath={ '/stew-title.png' } />
        <Content>
          <div className='pricing__body'>
            <Intro 
              slogan="Stew for the whole team"
            />         
          </div>
        </Content>
        <Content>
          <div className='pricing__box-row'>
              <PricingBox 
                title='Starter'
                price='$15.00'
                extra='$3.00'
                freeUsers='5'
                buttonText='Upgrade Now'
              />
              <PricingBox 
                title='Growing'
                price='$30.00'
                extra='$4.00'
                buttonText='Upgrade Now'
                freeUsers={ 10 }
              />
              <PricingBox 
                title='Enterprise'
                price='Custom'
                buttonText='Contact Us'
                isEnterprise
              />
            </div>
          </Content>
          <Banner 
            title="Find the right plan for your team." 
            body="Live long and prosper."
            image="/team.png"
          />
          <Content>
            <div className='pricing__comparison'>
              <table>
              <tr>
                <th></th>
                <th>Starter</th>
                <th>Growing</th>
                <th>Enterprise</th>
              </tr>
              <tr>
                <td>Free Users</td>
                <td>5</td>
                <td>10</td>
                <td> - </td>
              </tr>
              <tr>
                <td>User Limit</td>
                <td>100</td>
                <td>300</td>
                <td> Custom </td>
              </tr>
              <tr>
                <td>Repositories</td>
                <td>15</td>
                <td>50</td>
                <td> Custom </td>
              </tr>
              <tr>
                <td>Priority Support</td>
                <td> - </td>
                <td> Yes </td>
                <td> Yes </td>
              </tr>
              <tr>
                <td>Contract</td>
                <td> Monthly </td>
                <td> Monthly or Annually </td>
                <td> Annually </td>
              </tr>
              <tr>
                <td>Billing</td>
                <td> Credit Card </td>
                <td> Credit Card </td>
                <td> Credit Card or ACH </td>
              </tr>
              </table>
            </div>
        </Content>
        <Hero type="grey-mini">
          <Footer />
        </Hero>
      </Layout>
    )
  }
}

export default Pricing