import "../style.scss"
import Header from '../components/Header'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Video from '../components/Video'
import FeaturesRow from '../components/FeaturesRow'
import Banner from '../components/Banner'
import TextWithImage from '../components/TextWithImage'

const Index = () => {
  return (
    <div>
      <Hero color={ "grey" }>
        <Header />
        <Intro />
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
        <TextWithImage
          title="And it blocks your phone too."
          body="So Karen can’t distract you with cat memes."
          image={ "../static/Apple iPhone XS Max Space Grey.png" }
          auxImage="../static/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
        />
      </Hero>
      <Banner 
        title="Multi-taskers get automated" 
        body="Everyone wants it. Make sure that they only have it when you’re not being a productive legend."
        image="../static/support.png"
      />
    </div>
  )
}

export default Index