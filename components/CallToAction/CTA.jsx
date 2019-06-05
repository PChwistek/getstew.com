import Content from '../Content'
import Button from '../Button'

export default function CTA() {
  return (
    <Content>
      <div className="cta__container">
        <h2>
          Embrace Hermitivity
        </h2>
        <p>
          (productivity + being an internet hermit)
        </p>
        <div className="cta__button-wrapper">
          <Button>
            Add to Chrome (it&apos;s free)
          </Button>
        </div>
      </div>
    </Content>
  )
}