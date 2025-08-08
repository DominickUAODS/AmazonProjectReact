import { useNavigate, useLocation } from 'react-router-dom';
import styles from './LogInAccount.module.css'
import commonStyles from '../common.module.css';
import PasswordInput from '../SignUpAccount/PasswordInput';


export default function LogInAccount({ background }: { background: Location }) {
    const navigate = useNavigate();
    const closeModal = () => navigate("/"); 

	const openSignUp = () => {
		navigate('/signUp',{ state: { background } });
	};

	const openForgotPassword = () => {
		navigate('/forgotPassword',{ state: { background } });
	};

    const handleBackdropClick = (e:any) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

	return (
		<div className={commonStyles.modalBackdrop} onClick={handleBackdropClick}>
			<div className={commonStyles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={commonStyles.modalBlock}>
				<div className={styles.loginBlock0}>
					<div className={styles.loginBlock}>
						<div className={commonStyles.info}>
                                <span className={commonStyles.infoSpan0}>
									Welcome back
                                </span>
                                <span className={commonStyles.infoSpan1}>
									Login into your account
                                </span>
                        </div>


						<div className={styles.inputDataBlock}>
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
							

							<div className={styles.stayLogInblock}>
								<label className={styles.checkboxLabel}>
									<input type="checkbox" />
									Stay signed in
								</label>
								<a onClick = {openForgotPassword} className={styles.forgotPassword}>Forgot password?</a>
							</div>

						</div>

						<div className={styles.logInButtonBlock}>
							<button className={commonStyles.nextStepButton}>
                                Log in
                            </button>
							<div className={styles.wantToSignUp}>
                        		<span>
									Don’t have an account?
                        			<a onClick={openSignUp}> Sign up</a>
                        		</span>
                			</div>
						</div>


					</div>
					</div>
					<img className = {styles.imgReactangle} src='public\img\Rectangle 413.png'></img>
				</div>
			</div>
		</div>
	);
}