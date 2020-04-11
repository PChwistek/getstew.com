import React from 'react'
import PropTypes from 'prop-types'
import Content from '../Content'

export default class Video extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        loading: false
      })
    }, 500)
  }

  render() {
    const { loading } = this.state
    const { videoUrl } = this.props
    return (
      <Content>
        <div className="video video__container">
            {
              loading 
                ? <div className="loader">
                  <img src={ "/flask.svg" } className="spinner"/>
                </div>
                : <video autoPlay muted loop playsInline className={"video video__vid"}>
                    <source src={ videoUrl } type="video/mp4" />
                    Your browser is not supported!
                  </video>
            }
        </div>
      </Content>
    )
  }
}

Video.propTypes = {
  videoUrl: PropTypes.string,
}