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
              <Link href='/about-teams'> 
                <a> Teams </a>
              </Link>
            </div>
            <div className='footer__company-info'>
              <Link href='/pricing'> 
                <a> Pricing </a>
              </Link>
            </div>
            <div className='footer__company-info'>
              <Link href='/faq'> 
                <a> FAQ </a>  
              </Link>
            </div>
            <div className='footer__company-info'>
              <Link href='/support'> 
                <a> Support </a>
              </Link>
            </div>
          </div>
          <div className='footer__row-item'>
            <div className='footer__row-item__title'>
              Company
            </div>
            <div className='footer__company-info'>
              <Link href='/privacy-policy'> 
                <a> Privacy Policy  </a>
              </Link>
            </div>
            <div className='footer__company-info'>
              <Link href='/terms-of-use'>
                <a> Terms of Use  </a>
              </Link>
            </div>
            <div className='footer__company-info'>
              <Link href='/blog'>
                <a> Blog </a> 
              </Link>
            </div>
            <div className='footer__company-info'>
              <Link  href='/contact'> 
                <a> Contact </a> 
              </Link>
            </div>
          </div>
        </div>
      </Content>
    </div>
  )
}