import './Header.css'
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className='header bg-secondary'>
      <div className='header-logo-container'>
        <Link to=''>
          <ReactSVG className='icon-main-text header-icon' src="/icons/menu.svg" />
        </Link>
        <Link to=''>
          <ReactSVG className='logo-main-text header-logo' src="/img/logo.svg" />
        </Link>
      </div>
      <form action='/products' method='get' className='input-container header-form'>
        <input name='search' placeholder='Search...' />
        <button className='button header-button-search button-primary' type='submit'>
          <ReactSVG className='header-search-icon' src='/icons/search.svg' />
        </button>
      </form>
      <div className='header-nav-container'>
        <Link to=''>
          <ReactSVG className='icon-main-text header-icon' src="/icons/user.svg" />
        </Link>
        <Link to=''>
          <ReactSVG className='icon-main-text header-icon' src="/icons/cart_empty.svg" />
        </Link>
      </div>
    </div>
  );
}

export { Header };
