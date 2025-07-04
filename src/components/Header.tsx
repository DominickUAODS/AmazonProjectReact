import { ReactSVG } from 'react-svg';
import './Header.css'

function Header() {
  return (
    <div className='header bg-secondary'>
      <div className='header-logo-container'>
        <a href=''>
          <ReactSVG className='icon-main-text header-icon' src="/icons/menu.svg" />
        </a>
        <a href=''>
          <ReactSVG className='logo-main-text header-logo' src="/img/logo.svg" />
        </a>
      </div>
      <form className='input-container header-form'>
        <input name='search' placeholder='Search...' />
        <button className='button header-button-search button-primary' type='submit'>
          <ReactSVG className='header-search-icon' src='/icons/search.svg' />
        </button>
      </form>
      <div className='header-nav-container'>
        <a href=''>
          <ReactSVG className='icon-main-text header-icon' src="/icons/user.svg" />
        </a>
        <a href=''>
          <ReactSVG className='icon-main-text header-icon' src="/icons/cart_empty.svg" />
        </a>
      </div>
    </div>
  );
}

export { Header };
