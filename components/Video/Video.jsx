import React from 'react'

import Content from '../Content'

export default class Video extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    this.setState({
      loading: false
    })
  }

  render() {
    const { loading } = this.state
    return (
      <Content>
        <div className="video video__container">
          <div className={loading ? "loader" : "loader__none" }>
            <img src={ "/static/spinner.gif" } className="spinner"/>
          </div>
          <video autoPlay muted loop playsinline className={"video video__vid"}>
              <source src="https://storage.googleapis.com/hermitly-assets/hermitly_demo_6.mp4" type="video/mp4" />
              Your browser is not supported!
          </video>
        </div>
      </Content>
    )
  }
}