
const Video = () => {

  return (
    <div>
      <video autoPlay muted loop className="video">
          <source src="/static/hermitly_landing_demo.mp4" type="video/mp4"/>
          Your browser is not supported!
      </video>
    </div>
  )
}

export default Video