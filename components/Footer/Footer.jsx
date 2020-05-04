import Content from '../Content'


export default function footer() {
  return (
    <div className="footer">
      <Content>
        <div className='footer__rows'>
          <div className='footer__row-item'>
            <div>
              <div>
                <img src="/stew-logo-white.png" className="footer__image"/>
              </div>
              <div className='footer__company-info'>
              © 2020 Stew, LLC.
              </div>
            </div>
          </div>
          <div className='footer__row-item'>
            <div className='footer__row-item__title'>
              Product
            </div>
            <div className='footer__company-info--link'>
              Pricing
            </div>
            <div className='footer__company-info--link'>
              FAQ
            </div>
            <div className='footer__company-info--link'>
              Support
            </div>
          </div>
          <div className='footer__row-item'>
            <div className='footer__row-item__title'>
              Company
            </div>
            <div className='footer__company-info--link'>
              Privacy Policy
            </div>
            <div className='footer__company-info--link'>
              Terms of Use
            </div>
            <div className='footer__company-info--link'>
              Blog
            </div>
            <div className='footer__company-info--link'>
              Contact
            </div>
          </div>
        </div>
      </Content>
    </div>
  )
}