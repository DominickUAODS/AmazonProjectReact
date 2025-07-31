
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './SignUpForm.module.css'
import commonStyles from '../common.module.css';


export default function SignUpForm({ background }: { background: Location }) {
    const navigate = useNavigate();

	const openLogIn = () => {
		navigate('/login',{ state: { background } });
	};

    const openCheckIn = () => {
		navigate('/checkIn',{ state: { background } });
	};

	return (
		<div className={styles.signUpForm}>
            <div className={styles.inputWrappersBlock}>
                <fieldset className={styles.inputWrapper}>
                    <legend>Email</legend>
                    <input type="email" placeholder="Enter your email" />
                </fieldset>


                <fieldset className={styles.inputWrapper}>
                    <legend>Password</legend>
                    <input type="password" placeholder="Enter your password" />
                    <button className={styles.showButton}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 11.2207C4.938 14.1307 8.244 16.0507 12 16.0507C15.756 16.0507 19.062 14.1307 21 11.2207" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 16.4102V19.2902" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18.342 14.1602L20.376 16.2002" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.66999 14.1602L3.63599 16.2002" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </fieldset>

                <fieldset className={styles.inputWrapper}>
                    <legend>Confirm password</legend>
                    <input type="password" placeholder="Repeat your password" />
                    <button className={styles.showButton}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 11.2207C4.938 14.1307 8.244 16.0507 12 16.0507C15.756 16.0507 19.062 14.1307 21 11.2207" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 16.4102V19.2902" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18.342 14.1602L20.376 16.2002" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M5.66999 14.1602L3.63599 16.2002" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </fieldset>
            </div>
            <div className={styles.buttonBlock}>
                <button className={commonStyles.nextStepButton} onClick={openCheckIn}>
                    Continue
                </button>
                <div className={styles.wantToLogIn}>
                        <span>
                        Have an account?
                        <a onClick={openLogIn}> Log in</a>
                        </span>
                </div>
            </div>
		</div>
	);
}