import "../style.scss"
import Header from '../components/Header'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Video from '../components/Video'
import FeaturesRow from '../components/ContentLayouts/FeaturesRow'
import Banner from '../components/ContentLayouts/Banner'
import TextWithImage from '../components/ContentLayouts/TextWithImage'
import ImageRow from '../components/ContentLayouts/ImageRow'
import CTA from '../components/CallToAction'

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
          auxImage="../static/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
        />
      </Hero>
      <Banner 
        title="Multi-taskers get automated" 
        body="Everyone wants it. Make sure that they only have it when you’re not being a productive legend."
        image="../static/support.png"
      />
      <Hero>
        <CTA />
      </Hero>
    </div>
  )
}

export default Index