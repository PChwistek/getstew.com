import React from 'react'

import Content from '../Content'

const Video = () => {

  return (
    <Content>
      <div className="video video__container">
          <video autoPlay muted loop className="video video__vid">
              <source src="/static/hermitly_demo_6.mp4" type="video/mp4" />
              Your browser is not supported!
          </video>
      </div>
    </Content>
  )
}

export default Video