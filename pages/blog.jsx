import Layout from '../components/Layout'
import Header from '../components/LandingHeader'
import Head from 'next/head'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Footer from '../components/Footer'
import "../style.scss"

import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

export default function Blog({ allPostsData }) {
  return (
    <Layout>
      <Head>
        <title>stew | Blog </title>
        <link rel="icon" href={ '/favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="stew | Blog" />
      </Head>
      <Header heroPhotoPath={ '/stew-title.png' } />
      <Hero type={ "grey" }>
        <Intro 
          slogan="The Stew Blog"
          description="Improving internet productivity"
        />
        <h2>Blog</h2>
        <ul>
           {allPostsData.map(({ id, date, title }) => (
            <li key={ id }>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </Hero>
  
      <Footer />
    </Layout>
  )
}
