import React from 'react'
import axios from 'axios'
import Layout from '../../components/Layout'
import Content from '../../components/Content'
import Head from 'next/head'
import Hero from '../../components/Hero'
import getServerHostname from '../../utils/getServerHostname'
import Header from '../../components/LandingHeader'
import Button from '../../components/Button'
import { getDaysFrom } from '../../utils/getDaysFromDate'
import "../../style.scss"


const Shared = (props) => {
  const { name, author, dateModified, config } = props.recipe
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
        <Hero type={ "grey-lg" }>
          <div className="content content__intro content__intro--lg">
            <Content>
              <div className={ 'content__shared'}>
                <div className={ 'content__shared__half content__shared__half--left'}>
                  <h1> { name } </h1>
                  <p> Last updated { getDaysFrom(dateModified) } by { author } </p>
                  <div style={ { paddingTop: '20px' } }>
                    <Button primary onClick={ () => {} }>
                      Add to your library
                    </Button>
                  </div>
                </div>
                <div className={ 'content__shared__half content__shared__half--right'}>
                  <div>
                    { config.map((win, winIndex) => (
                      <div key={ winIndex }>
                        <div className='window-row'>     
                          <div className='window-title'>Window { winIndex + 1 } </div>
                            <img src={ '/window-sketch.png' } className='window-icon' />
                          </div>
                        {
                          (win && win.tabs.length > 0) && win.tabs.map( (tab, tabIndex) => (
                            <div className='tab__row' key={ 'row' + tabIndex }>
                                <div className='tab__body'>
                                  <img src={ tab.favIconUrl || '/chrome.png' } className='tab__fav' />
                                    <p className='tab__title'>
                                      <a href={ tab.url } className={ 'tab__title' } target="blank">
                                        { tab.title }          
                                      </a>
                                    </p>
                                </div>
                            </div>
                          ))
                        }
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Content>
          </div>
        </Hero>
      </Layout>
    )
}

Shared.getInitialProps = async ({ query }) => {

  try {
    // const config = {
    //   headers: { Authorization: `Bearer ${token}` }
    // }

    const response = await axios.get(`${getServerHostname()}/recipe/share/${query.sid}`)
    if (response.statusText >= 200 ** response.statusText < 400) {
      return {
        sid: query.sid,
        recipe: response.data[0]
      }
    }
  } catch(error) {
    console.log(error)
  }
}
 

export default Shared