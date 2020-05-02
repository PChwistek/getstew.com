import React, { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import PropTypes from 'prop-types'
import Header from '../../components/LandingHeader'
import Layout from '../../components/Layout'
import Head from 'next/head'
import getServerHostname from '../../utils/getServerHostname'
import Button from '../../components/Button'
import { getDaysFrom } from '../../utils/getDaysFromDate'
import { withAuthSync } from '../../utils/auth'
import LoginPrompt from '../../components/LoginPrompt/LoginPrompt'
import AuthedAppWrapper from '../../components/AuthedAppWrapper'
import "../../style.scss"

const Shared = (props) => {
  const { name, author, dateModified, config } = props.recipe
  const { allowed, inLibrary, axiosConfig, sid } = props
  console.log('token', props.token)
  const [isInLibrary, setIsInLibrary] = useState(inLibrary || false)
  
  async function addToLibrary() {
    if(!isInLibrary) {
      const response = await axios.post(`${getServerHostname()}/recipe/share/import`, { 
        recipeId: sid,
        adding: true,
      }, axiosConfig)
      if (response.statusText >= 200 ** response.statusText < 400) {
        setIsInLibrary(true)
      }
    }
  }

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
        {
            allowed 
              ? <AuthedAppWrapper logoSrc={ '../stew-logo-white.png' }>
                <div className="content content__intro content__intro--lg">
                  <div className={ 'content__shared'}>
                    <div className={ 'content__shared__half content__shared__half--left'}>
                      <h1> { name } </h1>
                      <p> Last updated { getDaysFrom(dateModified) } by { author } </p>
                      <div style={ { paddingTop: '20px' } }>
                      {
                        isInLibrary
                          ?  <Button disabled onClick={ () => {} }>
                            <img className='button__icon' src='/correct.png' /> In your library
                          </Button>
                          : <Button primary onClick={ addToLibrary }>
                            Add to your library
                          </Button>
                      }
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
                </div>
              </AuthedAppWrapper>
              : <div>
              <Header heroPhotoPath={ '../stew-title.png' }/>
              <LoginPrompt />
              </div>
          }
      </Layout>
    )
}

Shared.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx)
  const { res, query } = ctx

  const redirectOnError = () =>
  typeof window !== 'undefined'
    ? Router.push('/login')
    : ctx.res.writeHead(302, { Location: '/login' }).end()

    if(token) {
      try {
        const axiosConfig = {
          headers: { Authorization: `Bearer ${token}` }
        }
        
        const response = await axios.get(`${getServerHostname()}/recipe/share/${query.sid}`, axiosConfig)
        if (response.data.recipe) {
          return {
            allowed: true,
            sid: query.sid,
            recipe: response.data.recipe[0],
            inLibrary: response.data.alreadyInLibrary,
            axiosConfig,
          }
        } else if (response.data.response.statusCode === 403) {
          res.statusCode = 403
          res.end('Forbidden')
          return
        } else if (response.data.response.statusCode === 404) {
          res.statusCode = 404
          res.end('Not found')
          return
        }
      } catch(error) {
        return redirectOnError()
      }
    }

    return {
      allowed: false,
      sid: '',
      recipe: {
        name: '',
        author: '',
        config: [],
        dateModified: new Date()
      },
      inLibrary: false,
      axiosConfig: { headers: { }},
      token,
    }
    
}

Shared.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string, 
    author: PropTypes.string,
    dateModified: PropTypes.string, 
    config: PropTypes.array,
  }),
  sid: PropTypes.string,
  allowed: PropTypes.bool,
  inLibrary: PropTypes.bool,
  axiosConfig: PropTypes.shape({ headers: PropTypes.object }),
}
 

export default withAuthSync(Shared)