import React from 'react'
import Layout from '../components/Layout'
import Head from 'next/head'
import Link from 'next/link'
import SplitPanels, { Panel } from '../components/ContentLayouts/SplitPanels'
import TextField from '../components/TextField'
import Button from '../components/Button'
import "../style.scss"

const PasswordReset = () => {
  // const [userData, setUserData] = useState({ username: '', error: '' })

  return(
    <Layout>
      <Head>
        <title>stew | Sign Up </title>
        <link rel="icon" href={ '../static/favicon.png' } type="image/png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="stew login" />
      </Head>
      <SplitPanels>
        <Panel left={ true }>
          <img src={ '../static/stew-logo.png' } className={ 'split__image' }/>
        </Panel>
        <Panel left={ false }>
          <img src={ '../static/stew-logo.png' } className={ 'split__image split__image--mobile' }/>
          <div className={ 'content__app split__form'}>
            <h2> Let&apos;s get your stew back! </h2>
            <div className={ 'split__form-item split__text' }>
              We&apos;ll send you an email with instructions to reset your password.
            </div>
            <div className="split__form-item">
              <TextField type={ 'text' } label={ 'EMAIL' } /> 
            </div>
            <div className="split__form-item">
              <Button onClick={ e => this.handleSubmit(e) }>
                Reset
              </Button>
            </div>
            <div className="split__form-item--extra-space">
              <div className="split__small-text">
                Know your password? &nbsp;
                <Link href="/login">
                  <a className='split__small-text--bold'>Sign in</a>
                </Link>
              </div>
            </div>
          </div>
        </Panel>
      </SplitPanels>
    </Layout> 
  )
}


export default PasswordReset