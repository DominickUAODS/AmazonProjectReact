import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ResetPassword.module.css'
import commonStyles from '../common.module.css';


export default function ResetPassword({ background }: { background: Location }) {
    const navigate = useNavigate();
    const closeModal = () => navigate("/"); 


    const handleBackdropClick = (e:any) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};


	return (
		<div className={commonStyles.modalBackdrop} onClick={handleBackdropClick}>
			<div className={commonStyles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={commonStyles.modalBlock}>
                <div className={styles.rpBlock0}>
                        <div className={styles.rpBlock}>


                            <div className={commonStyles.info}>
                                    <span className={commonStyles.infoSpan0}>
                                        Reset password
                                    </span>
                                    <span className={commonStyles.infoSpan1}>
                                        Set a new password for your account
                                    </span>
                            </div>


                            <div className={styles.resetPasswordBlock}>
                                <fieldset className={commonStyles.inputWrapper}>
                                    <legend>New password</legend>
                                    <input type="password" placeholder="Enter new password" />
                                    <button className={commonStyles.showButton}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 11.2207C4.938 14.1307 8.244 16.0507 12 16.0507C15.756 16.0507 19.062 14.1307 21 11.2207" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M12 16.4102V19.2902" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M18.342 14.1602L20.376 16.2002" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M5.66999 14.1602L3.63599 16.2002" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </fieldset>


                                <fieldset className={commonStyles.inputWrapper}>
                                    <legend>Repeat password</legend>
                                    <input type="password" placeholder="Repeat new password" />
                                    <button className={commonStyles.showButton}>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 11.2207C4.938 14.1307 8.244 16.0507 12 16.0507C15.756 16.0507 19.062 14.1307 21 11.2207" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M12 16.4102V19.2902" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M18.342 14.1602L20.376 16.2002" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                            <path d="M5.66999 14.1602L3.63599 16.2002" stroke="#0E2042" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
                                    </button>
                                </fieldset>
                            </div>

                            <button className={commonStyles.nextStepButton}>
                                Continue
                            </button>


                        </div>
                    </div>

                    <img className = {styles.imgReactangle} src='public\img\Rectangle 413.png'></img>
				</div>
			</div>
		</div>
	);
}