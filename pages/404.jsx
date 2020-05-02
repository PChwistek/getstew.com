import Head from 'next/head'
import Layout from '../components/Layout'
import Header from '../components/LandingHeader'
import Content from '../components/Content'
import Intro from '../components/Intro'
import "../style.scss"

export default function Custom404() {
  return (
    <Layout>
      <Head>
        <title>stew | 404 </title>
        <link rel="icon" href={ '/favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header heroPhotoPath={ '/stew-title.png' } />
      <Content>
        <div className='not-found__body'>
         <Intro 
            slogan="404 - Page Not Found "
          />         
          <div>
            <img src='./error.png' className='not-found__illustration'/>
          </div>
        </div>
      </Content>
    </Layout>
  )
}