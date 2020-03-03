/* eslint-disable no-console */
import { useEffect } from 'react'
import Router from 'next/router'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'
import fetch from 'isomorphic-unfetch'

export const login = async ({ email, password }) => {
  // Router.push('/account')
  const url = 'http://localhost:3009/auth/login'
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (response.status >= 200 && response.status < 300) {
      const { access_token } = await response.json()
      cookie.set('access_token', access_token, { expires: 1 })
      Router.push('/account')
    } else {
      // https://github.com/developit/unfetch#caveats
      let error = new Error(response.statusText)
      error.response = response
      throw error
    }
  } catch (error) {
    const { response } = error
    return response
  }
}

export const signUp = async ({ email, password, newsletter }) => {
  const url = 'http://localhost:3009/auth/register'
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })

    if (response.status >= 200 && response.status < 300) {
      const { access_token } = await response.json()
      console.log('access token', access_token)
      cookie.set('access_token', access_token, { expires: 1 })
      Router.push('/account')
    } else {
      // https://github.com/developit/unfetch#caveats
      let error = new Error(response.statusText)
      error.response = response
      console.log(error)
      throw error
    }
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
  /*
   * If `ctx.req` is available it means we are on the server.
   * Additionally if there's no token it means the user is not logged in.
   */
  if (ctx.req) {
    const okToken = await checkTokenStatus(access_token)
    if(!okToken) {
      ctx.res.writeHead(302, { Location: '/login' })
      ctx.res.end()
      ctx.res.send()
    }
  }

  // We already checked for server. This should only happen on client.
  if (!access_token) {
    Router.push('/login')
  }
  return access_token
}

export const checkTokenStatus = async (access_token) => {
  console.log('checking')
  const apiUrl =  'http://localhost:3009/auth/validate/' // getHost(ctx.req) + '/api/profile'
  const bearer = 'Bearer ' + access_token;
  const response = await fetch(apiUrl, {
    withCredentials: true,
    credentials: 'include',
    headers: {
        'Authorization': bearer
    }
  })
  console.log('response', response.ok)
  return response.ok
}

export const getAuthorizedContent = async (apiUrl, access_token, ctx) => {
  const redirectOnError = () =>
    typeof window !== 'undefined'
      ? Router.replace('/login')
      : () => { ctx.res.writeHead(302, { Location: '/login' }).end() }

  const bearer = 'Bearer ' + access_token;
  try {
    const response = await fetch(apiUrl, {
      withCredentials: true,
      credentials: 'include',
      headers: {
          'Authorization': bearer,
          'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      const js = await response.json()
      return js
    } else {
      // https://github.com/developit/unfetch#caveats
      return await redirectOnError()
    }

  } catch (error) {
    // Implementation or Network error
    return redirectOnError()
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
    console.log('from cookies', token)
    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx))
    return { ...componentProps, access_token: token }
  }

  return Wrapper
}