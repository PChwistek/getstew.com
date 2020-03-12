/* eslint-disable no-console */
import Router from 'next/router'
import axios from 'axios'
import cookie from 'js-cookie'
import getServerHostname  from './getServerHostname'

const isProd = process.env.environment

export function setJWT(jwt) {
  if(isProd) {
    cookie.set('access_token', jwt, {
      sameSite: 'strict',
      expires: 1,
      domain: '.getstew.com'
    })
  } else {
    cookie.set('access_token', jwt, {
      sameSite: 'strict',
      expires: 1,
    })
  }
}

export function getJWT() {
  return cookie.get('access_token')
}

export const login = async ({ email, password }) => {
  const url = `${getServerHostname()}/auth/login`
  try {
    const response = await axios.post(url, { email: email.toLowerCase(), password })
    if (response.status >= 200 && response.status < 400) {
      const { access_token } = response.data
      setJWT(access_token)
      Router.push('/account')
    } else {
      let error = new Error(response.statusText)
      error.response = response
      throw error
    }
    return response
  } catch (error) {
    const { response } = error
    return response
  }
}

export const signUp = async ({ email, password, newsletter }) => {
  const url = `${getServerHostname()}/auth/register`
  try {
    const response = await axios.post(url, { email: email.toLowerCase(), password })
    if (response.data) {
      const { access_token } = response.data
      setJWT(access_token)
      Router.push('/account')
    } else {
      let error = new Error(response.statusText)
      error.response = response
      throw error
    }
    return response
  } catch (error) {
    const { response } = error
    return response
  }
}

export const logout = () => {
  cookie.remove('access_token')
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now())
  Router.replace('/login')
}

export const checkTokenStatus = async (access_token) => {
  const apiUrl = `${getServerHostname()}/auth/validate`
  const config = {
    headers: { Authorization: `Bearer ${access_token}` }
  }

  const response = await axios.get(apiUrl, config)
  return response.ok
}