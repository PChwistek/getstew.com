import "../style.scss"
import Header from '../components/Header'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Video from '../components/Video'

const Index = () => {
  return (
    <div>
      <Hero>
        <Header/>
        <Intro />
        <Video />
      </Hero>
    </div>
  )
}

export default Index