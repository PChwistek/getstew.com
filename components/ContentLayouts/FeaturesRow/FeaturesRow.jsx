import Content from '../../Content'

const FeaturesRow = () => {
  const features = [
    {
      title: "Customize",
      body: "Adjust the timer according to your needs. Blacklist any site you find distracting. Choose your background noise."
    },
    {
      title: "Organize",
      body: "Break down intimidating projects into smaller, workable chunks. Manage your progress and hours."
    },
    {
      title: "Do More, Better",
      body: "Isolating problems and working on them deeply yields better results, faster."
    },
    {
      title: "Improve",
      body: "Receive diagnostics regarding your productivity. Identify distracting or problematic sites."
    }  
  ]

  return (
    <Content>
      <div className={ "features features__container" }>
        <div className={ "features features__row"} >
        {
            features.map((feature, index) => (
              <div key={ index } className="features features__item">
                <div className="features features__title">
                  { feature.title }
                </div>
                <div className="features features__body">
                  { feature.body }
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </Content>
  )
}

export default FeaturesRow
