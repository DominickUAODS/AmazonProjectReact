
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styles from './SignUpForm.module.css'
import commonStyles from '../common.module.css';
import PasswordInput from './PasswordInput';


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
            <div className={commonStyles.inputWrappersBlock}>
                <fieldset className={commonStyles.inputWrapper}>
                    <legend>Email</legend>
                    <input type="email" placeholder="Enter your email" />
                </fieldset>


                <fieldset className={commonStyles.inputWrapper}>
                    <legend>Password</legend>
                    <PasswordInput
                        placeholder="Enter your password"
                        name="password"
                    />
                </fieldset>

                <fieldset className={commonStyles.inputWrapper}>
                    <legend>Confirm password</legend>
                    <PasswordInput
                        placeholder="Repeat your password"
                        name="password"
                    />
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