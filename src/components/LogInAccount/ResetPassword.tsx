import { useNavigate, useLocation } from 'react-router-dom';
import styles from './ResetPassword.module.css'
import commonStyles from '../common.module.css';
import PasswordInput from '../SignUpAccount/PasswordInput';


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
                                    <PasswordInput
                                        placeholder="Enter new password"
                                        name="password"
                                    />
                                </fieldset>


                                <fieldset className={commonStyles.inputWrapper}>
                                    <legend>Repeat password</legend>
                                    <PasswordInput
                                        placeholder="Repeat new password"
                                        name="password"
                                    />
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