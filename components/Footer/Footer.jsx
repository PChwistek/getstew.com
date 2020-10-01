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
              <br />
              (916) 538-0353
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
              <Link href='//stew-landing.s3.us-east-2.amazonaws.com/Stew+-+Privacy+Policy.pdf'> 
                <a> Privacy Policy  </a>
              </Link>
            </div>
            <div className='footer__company-info'>
              <Link href='//stew-landing.s3.us-east-2.amazonaws.com/Stew+-+Terms+of+Use.pdf'>
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