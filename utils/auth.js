/* eslint-disable no-console */
import { useEffect } from 'react'
import Router from 'next/router'
import axios from 'axios'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import getServerHostname  from './getServerHostname'

export const login = async ({ email, password }) => {
  const url = `${getServerHostname()}/auth/login`
  try {
    const response = await axios.post(url, { email: email.toLowerCase(), password })

    if (response.status >= 200 && response.status < 300) {
      const { access_token } = response.data
      cookie.set('access_token', access_token, { expires: 1 })
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
    console.log('response', response)
    if (response.data) {
      const { access_token } = response.data
      cookie.set('access_token', access_token, { expires: 1 })
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

export const auth = async ctx => {
  const { access_token } = nextCookie(ctx)

  if (ctx.req) {
    ctx.res.writeHead(302, { Location: '/login' })
    ctx.res.end()
    return
  }

  if (!access_token) {
    Router.push('/login')
  }

  return access_token
}

export const checkTokenStatus = async (access_token) => {
  const apiUrl = `${getServerHostname()}/auth/validate`
  const config = {
    headers: { Authorization: `Bearer ${access_token}` }
  }

  const response = await axios.get(apiUrl, config)
  return response.ok
}

export const redirectOnError = (ctx) => {
  if(typeof window !== 'undefined') {
    Router.replace('/login')
  } else {
    ctx.res.writeHead(302, { Location: '/login' }).end()
  }
}

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        console.log('logged out from storage!')
        Router.push('/')
      }
    }

    useEffect(() => {
      window.addEventListener('storage', syncLogout)

      return () => {
        window.removeEventListener('storage', syncLogout)
        window.localStorage.removeItem('logout')
      }
    }, [null])

    return <WrappedComponent {...props} />
  }

  Wrapper.getInitialProps = async ctx => {
    const token = await auth(ctx)
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))
    return { ...componentProps, access_token: token }
  }

  return Wrapper
}