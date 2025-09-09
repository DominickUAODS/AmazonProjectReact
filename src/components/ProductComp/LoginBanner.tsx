import { useAuth } from '../Helpers/AuthContext';
import './LoginBanner.css';
import {useLocation, useNavigate } from 'react-router-dom';
import commonStyles from "../common.module.css";

function LoginBanner() {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    
    const openSignUp = () => {
        if (isAuthenticated) {
            navigate("/settings");
        } else {
            navigate("/signUp", { state: { background: location } });
        }
        };


    const openLogIn = () => {
        if (isAuthenticated) {
                navigate("/settings");
        } else {
            navigate("/signUp", { state: { background: location } });
        }
    };
    return (
        <div className='login-banner bg-object'>
            <picture>
                <source media="(max-width: 768px)" srcSet="/img/bannerLogoMobile.png" />
                <img src="/img/banner_login.png" alt="Product" />
            </picture>

            <div className='login-banner-message-block'>
                <p className='login-banner-title text-main header-1'>Abundance of goods</p>
                <p className='login-banner-description text-main header-3'>Join, choose and buy with confidence!</p>
                <div className='login-banner-buttons'>
                    <button className={`${"login-bann-butt"} ${commonStyles.nextStepButton}`} onClick={openSignUp}>Sign up</button>
                    <button className={`${"login-bann-butt2"} ${commonStyles.secondaryButton}`}  onClick={openLogIn}>Log in</button>
                </div>
            </div>
        </div>
    );
}

export { LoginBanner };
