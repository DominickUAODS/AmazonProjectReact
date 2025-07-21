import './Footer.css'
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div className='footer-upper bg-secondary'>
        <div className='footer-upper-inner'>
          <div className='footer-upper-inner-column'>
            <p className='text-main text-2'>Support</p>
            <Link className='text-main text-4' to=''>Contact us</Link>
            <Link className='text-main text-4' to=''>FAQ</Link>
          </div>
          <div className='footer-upper-inner-column'>
            <p className='text-main text-2'>Legal notice</p>
            <Link className='text-main text-4' to=''>Terms and Conditions</Link>
            <Link className='text-main text-4' to=''>License agreement</Link>
            <Link className='text-main text-4' to=''>Privacy Policy</Link>
          </div>
          <div className='footer-upper-inner-column'>
            <p className='text-main text-2'>Social media</p>
            <div className='footer-icons-container'>
              <Link to=''>
                <ReactSVG className='icon-main-text footer-icon' src='/icons/facebook.svg' />
              </Link>
              <Link to=''>
                <ReactSVG className='icon-main-text footer-icon' src='/icons/x.svg' />
              </Link>
              <Link to=''>
                <ReactSVG className='icon-main-text footer-icon' src='/icons/instagram.svg' />
              </Link>
              <Link to=''>
                <ReactSVG className='icon-main-text footer-icon' src='/icons/gmail.svg' />
              </Link>
              <Link to=''>
                <ReactSVG className='icon-main-text footer-icon' src='/icons/telegram.svg' />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className='footer-lower bg-dark-blue'>
        <div className='footer-lower-inner'>
          <Link to=''>
            <ReactSVG className='logo-main-text footer-logo' src='/img/logo.svg' />
          </Link>
          <p className='text-main text-5'>
            © 2024 Du Soleil. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export { Footer };
