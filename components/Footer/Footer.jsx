import Content from '../Content'
import Link from 'next/link'

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
            <div className='footer__company-info'>
              <Link className='footer___company-info--link' href='/pricing'> Pricing </Link>
            </div>
            <div className='footer__company-info'>
              <Link className='footer___company-info--link' href='/faq'> FAQ </Link>
            </div>
            <div className='footer__company-info'>
              <Link className='footer___company-info--link' href='/support'> Support </Link>
            </div>
          </div>
          <div className='footer__row-item'>
            <div className='footer__row-item__title'>
              Company
            </div>
            <div className='footer__company-info'>
              <Link className='footer___company-info--link' href='/privacy-policy'> Privacy Policy </Link>
            </div>
            <div className='footer__company-info'>
              <Link className='footer___company-info--link' href='/terms-of-use'> Terms of Use </Link>
            </div>
            <div className='footer__company-info'>
              <Link className='footer___company-info--link' href='/blog'> Blog </Link>
            </div>
            <div className='footer__company-info'>
              <Link className='footer___company-info--link' href='/contact'> Contact </Link>
            </div>
          </div>
        </div>
      </Content>
    </div>
  )
}