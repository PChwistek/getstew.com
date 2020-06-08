import React from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'
import Hero from '../components/Hero'
import Header from '../components/LandingHeader'
import Content from '../components/Content'
import Intro from '../components/Intro'
import Footer from '../components/Footer'
import PricingOptions from '../components/Pricing/PricingOptions'
import Banner from '../components/ContentLayouts/Banner'
import PricingTable from '../components/Pricing/PricingTable'
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
              slogan="Stew for the whole team (coming soon)"
            />         
          </div>
        </Content>
        <Content>
          <PricingOptions />
        </Content>
          <Banner 
            title="Find the right plan for your team." 
            body="Live long and prosper."
            image="/team.png"
          />
        <Content>
          <PricingTable />
        </Content>
        <Hero type="grey-mini">
          <Footer />
        </Hero>
      </Layout>
    )
  }
}

export default Pricing