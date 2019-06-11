import React from 'react'
import Head from 'next/head'

import Layout from '../components/Layout'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Video from '../components/Video'
import FeaturesRow from '../components/ContentLayouts/FeaturesRow'
import Banner from '../components/ContentLayouts/Banner'
import TextWithImage from '../components/ContentLayouts/TextWithImage'
import ImageRow from '../components/ContentLayouts/ImageRow'
import Cta from '../components/CallToAction'
import Footer from '../components/Footer'
import Modal from '../components/Modal'
import "../style.scss"
import { findBrowserType } from '../utils/device_check'

class Index extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      browser: 'Chrome'
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

  componentDidMount() {
    const detectedBrowser = findBrowserType()
    this.setState({
      browser: detectedBrowser
    })
  }

  render() {
    const { showModal, browser } = this.state
    return (
      <Layout>
        <Head>
          <title>hermitly: productive self-exile </title>
          <link rel="icon" href={ '../static/hermitly favicon-02.png' } type="image/png" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="hermitly is a task-management tool that cuts out the distracting parts of the internet while you work" />
        </Head>
        <Modal show={ showModal } closeModal={ this.toggleModal } />
        <Header onLoginClick={ this.toggleModal } />
        <Hero type={ "grey" }>
          <Intro onButtonClick={ this.toggleModal } browser={ browser } />
          <Video />
        </Hero>
        <Hero>
          <FeaturesRow />
        </Hero>
        <Banner 
          title="Your attention is valuable" 
          body="Everyone wants it. Make sure that they only have it when you’re not being a productive legend."
          image="../static/chest.png"
        />
        <Hero>
          <ImageRow 
            title="Bring your favorite tools into your shell"
            body="hermitly works with what you already use"
            imageList={ 
              [
                { caption: "Evernote", image: "../static/evernote.png" },
                { caption: "Todoist", image: "../static/todoist.png" },
                { caption: "Asana", image: "../static/asana.png" },
                { caption: "Google Keep", image: "../static/keep.png" }
              ] 
            }
          />
          <TextWithImage
            title="And it blocks your phone too."
            body="So Karen can’t distract you with cat memes."
            image={ "../static/Apple iPhone XS Max Space Grey.png" }
            auxImage={ "../static/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg" }
          />
        </Hero>
        <Banner 
          title="Multi-taskers get automated" 
          body="The world's most valuable minds work deeply one task at a time. hermitly makes sure you do too."
          image="../static/support.png"
        />
        <Hero>
          <Cta onButtonClick={ this.toggleModal } browser={ browser } />
        </Hero>
        <Hero type="grey-mini">
          <Footer />
        </Hero>
    </Layout>
    )
  }
}

export default Index