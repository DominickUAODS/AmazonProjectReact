import './LoginBanner.css';

function LoginBanner() {
    return (
        <div className='login-banner bg-object'>
            <img src='/img/banner_login.png' alt='login-banner' />
            <div className='login-banner-message-block'>
                <p className='login-banner-title text-main header-1'>Abundance of goods</p>
                <p className='login-banner-description text-main header-3'>Join, choose and buy with confidence!</p>
                <div className='login-banner-buttons'>
                    <a className='button button-primary' href='/signup'>Sign up</a>
                    <a className='button button-tertiary button-login' href='/login'>Log in</a>
                </div>
            </div>
        </div>
    );
}

export { LoginBanner };
