import React from 'react'
import Head from 'next/head'
import TextLoop from 'react-text-loop'
import Layout from '../components/Layout'
import Header from '../components/LandingHeader'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Video from '../components/Video'
import FeaturesRow from '../components/ContentLayouts/FeaturesRow'
import Banner from '../components/ContentLayouts/Banner'
import TextWithImage from '../components/ContentLayouts/TextWithImage'
import TextWithImageTop from '../components/ContentLayouts/TextWithImageTop'
import Cta from '../components/CallToAction'
import Footer from '../components/Footer'
import MailModal from '../components/Modal/MailModal'
import { findBrowserType } from '../utils/device_check'
import { logEvent } from '../utils/analytics'
import "../style.scss"


class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      browser: 'Chrome',
      isMobile: false,
    }
  }

  toggleModal = () => {
    const { showModal } = this.state
    const newShowModal = !showModal
    this.setState({
      showModal: newShowModal
    })
    document.body.style.overflow = newShowModal ? "hidden": "visible"
  }

  onButtonClick = () => {
    this.toggleModal()
    logEvent('add to', 'click')
  }

  resize = () => {
    this.setState({ isMobile: window.innerWidth <= 900})
  }

  componentDidMount() {
    const detectedBrowser = findBrowserType()
    window.addEventListener("resize", this.resize)
    this.setState({
      browser: detectedBrowser,
      isMobile: window.innerWidth <= 900,
    })
  }

  render() {
    const { showModal, browser } = this.state
    return (
      <Layout>
        <Head>
          <title>stew: collaborative tab management </title>
          <link rel="icon" href={ '/favicon.png' } type="image/png" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="stew is the smart tab manager built for collaboration" />
        </Head>
        <MailModal show={ showModal } closeModal={ this.toggleModal } />
        <Header heroPhotoPath={ '/stew-title.png' } />
        <Hero type={ "grey" }>
          <Intro 
            onButtonClick={ this.onButtonClick } 
            browser={ browser } 
            slogan="Get your f***ing tabs in order"
            description="stew is the smart tab manager built for collaboration"
          />
          <Video videoUrl="https://stew-landing.s3.us-east-2.amazonaws.com/stew.mp4" />
        </Hero>
        <Hero>
          <FeaturesRow />
        </Hero>
        <Banner 
          title="Browsers used to be just for browsing." 
          body="stew makes sure your browser works for work."
          image="/browsing-2.png"
        />
        <Hero>
          <TextWithImage
            title="Save time when setting up."
            body="stew helps you find custom or community-made tab setups to get your work done better and faster."
            image={ "/blast-off.png" }
          />
          <TextWithImageTop 
            title="It's great for teams too"
            body="private repositories enable your team to do more, together"
            imagePath="/new-team.png"
          />
        </Hero>
        { this.state.browser !== 'Firefox' && !this.state.isMobile
        ?
          <Banner 
            image="/sboy_cannons2.png"
          >
              <TextLoop>
                <div className="banner__item banner--center">
                  <h2> Students use Stew to manage GSuite </h2>
                </div>
                <div className="banner__item banner--center">
                  <h2> Developers use Stew to share documentation </h2> 
                </div>
                <div className="banner__item banner--center">
                  <h2> Managers use Stew to share wikis </h2> 
                </div>
                <div className="banner__item banner--center">
                  <h2> Accountants use Stew to manage spreadsheets </h2>
                </div>
                <div className="banner__item banner--center">
                  <h2> Analysts use Stew to share research </h2> 
                </div>
              </TextLoop>
          </Banner>
          : <Banner
              title="Sharing is caring." 
              body="Great things come from sharing: Wikipedia, Open Source Software, and now, better browser workflows."
              image="/sboy_cannons2.png"
           />
        }
        <Hero>
          <Cta onButtonClick={ this.onButtonClick } browser={ browser } title="Discover the best workflow recipes!" body="It’s like your grandma’s cookbook, but for tabs" />
        </Hero>
        <Hero type="grey-mini">
          <Footer />
        </Hero>
    </Layout>
    )
  }
}

export default Index