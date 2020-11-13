import Layout from '../../components/Layout'
import Header from '../../components/LandingHeader'
import Head from 'next/head'
import Hero from '../../components/Hero'
import Intro from '../../components/Intro'
import Footer from '../../components/Footer'
import Content from '../../components/Content'
import { getAllPostIds, getPostData } from '../../lib/posts'
import "../../style.scss"

export default function Post({ postData }) {  
  return (
    <Layout>
      <Head>
        <title>stew | Blog </title>
        <link rel="icon" href={ '/favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="stew | Blog" />
      </Head>
      <Header heroPhotoPath={ '/stew-title.png' } />
      <Hero type={ "grey-lg" }>
        <Intro 
          slogan={ postData.title}
          description={ postData.date }
        />
        <div className='blog-post__top'>
          <img src={ postData.photo } className='blog-post__image' />
        </div>
        <Content>
          <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </Content>
      </Hero>
      <Footer />
    </Layout>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}


export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)  
  return {
    props: {
      postData
    }
  }
}
