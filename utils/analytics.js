import ReactGA from 'react-ga'

export const initGA = () => {
  ReactGA.initialize('UA-140783934-2')
}

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

export const logEvent = (category = '', action = '') => {
  if (category && action) {
    ReactGA.event({ category, action, label: 'Add', value: 0 })
  }
}

export const logException = (description = '', fatal = false) => {
  if (description) {
    ReactGA.exception({ description, fatal })
  }
}