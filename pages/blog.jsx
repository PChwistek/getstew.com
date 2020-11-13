import Layout from '../components/Layout'
import Header from '../components/LandingHeader'
import Head from 'next/head'
import Hero from '../components/Hero'
import Intro from '../components/Intro'
import Footer from '../components/Footer'
import Content from '../components/Content'
import { useRouter } from 'next/router'
import { Card, CardBody, CardFooter, CardTitle, CardImg } from 'shards-react'
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
  const router = useRouter()


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
        <Content>
          <div className='blog-list'>
            {allPostsData.map(({ id, date, title, photo }) => (
              <div key={ id } className='blog-list__item'>
                <Card style={{ cursor: 'pointer' }} onClick={() => router.push('/posts/' + id )}>
                  <CardImg src={ photo } className='blog-list__image'/>
                  <CardBody>
                    <CardTitle> { title } </CardTitle>
                  </CardBody>
                  <CardFooter> { date } </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </Content>
      </Hero>
  
      <Footer />
    </Layout>
  )
}
