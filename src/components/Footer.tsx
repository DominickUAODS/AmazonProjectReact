import { ReactSVG } from 'react-svg';
import './Footer.css'

function Footer() {
  return (
    <footer>
      <div className='footer-upper bg-secondary'>
        <div className='footer-upper-inner'>
          <div className='footer-upper-inner-column'>
            <p className='text-main text-2'>Support</p>
            <a className='text-main text-4' href=''>Contact us</a>
            <a className='text-main text-4' href=''>FAQ</a>
          </div>
          <div className='footer-upper-inner-column'>
            <p className='text-main text-2'>Legal notice</p>
            <a className='text-main text-4' href=''>Terms and Conditions</a>
            <a className='text-main text-4' href=''>License agreement</a>
            <a className='text-main text-4' href=''>Privacy Policy</a>
          </div>
          <div className='footer-upper-inner-column'>
            <p className='text-main text-2'>Social media</p>
            <div className='footer-icons-container'>
              <a href=''>
                <ReactSVG className='icon-main-text footer-icon' src='/icons/facebook.svg' />
              </a>
              <a href=''>
                <ReactSVG className='icon-main-text footer-icon' src='/icons/x.svg' />
              </a>
              <a href=''>
                <ReactSVG className='icon-main-text footer-icon' src='/icons/instagram.svg' />
              </a>
              <a href=''>
                <ReactSVG className='icon-main-text footer-icon' src='/icons/gmail.svg' />
              </a>
              <a href=''>
                <ReactSVG className='icon-main-text footer-icon' src='/icons/telegram.svg' />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-lower bg-dark-blue'>
        <div className='footer-lower-inner'>
          <ReactSVG className='logo-main-text footer-logo' src='/img/logo.svg' />
          <p className='text-main text-5'>
            © 2024 Du Soleil. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
