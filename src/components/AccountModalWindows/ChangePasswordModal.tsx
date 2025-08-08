import { useNavigate} from 'react-router-dom';
import styles from './ChangePasswordModal.module.css'
import commonStyles from '../common.module.css';
import PasswordInput from '../SignUpAccount/PasswordInput';


export default function ChangePasswordModal() {
    const navigate = useNavigate();
    const closeModal = () => navigate("/settings"); 
     


    const handleBackdropClick = (e:any) => {
		if (e.target === e.currentTarget) {
			closeModal();
		}
	};


	return (
		<div className={commonStyles.modalBackdrop}>
			<div className={commonStyles.cnModal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.firstStep}>
                    <div className={commonStyles.modalInfo}>
                        <span className={commonStyles.modalInfoSpan}> Enter password </span>
                    </div>

                    <div className={styles.inputSpanBlock}>
                        <span className={styles.addedInfoSpan}>Firstly, enter your current password to confirm this is you.</span>
                        <fieldset className={commonStyles.inputWrapper}>
								<legend>Password</legend>
								<PasswordInput
                        		placeholder="Enter your password"
                        		name="password"
                    			/>
						</fieldset>

                    </div>
                </div>

                <div className={styles.secondStep}>
                    <div className={commonStyles.modalInfo}>
                        <span className={commonStyles.modalInfoSpan}> Change Password </span>
                    </div>

                    <div className={styles.inputSpanBlock}>
                        <span className={styles.addedInfoSpan}>Enter new password for your account.</span>
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
                </div>
                



                <div className={commonStyles.buttonGroup}>
                    <button onClick={handleBackdropClick} className={commonStyles.secondaryButton}>Cancel</button>

                    <button className={commonStyles.nextStepButton}>Confirm</button>
                </div>
			</div>
		</div>
	);
}