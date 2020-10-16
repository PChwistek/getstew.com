import { useState } from 'react'
import axios from 'axios'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import { Card, CardBody,  Dropdown, DropdownToggle,DropdownMenu,DropdownItem } from "shards-react"
import PropTypes from 'prop-types'
import Header from '../../components/LandingHeader'
import Layout from '../../components/Layout'
import Head from 'next/head'
import getServerHostname, { getWebsiteHostname } from '../../utils/getServerHostname'
import { getDaysFrom } from '../../utils/getDaysFromDate'
import { withSoftAuthSync } from '../../utils/auth'
import LoginPrompt from '../../components/LoginPrompt/LoginPrompt'
import TimedAlert from '../../components/TimedAlert'
import AuthedAppWrapper from '../../components/AuthedAppWrapper'
import "../../style.scss"

const RecipeDetail = (props) => {
  const { name, author, dateModified, config, linkPermissions = [], shareableId } = props.recipe
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [copiedVisible, setCopiedVisible] = useState(false)
  const [privacyLevelSelected, setPrivacyLevelSelected] = useState(linkPermissions.length > 0 ? linkPermissions[0] : 'any')
  const { allowed } = props

  function handleCardClick(url) {
    window.open(url, '_ blank');
  }

  function copyToClipboard() {
    navigator.clipboard.writeText(`${getWebsiteHostname()}/shared/${shareableId}`)
      .then(() => {
        setCopiedVisible(true)
        setTimeout(() => { setCopiedVisible(false) }, 1500)
      })
  }

  function getPermissionText() {
    if (privacyLevelSelected === 'any') {
      return 'Anyone'
    } else if (privacyLevelSelected === 'stew') {
      return 'Stew Users Only'
    }
    return 'Just me'
  }

  async function handlePermissionSelection(privacyLevel) {
    setPrivacyLevelSelected(privacyLevel)
    const { _id, repos, orgId } = props.recipe
    const newLinkPermissions = []
    newLinkPermissions.push(privacyLevel)
    axios
      .patch(`${getServerHostname()}/recipe/permissions`, {
        _id,
        linkPermissions: newLinkPermissions,
        repos,
        orgId,
      }, props.axiosConfig)
  }

  return (
      <Layout>
        <Head>
          <title>stew | Recipe - {name} </title>
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
                      <h3> Get shareable link <img src={'/link.png'} className='copy-link' onClick={ copyToClipboard } /> </h3>
                      <TimedAlert 
                        visible={ copiedVisible }
                        text={ 'Shareable Link Copied'}
                      />                      
                      <p> Who can view your recipe via shareable link? </p>
                      <div style={ { marginTop: '-30px !important' } }>
                        <Dropdown open={ isDropdownOpen } toggle={ () => setIsDropdownOpen(!isDropdownOpen) }>
                          <DropdownToggle> { getPermissionText() } </DropdownToggle>
                          <DropdownMenu>
                            <DropdownItem 
                              active={ privacyLevelSelected === 'any' }
                              onClick={ () => handlePermissionSelection('any')}
                            > Anyone </DropdownItem>
                            <DropdownItem 
                              active={ privacyLevelSelected === 'stew' }
                              onClick={ () => handlePermissionSelection('stew')}
                            > Stew Users Only </DropdownItem>
                            <DropdownItem 
                              active={ privacyLevelSelected === 'off' }
                              onClick={ () => handlePermissionSelection('off')}
                            > Just me </DropdownItem>
                          </DropdownMenu>
                        </Dropdown>
                      </div>
                    </div>
                    <div className={ 'content__shared__half content__shared__half--right'} style={ { paddingBottom: '100px' }}>
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
              </AuthedAppWrapper>
              : <div>
              <Header heroPhotoPath={ '../stew-title.png' }/>
              <LoginPrompt />
              </div>
          }
      </Layout>
    )
}

RecipeDetail.getInitialProps = async ctx => {
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
        const response = await axios.get(`${getServerHostname()}/recipe/${query.rid}`, axiosConfig)
        if (response.data.recipe) {
          return {
            allowed: true,
            rid: query.rid,
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
      rid: '',
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

RecipeDetail.propTypes = {
  recipe: PropTypes.shape({
    name: PropTypes.string, 
    author: PropTypes.string,
    dateModified: PropTypes.string, 
    config: PropTypes.array,
  }),
  rid: PropTypes.string,
  allowed: PropTypes.bool,
  inLibrary: PropTypes.bool,
  axiosConfig: PropTypes.shape({ headers: PropTypes.object }),
}
 

export default withSoftAuthSync(RecipeDetail)