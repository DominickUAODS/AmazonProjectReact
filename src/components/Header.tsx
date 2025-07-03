import { ReactSVG } from 'react-svg';
import './Header.css'

function Header() {
  return (
    <div className='header bg-secondary'>
      <div className='header-logo-container'>
        <ReactSVG className='icon-main-text header-icon' src="/icons/menu.svg" />
        <ReactSVG className='header-logo' src="/img/logo.svg" />
      </div>
      <form className='input-container header-form'>
        <input name='search' placeholder='Search...' />
        <button className='button header-button-search button-primary' type='submit'>
          <ReactSVG className='header-search-icon' src='/icons/search.svg' />
        </button>
      </form>
      <div className='header-nav-container'>
        <ReactSVG className='icon-main-text header-icon' src="/icons/user.svg" />
        <ReactSVG className='icon-main-text header-icon' src="/icons/cart_empty.svg" />
      </div>
    </div>
  );
}

export { Header };
