import React from 'react'
import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import Head from 'next/head'
import Hero from '../../components/Hero'
import Header from '../../components/LandingHeader'
import "../../style.scss"


const Shared = () => {
  const router = useRouter()
  return (
      <Layout>
        <Head>
          <title>stew | shared </title>
          <link rel="icon" href={ '/favicon.png' } type="image/png" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="description" content="Click here to add the recipe to your library."/>
          <meta property="og:title" content="Someone shared a stew recipe!" />
          <meta property="og:image" content="/stew-logo.png" />
        </Head>
        <Header heroPhotoPath={ '/stew-logo.png' } />
        <Hero type="grey-lg">
            Shared
            <h1> { router.query.sid } </h1>
        </Hero>
      </Layout>
    )
}

export default Shared