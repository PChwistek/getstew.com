import React, { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import PropTypes from 'prop-types'
import Header from '../../components/LandingHeader'
import { Card, CardBody } from "shards-react"
import Layout from '../../components/Layout'
import Head from 'next/head'
import getServerHostname from '../../utils/getServerHostname'
import Button from '../../components/Button'
import { getDaysFrom } from '../../utils/getDaysFromDate'
import { withSoftAuthSync } from '../../utils/auth'
import LoginPrompt from '../../components/LoginPrompt/LoginPrompt'
import AuthedAppWrapper from '../../components/AuthedAppWrapper'
import Footer from '../../components/Footer'
import Content from '../../components/Content'
import "../../style.scss"

const RecipeConfig = ({ props }) => {
  const { inLibrary, axiosConfig, sid, authed, isAuthor } = props
  const { name, author, dateModified, config } = props.recipe
  const [isInLibrary, setIsInLibrary] = useState(inLibrary || false)

  function handleCardClick(url) {
    window.open(url, '_ blank');
  }

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
              : <Button onClick={ addToLibrary } disabled={ !authed }>
                { authed ? 'Add to library' : 'Stew account needed to save' }
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
                      <Card className='tab__card' onClick={ () => handleCardClick(tab.url) }>
                        <CardBody>
                          <img src={ tab.favIconUrl || '/chrome.png' } className='tab__fav' /> 
                          { tab.title } 
                        </CardBody>
                      </Card>
                    </div>
                  ))
                }
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const Shared = (props) => {
  const { allowed, authed, stewAllowed} = props
  function getAppropriateView() {
    if (authed && allowed) {
      return (
        <AuthedAppWrapper logoSrc={ '../stew-logo-white.png' }>
          <RecipeConfig props={ {...props} } />
        </AuthedAppWrapper>
      )
    } else if (!authed && stewAllowed) {
      return (
        <div>
          <Header heroPhotoPath={ '../stew-title.png' }/>
          <LoginPrompt />
        </div>
      )
    } else {
      return (
        <div>
          <Header heroPhotoPath={ '/stew-title.png' } />
          <Layout>
            <Content>
                <RecipeConfig props={ {...props} } />
            </Content>
            <div style={{ paddingBottom: '150px' }}/>
            <Footer />
          </Layout> 
        </div>
      )
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
        { getAppropriateView() }
      </Layout>
    )
}

Shared.getInitialProps = async ctx => {
  const { token = '' } = nextCookie(ctx)
  const { res, query } = ctx

  const redirectOnError = () =>
  typeof window !== 'undefined'
    ? Router.push('/login')
    : ctx.res.writeHead(302, { Location: '/login' }).end()

    try {
      const axiosConfig = {
        headers: { Authorization: `Bearer ${token}` }
      }
      const response = await axios.get(`${getServerHostname()}/recipe/share/${query.sid}`, axiosConfig)
      if (response.data.recipe) {
        return {
          allowed: true,
          stewAllowed: response.data.stewAllowed,
          authed: response.data.authed,
          sid: query.sid,
          recipe: response.data.recipe[0],
          inLibrary: response.data.alreadyInLibrary,
          axiosConfig,
          isAuthor: response.data.isAuthor,
        }
      } else if (response.data.response.statusCode === 403) {
        const needLogin = response.data.response.message === 'Please login to Stew.'
        if (needLogin) {
          return {
            allowed: false,
            stewAllowed: true,
            authed: false,
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
            isAuthor: false,
          }
        }
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
    
    return {
      allowed: false,
      authed: false,
      stewAllowed: false,
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
      isAuthor: false,
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
 

export default withSoftAuthSync(Shared)