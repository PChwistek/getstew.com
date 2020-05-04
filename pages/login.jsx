import React from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import SplitPanels, { Panel } from '../components/ContentLayouts/SplitPanels'
import LoginForm from '../components/Form/LoginForm'
import "../style.scss"

const Login = () => {
  return(
    <Layout>
      <Head>
        <title>stew | Login </title>
        <link rel="icon" href={ '/favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="stew login" />
      </Head>
      <SplitPanels>
        <Panel left={ true }>
          <Link href={ '/' }>
            <img src={ '/stew-logo.png' } className={ 'split__image' }/>
          </Link>
        </Panel>
        <Panel left={ false }>
          <LoginForm />
        </Panel>
      </SplitPanels>
    </Layout> 
  )
}

export default Login