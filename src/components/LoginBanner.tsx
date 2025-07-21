import './LoginBanner.css';
import { Link } from 'react-router-dom';

function LoginBanner() {
    return (
        <div className='login-banner bg-object'>
            <img src='/img/banner_login.png' alt='login-banner' />
            <div className='login-banner-message-block'>
                <p className='login-banner-title text-main header-1'>Abundance of goods</p>
                <p className='login-banner-description text-main header-3'>Join, choose and buy with confidence!</p>
                <div className='login-banner-buttons'>
                    <Link className='button button-primary' to='/signup'>Sign up</Link>
                    <Link className='button button-tertiary button-login' to='/login'>Log in</Link>
                </div>
            </div>
        </div>
    );
}

export { LoginBanner };
