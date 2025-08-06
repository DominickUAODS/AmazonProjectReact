import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ForgotPassword.module.css'
import commonStyles from '../common.module.css';


export default function ForgotPassword({ background }: { background: Location }) {
    const navigate = useNavigate();
    const closeModal = () => navigate("/"); 


    const handleBackdropClick = (e:any) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};

    const openCheckIn = () => {
		navigate('/checkInForPassword',{ state: { background } });
	};

	return (
		<div className={commonStyles.modalBackdrop} onClick={handleBackdropClick}>
			<div className={commonStyles.modal} onClick={(e) => e.stopPropagation()}>
				<div className={commonStyles.modalBlock}>
                    <div className={styles.fpBlock0}>
                        <div className={styles.fpBlock}>
                            <div className={commonStyles.info}>
                                    <span className={commonStyles.infoSpan0}>
                                        Forgot password
                                    </span>
                                    <span className={commonStyles.infoSpan1}>
                                        Enter your email to reset your password
                                    </span>
                            </div>

                            <div className={styles.emailInputBlock}>
                                <fieldset className={commonStyles.inputWrapper}>
                                    <legend>Email</legend>
                                    <input type="email" placeholder="Enter your email" />
                                </fieldset>
                            </div>


                            <button className={commonStyles.nextStepButton} onClick={openCheckIn}>
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