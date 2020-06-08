import React from 'react'
import Layout from '../components/Layout'
import Header from '../components/LandingHeader'
import Head from 'next/head'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Footer from '../components/Footer'
import Banner from '../components/ContentLayouts/Banner'
import TextWithImage from '../components/ContentLayouts/TextWithImage'
import TextWithImageTop from '../components/ContentLayouts/TextWithImageTop'
import "../style.scss"

const AboutTeams = () => {
  
  return(
    <Layout>
      <Head>
        <title>stew | About Teams </title>
        <link rel="icon" href={ '/favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="stew | About Teams" />
      </Head>
      <Header heroPhotoPath={ '/stew-title.png' } />
      <Hero type={ "grey" }>
        <Intro 
          slogan="Allow your team to work smarter"
          description="Make the most of shared repositories"
        />
        <div className='about-teams__img-container'>
          <img src='./new-team.png' className='about-teams__img'/>
        </div>
      </Hero>
      <Hero>
        <TextWithImage
          title="Discover shared repositories"
          body="Repositories allow your team to share workspaces, such as those for projects or wikis."
          image={ "/repos.png" }
        />
      </Hero>
      <Banner 
          title="Discover what tools your team is using." 
          body="Analytics provide insight into what tools your team uses most."
          image="/analytics.png"
        />
        <Hero>
          <TextWithImageTop 
            title="Coming soon"
            imagePath="/excited.png"
          />
        </Hero>
      <Footer />
    </Layout> 
  )
}


export default AboutTeams