import { useNavigate, useLocation } from 'react-router-dom';
import styles from './LogInAccount.module.css'
import commonStyles from '../common.module.css';


export default function LogInAccount() {
    const navigate = useNavigate();
	const location = useLocation();
    const closeModal = () => navigate(-1); 


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


						</div>
					</div>
					</div>

					<img className = {styles.imgReactangle} src='public\img\Rectangle 413.png'></img>
				</div>
			</div>
		</div>
	);
}