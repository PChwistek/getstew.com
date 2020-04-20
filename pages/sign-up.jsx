import React from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'
import RegistrationForm from '../components/Form/RegistrationForm'
import SplitPanels, { Panel } from '../components/ContentLayouts/SplitPanels'

import "../style.scss"

const SignUp = () => {
  
  return(
    <Layout>
      <Head>
        <title>stew | Sign Up </title>
        <link rel="icon" href={ '/favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="stew login" />
      </Head>
      <SplitPanels>
        <Panel left={ true }>
          <img src={ '/stew-logo.png' } className={ 'split__image' }/>
        </Panel>
        <Panel>
          <RegistrationForm />
        </Panel>
      </SplitPanels>
    </Layout> 
  )
}


export default SignUp