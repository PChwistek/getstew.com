import Content from '../../Content'

const FeaturesRow = () => {
  const features = [
    {
      title: "Save",
      body: "Take a snapshot of your current browser setup for later. Save time when setting up a project."
    },
    {
      title: "Share",
      body: "Export your configuration and share with others, inside or outside your organization."
    },
    {
      title: "Publish",
      body: "Share your stew in the global directory. Improve your karma when someone uses your recipe."
    },
    {
      title: "Search",
      body: "Find and save a browser workflow that suits your needs. Powered by natural language processing."
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
