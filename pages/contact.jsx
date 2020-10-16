import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/LandingHeader'
import Head from 'next/head'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Footer from '../components/Footer'
import "../style.scss"

const Contact = () => {
  
  return(
    <Layout>
      <Head>
        <title>stew | Contact </title>
        <link rel="icon" href={ '/favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="stew | Contact" />
      </Head>
      <Header heroPhotoPath={ '/stew-title.png' } />
      <Hero type={ "grey" }>
        <Intro 
          slogan="Don't be shy!"
          description="You can contact us at support@getstew.com"
        />
      </Hero>
      <Footer />
    </Layout> 
  )
}


export default Contact